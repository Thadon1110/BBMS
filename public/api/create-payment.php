<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// ========================================
// KONFIGURACJA - ZMIEŃ NA SWOJE DANE
// ========================================

// Google Sheets
$GOOGLE_SHEETS_ID = 'WKLEJ_TUTAJ_ID_TWOJEGO_ARKUSZA'; // Np: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
$GOOGLE_API_KEY = 'WKLEJ_TUTAJ_SWÓJ_API_KEY';

// Przelewy24 (testowe - zmień na produkcyjne)
$P24_MERCHANT_ID = 'TWÓJ_MERCHANT_ID';
$P24_POS_ID = 'TWÓJ_POS_ID';
$P24_CRC_KEY = 'TWÓJ_CRC_KEY';
$P24_API_KEY = 'TWÓJ_API_KEY';
$IS_TEST_MODE = true; // Zmień na false w produkcji

// Ustawienia
$YOUR_DOMAIN = 'https://twoja-domena.pl'; // Zmień na swoją domenę
$ORGANIZER_EMAIL = 'mfuz@trawialnia.eu';

// Limity biletów
$TICKET_LIMITS = [
    1 => 20,  // Free Pass - 20 biletów
    2 => 100  // Silver - 100 biletów
];

// ========================================
// GŁÓWNA LOGIKA
// ========================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metoda nie jest dozwolona']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Nieprawidłowe dane wejściowe']);
    exit;
}

// Walidacja danych
$required_fields = ['ticket_id', 'ticket_name', 'quantity', 'unit_price', 'total_amount', 'customer'];
foreach ($required_fields as $field) {
    if (!isset($input[$field])) {
        echo json_encode(['success' => false, 'message' => "Brak wymaganego pola: $field"]);
        exit;
    }
}

$customer = $input['customer'];
if (empty($customer['name']) || empty($customer['email'])) {
    echo json_encode(['success' => false, 'message' => 'Brak wymaganych danych klienta (imię i email)']);
    exit;
}

// Walidacja email
if (!filter_var($customer['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Nieprawidłowy format adresu email']);
    exit;
}

// Sprawdź limit biletów
$ticket_id = $input['ticket_id'];
$requested_quantity = $input['quantity'];

if (!isset($TICKET_LIMITS[$ticket_id])) {
    echo json_encode(['success' => false, 'message' => 'Nieprawidłowy typ biletu']);
    exit;
}

$current_count = getCurrentTicketCount($ticket_id);
$available_tickets = $TICKET_LIMITS[$ticket_id] - $current_count;

if ($requested_quantity > $available_tickets) {
    echo json_encode([
        'success' => false, 
        'message' => "Dostępne są tylko $available_tickets bilety tego typu"
    ]);
    exit;
}

// Generuj unikalny ID zamówienia
$order_id = 'CONF_' . date('Ymd') . '_' . uniqid();

