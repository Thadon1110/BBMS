<?php
// Proste API do wysyłania maili - gotowe na zwykły hosting

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Tylko POST dozwolony']);
    exit;
}

try {
    // Pobierz dane
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Brak danych');
    }

    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $message = trim($data['message'] ?? '');

    // Walidacja
    if (empty($name) || empty($email) || empty($message)) {
        throw new Exception('Wypełnij wszystkie pola');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Nieprawidłowy adres email');
    }

    // ========================================
    // EMAIL NA KTÓRY MA BYĆ WYSŁANY MAIL
    $to = 'mfuz@trawialnia.eu';
    // ========================================
    
    $subject = '📧 Wiadomość ze strony Big Business Meets Science 5';
    
    // Treść maila
    $mailBody = "🎯 NOWA WIADOMOŚĆ ZE STRONY\n\n";
    $mailBody .= "👤 Imię i nazwisko: " . $name . "\n";
    $mailBody .= "📧 Email: " . $email . "\n";
    $mailBody .= "📅 Data: " . date('d.m.Y H:i:s') . "\n\n";
    $mailBody .= "💬 Wiadomość:\n" . $message . "\n\n";
    $mailBody .= "---\nWysłane ze strony Big Business Meets Science 5";

    // Nagłówki (ważne dla deliverability)
    $headers = array();
    $headers[] = "From: contact@" . $_SERVER['HTTP_HOST'];
    $headers[] = "Reply-To: " . $email;
    $headers[] = "X-Mailer: PHP/" . phpversion();
    $headers[] = "Content-Type: text/plain; charset=UTF-8";
    
    $headersString = implode("\r\n", $headers);

    // Wyślij mail
    $sent = mail($to, $subject, $mailBody, $headersString);
    
    if ($sent) {
        echo json_encode([
            'success' => true, 
            'message' => 'Wiadomość wysłana pomyślnie! 🎉'
        ]);
    } else {
        throw new Exception('Błąd podczas wysyłania maila');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage()
    ]);
}
?>