try {
    // Zapisz zamówienie do Google Sheets
    $sheets_result = saveOrderToGoogleSheets($order_id, $input, $customer, 'pending');
    
    if (!$sheets_result) {
        throw new Exception('Błąd zapisu zamówienia do systemu');
    }
    
    // Jeśli to darmowy bilet
    if ($input['total_amount'] == 0) {
        // Aktualizuj status na confirmed
        updateOrderStatus($order_id, 'confirmed');
        
        // Wyślij emaile
        $email_sent = sendConfirmationEmail($customer['email'], $customer['name'], $order_id, $input);
        sendNotificationToOrganizer($order_id, $input, $customer);
        
        echo json_encode([
            'success' => true, 
            'message' => 'free_ticket',
            'order_id' => $order_id
        ]);
        exit;
    }
    
    // Dla płatnych biletów - stwórz płatność w Przelewy24
    $payment_url = createPaymentLink($order_id, $input, $customer);
    
    if ($payment_url) {
        echo json_encode([
            'success' => true,
            'payment_url' => $payment_url,
            'order_id' => $order_id
        ]);
    } else {
        throw new Exception('Błąd tworzenia linku płatności');
    }
    
} catch (Exception $e) {
    error_log("Payment creation error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

// ========================================
// FUNKCJE POMOCNICZE
// ========================================

/**
 * Zapisuje zamówienie do Google Sheets
 */
function saveOrderToGoogleSheets($order_id, $orderData, $customer, $status) {
    global $GOOGLE_SHEETS_ID, $GOOGLE_API_KEY;
    
    // Przygotuj wiersz danych
    $row_data = [
        date('Y-m-d H:i:s'),           // Data
        $order_id,                     // ID zamówienia  
        $customer['name'],             // Imię
        $customer['email'],            // Email
        $customer['phone'] ?? '',      // Telefon
        $customer['company'] ?? '',    // Firma
        $orderData['ticket_name'],     // Nazwa biletu
        $orderData['quantity'],        // Ilość
        $orderData['total_amount'],    // Kwota
        $status                        // Status
    ];
    
    $url = "https://sheets.googleapis.com/v4/spreadsheets/{$GOOGLE_SHEETS_ID}/values/Zamówienia:append";
    $url .= "?valueInputOption=RAW&key={$GOOGLE_API_KEY}";
    
    $data = [
        'values' => [$row_data]
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($http_code !== 200) {
        error_log("Google Sheets API error: HTTP $http_code, Response: $response");
        return false;
    }
    
    return true;
}

/**
 * Sprawdza aktualną liczbę sprzedanych biletów danego typu
 */
function getCurrentTicketCount($ticket_id) {
    global $GOOGLE_SHEETS_ID, $GOOGLE_API_KEY;
    
    $url = "https://sheets.googleapis.com/v4/spreadsheets/{$GOOGLE_SHEETS_ID}/values/Zamówienia?key={$GOOGLE_API_KEY}";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $data = json_decode($response, true);
    
    if (!isset($data['values']) || count($data['values']) <= 1) {
        return 0; // Brak danych lub tylko nagłówek
    }
    
    $count = 0;
    // Pomijamy nagłówek (pierwszy wiersz)
    for ($i = 1; $i < count($data['values']); $i++) {
        $row = $data['values'][$i];
        
        // Sprawdź czy wiersz ma wystarczająco kolumn
        if (count($row) < 10) {
            continue;
        }
        
        $ticket_name = $row[6]; // Nazwa biletu
        $quantity = (int)$row[7]; // Ilość
        $status = $row[9]; // Status
        
        // Sprawdź typ biletu i status
        if ($status === 'confirmed') {
            if (($ticket_id == 1 && stripos($ticket_name, 'Free') !== false) ||
                ($ticket_id == 2 && stripos($ticket_name, 'Silver') !== false)) {
                $count += $quantity;
            }
        }
    }
    
    return $count;
}

/**
 * Aktualizuje status zamówienia w Google Sheets
 */
function updateOrderStatus($order_id, $new_status) {
    global $GOOGLE_SHEETS_ID, $GOOGLE_API_KEY;
    
    // Znajdź wiersz z tym order_id
    $url = "https://sheets.googleapis.com/v4/spreadsheets/{$GOOGLE_SHEETS_ID}/values/Zamówienia?key={$GOOGLE_API_KEY}";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $data = json_decode($response, true);
    
    if (!isset($data['values'])) {
        return false;
    }
    
    // Znajdź wiersz z order_id
    for ($i = 1; $i < count($data['values']); $i++) {
        $row = $data['values'][$i];
        if (isset($row[1]) && $row[1] === $order_id) {
            // Znaleziono wiersz - aktualizuj status (kolumna J = 10)
            $row_number = $i + 1; // +1 bo Google Sheets liczy od 1
            
            $update_url = "https://sheets.googleapis.com/v4/spreadsheets/{$GOOGLE_SHEETS_ID}/values/Zamówienia!J{$row_number}";
            $update_url .= "?valueInputOption=RAW&key={$GOOGLE_API_KEY}";
            
            $update_data = [
                'values' => [[$new_status]]
            ];
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $update_url);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($update_data));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json'
            ]);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            
            $response = curl_exec($ch);
            curl_close($ch);
            
            return true;
        }
    }
    
    return false;
}

/**
 * Tworzy link płatności w Przelewy24
 */
function createPaymentLink($order_id, $orderData, $customer) {
    global $P24_MERCHANT_ID, $P24_POS_ID, $P24_CRC_KEY, $P24_API_KEY, $IS_TEST_MODE, $YOUR_DOMAIN;
    
    $api_url = $IS_TEST_MODE ? 
        'https://sandbox.przelewy24.pl/api/v1/' : 
        'https://secure.przelewy24.pl/api/v1/';
    
    $payment_data = [
        'merchantId' => (int)$P24_MERCHANT_ID,
        'posId' => (int)$P24_POS_ID,
        'sessionId' => $order_id,
        'amount' => (int)($orderData['total_amount'] * 100), // w groszach
        'currency' => 'PLN',
        'description' => $orderData['ticket_name'] . ' x ' . $orderData['quantity'] . ' - Big Business Meets Science 5',
        'email' => $customer['email'],
        'client' => $customer['name'],
        'country' => 'PL',
        'language' => 'pl',
        'urlReturn' => $YOUR_DOMAIN . '/payment-success?order_id=' . $order_id,
        'urlStatus' => $YOUR_DOMAIN . '/api/payment-status.php',
        'timeLimit' => 15, // minuty
        'waitForResult' => true
    ];
    
    // Wygeneruj znak CRC
    $crc_string = json_encode($payment_data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . $P24_CRC_KEY;
    $payment_data['sign'] = hash('sha384', $crc_string);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api_url . 'transaction/register');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payment_data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Basic ' . base64_encode($P24_POS_ID . ':' . $P24_API_KEY)
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($http_code === 201) {
        $result = json_decode($response, true);
        if (isset($result['data']['token'])) {
            $payment_url = $IS_TEST_MODE ? 
                'https://sandbox.przelewy24.pl/trnRequest/' . $result['data']['token'] :
                'https://secure.przelewy24.pl/trnRequest/' . $result['data']['token'];
            return $payment_url;
        }
    }
    
    error_log("Przelewy24 API error: HTTP $http_code, Response: $response");
    return false;
}

/**
 * Wysyła email potwierdzający do klienta
 */
function sendConfirmationEmail($email, $name, $order_id, $orderData) {
    global $ORGANIZER_EMAIL;
    
    $subject = "✅ Potwierdzenie rezerwacji - Big Business Meets Science 5";
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Potwierdzenie rezerwacji</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 5px 0 0 0; opacity: 0.9; }
            .content { padding: 30px 20px; }
            .details { background: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #10b981; border-radius: 8px; }
            .details h3 { margin-top: 0; color: #10b981; }
            .info-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
            .info-row:last-child { border-bottom: none; font-weight: bold; }
            .button { display: inline-block; background: #10b981; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; margin: 15px 5px; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; }
            .footer a { color: #10b981; }
            @media (max-width: 600px) {
                .content { padding: 20px 15px; }
                .info-row { flex-direction: column; }
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🎯 BIG BUSINESS MEETS SCIENCE 5</h1>
                <p>Potwierdzenie rezerwacji</p>
            </div>
            
            <div class='content'>
                <h2>Cześć " . htmlspecialchars($name) . "! 👋</h2>
                <p>Dziękujemy za rezerwację biletu na konferencję. Twoja rezerwacja została potwierdzona!</p>
                
                <div class='details'>
                    <h3>📋 Szczegóły rezerwacji</h3>
                    <div class='info-row'>
                        <span>Numer zamówienia:</span>
                        <span><strong>" . htmlspecialchars($order_id) . "</strong></span>
                    </div>
                    <div class='info-row'>
                        <span>Bilet:</span>
                        <span>" . htmlspecialchars($orderData['ticket_name']) . "</span>
                    </div>
                    <div class='info-row'>
                        <span>Ilość:</span>
                        <span>" . $orderData['quantity'] . "</span>
                    </div>
                    <div class='info-row'>
                        <span>Kwota:</span>
                        <span>" . $orderData['total_amount'] . " zł</span>
                    </div>
                </div>
                
                <div class='details'>
                    <h3>📅 Informacje o wydarzeniu</h3>
                    <div class='info-row'>
                        <span>Data:</span>
                        <span><strong>17 września 2025</strong></span>
                    </div>
                    <div class='info-row'>
                        <span>Miejsce:</span>
                        <span>Hotel Villa Verde, ul. Hotelowa 12, 42-400 Zawiercie</span>
                    </div>
                    <div class='info-row'>
                        <span>Godzina:</span>
                        <span>11:00 - 22:00</span>
                    </div>
                </div>
                
                <div style='background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;'>
                    <p style='margin: 0;'><strong>⚠️ WAŻNE:</strong> Zachowaj ten email jako potwierdzenie uczestnictwa. Będzie potrzebny podczas rejestracji na konferencji.</p>
                </div>
                
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='https://www.google.com/maps/search/?api=1&query=Hotel+Villa+Verde+Zawiercie' class='button'>
                        📍 Zobacz lokalizację na mapie
                    </a>
                    <a href='https://calendar.google.com/calendar/render?action=TEMPLATE&text=Big+Business+Meets+Science+5&dates=20250917T090000Z/20250917T200000Z&location=Hotel+Villa+Verde,+Zawiercie&details=Konferencja+Big+Business+Meets+Science+5' class='button'>
                        📅 Dodaj do kalendarza
                    </a>
                </div>
            </div>
            
            <div class='footer'>
                <p><strong>Kontakt:</strong></p>
                <p>📧 <a href='mailto:$ORGANIZER_EMAIL'>$ORGANIZER_EMAIL</a> | 📞 +48 668 102 874</p>
                <p style='margin-top: 20px;'>Do zobaczenia na konferencji! 🚀</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Big Business Meets Science <noreply@trawialnia.eu>',
        'Reply-To: ' . $ORGANIZER_EMAIL
    ];
    
    return mail($email, $subject, $message, implode("\r\n", $headers));
}

/**
 * Wysyła powiadomienie do organizatora
 */
function sendNotificationToOrganizer($order_id, $orderData, $customer) {
    global $ORGANIZER_EMAIL, $GOOGLE_SHEETS_ID;
    
    $subject = "🎫 Nowa rezerwacja biletu - " . $order_id;
    $message = "
Nowa rezerwacja biletu na konferencję Big Business Meets Science 5!

🎯 SZCZEGÓŁY ZAMÓWIENIA:
- Numer: " . $order_id . "
- Bilet: " . $orderData['ticket_name'] . " x " . $orderData['quantity'] . "
- Kwota: " . $orderData['total_amount'] . " zł

👤 DANE KLIENTA:
- Imię: " . $customer['name'] . "
- Email: " . $customer['email'] . "
- Telefon: " . ($customer['phone'] ?: 'nie podano') . "
- Firma: " . ($customer['company'] ?: 'nie podano') . "

📅 Data rezerwacji: " . date('Y-m-d H:i:s') . "

📊 Sprawdź szczegóły w Google Sheets:
https://docs.google.com/spreadsheets/d/" . $GOOGLE_SHEETS_ID . "

---
System rezerwacji Big Business Meets Science 5
    ";
    
    $headers = 'From: System Rezerwacji <noreply@trawialnia.eu>';
    
    return mail($ORGANIZER_EMAIL, $subject, $message, $headers);
}

// Dodatkowe zabezpieczenie - logowanie błędów
function logError($message) {
    error_log(date('Y-m-d H:i:s') . " - Payment System Error: " . $message);
}
?>