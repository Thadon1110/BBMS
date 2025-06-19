'use client';

import { useState } from 'react';
import styles from './Tickets.module.scss';
import SectionHeader from '../SectionHeader';
import { FaCheck, FaSpinner } from 'react-icons/fa6';

const ticketTypes = [
	{
		id: 1,
		name: 'Free Pass',
		description: 'Limit darmowych wejść',
		price: 0,
		features: ['Sesja otwierająca', 'Materiały konferencyjne', 'Networking', 'Catering'],
		popular: false,
		badge: '20 Miejsc',
		buttonColor: 'white',
		available: true,
		maxQuantity: 2, // Limit dla darmowych biletów
	},
	{
		id: 2,
		name: 'Silver',
		description: 'Pełen dostęp do konferencji',
		price: 499,
		features: ['Sesja otwierająca', 'Materiały konferencyjne', 'Networking', 'Catering'],
		popular: true,
		badge: 'Najpopularniejszy',
		buttonColor: 'primary',
		available: true,
		maxQuantity: 10,
	},
];

export default function Tickets() {
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [purchaseData, setPurchaseData] = useState({
		quantity: 1,
		name: '',
		email: '',
		phone: '',
		company: '',
	});
	const [isProcessing, setIsProcessing] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [alert, setAlert] = useState(null);

	const handleTicketSelect = (ticket) => {
		setSelectedTicket(ticket);
		setShowForm(true);
		setPurchaseData((prev) => ({ ...prev, quantity: 1 }));
		setAlert(null);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setPurchaseData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleQuantityChange = (e) => {
		const quantity = parseInt(e.target.value);
		setPurchaseData((prev) => ({
			...prev,
			quantity: Math.min(quantity, selectedTicket.maxQuantity),
		}));
	};

	const calculateTotal = () => {
		if (!selectedTicket) return 0;
		return selectedTicket.price * purchaseData.quantity;
	};

	const showAlert = (type, message) => {
		setAlert({ type, message });
		// Auto-hide alert po 5 sekundach
		setTimeout(() => setAlert(null), 5000);
	};

	const handlePurchase = async (e) => {
		e.preventDefault();
		setIsProcessing(true);

		try {
			// Walidacja danych
			if (!purchaseData.name.trim() || !purchaseData.email.trim()) {
				showAlert('error', 'Wypełnij wszystkie wymagane pola');
				setIsProcessing(false);
				return;
			}

			// Walidacja email
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(purchaseData.email)) {
				showAlert('error', 'Podaj prawidłowy adres email');
				setIsProcessing(false);
				return;
			}

			// Przygotowanie danych do wysłania
			const orderData = {
				ticket_id: selectedTicket.id,
				ticket_name: selectedTicket.name,
				quantity: purchaseData.quantity,
				unit_price: selectedTicket.price,
				total_amount: calculateTotal(),
				customer: {
					name: purchaseData.name.trim(),
					email: purchaseData.email.trim(),
					phone: purchaseData.phone.trim(),
					company: purchaseData.company.trim(),
				},
			};

			// Wywołanie API PHP
			const response = await fetch('/api/create-payment.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderData),
			});

			const responseText = await response.text();
			console.log('Server response:', responseText);

			let result;
			try {
				result = JSON.parse(responseText);
			} catch (e) {
				throw new Error('Serwer zwrócił nieprawidłową odpowiedź');
			}

			if (result.success) {
				if (result.payment_url) {
					// Przekierowanie do bramki płatności
					showAlert('success', 'Przekierowywanie do płatności...');
					setTimeout(() => {
						window.location.href = result.payment_url;
					}, 1000);
				} else if (result.message === 'free_ticket') {
					// Darmowy bilet został zarezerwowany
					showAlert('success', 'Bilet darmowy został zarezerwowany! Sprawdź email z potwierdzeniem.');
					resetForm();
				}
			} else {
				showAlert('error', result.message || 'Wystąpił błąd podczas przetwarzania zamówienia');
			}
		} catch (error) {
			console.error('Błąd:', error);
			showAlert('error', 'Wystąpił błąd podczas wysyłania żądania. Sprawdź połączenie i spróbuj ponownie.');
		} finally {
			setIsProcessing(false);
		}
	};

	const resetForm = () => {
		setSelectedTicket(null);
		setShowForm(false);
		setPurchaseData({
			quantity: 1,
			name: '',
			email: '',
			phone: '',
			company: '',
		});
		setAlert(null);
	};

	return (
		<section className={styles.tickets} id='bilety'>
			<SectionHeader title='Bilety' subtitle='Zarezerwuj swoje miejsce na konferencji' />

			{/* Alert */}
			{alert && (
				<div className={`${styles.alert} ${styles[`alert--${alert.type}`]}`}>
					<div className={styles.alert__content}>
						<span className={styles.alert__message}>{alert.message}</span>
						<button className={styles.alert__close} onClick={() => setAlert(null)}>
							×
						</button>
					</div>
				</div>
			)}

			<div className={styles.tickets__container}>
				{ticketTypes.map((ticket) => (
					<div key={ticket.id} className={`${styles.ticket__card} ${ticket.popular ? styles.ticket__popular : ''}`}>
						<p className={`${styles.ticket__badge} ${ticket.popular ? styles.badge__popular : styles.badge__standard}`}>{ticket.badge}</p>

						<h3 className={styles.ticket__name}>{ticket.name}</h3>
						<p className={styles.ticket__description}>{ticket.description}</p>

						<div className={styles.ticket__price}>
							<span className={styles.price__value}>{ticket.price}</span>
							<span className={styles.price__currency}>zł</span>
						</div>

						<ul className={styles.ticket__features}>
							{ticket.features.map((feature, index) => (
								<li key={index} className={styles.feature__item}>
									<FaCheck className={styles.feature__icon} />
									<span>{feature}</span>
								</li>
							))}
						</ul>

						<button
							className={`${styles.ticket__button} ${ticket.popular ? styles.button__popular : styles.button__standard}`}
							onClick={() => handleTicketSelect(ticket)}
							disabled={!ticket.available}
						>
							{ticket.available ? 'Zarezerwuj' : 'Wyprzedane'}
						</button>
					</div>
				))}
			</div>

			{/* Formularz zakupu */}
			{showForm && selectedTicket && (
				<div className={styles.purchase__overlay}>
					<div className={styles.purchase__modal}>
						<div className={styles.modal__header}>
							<h3>Zakup biletu: {selectedTicket.name}</h3>
							<button className={styles.modal__close} onClick={resetForm} type='button'>
								×
							</button>
						</div>

						<form onSubmit={handlePurchase} className={styles.purchase__form}>
							<div className={styles.form__group}>
								<label htmlFor='quantity'>Ilość biletów</label>
								<select id='quantity' name='quantity' value={purchaseData.quantity} onChange={handleQuantityChange} className={styles.form__select}>
									{[...Array(selectedTicket.maxQuantity)].map((_, i) => (
										<option key={i + 1} value={i + 1}>
											{i + 1}
										</option>
									))}
								</select>
							</div>

							<div className={styles.form__group}>
								<label htmlFor='name'>Imię i nazwisko *</label>
								<input
									type='text'
									id='name'
									name='name'
									value={purchaseData.name}
									onChange={handleInputChange}
									className={styles.form__input}
									placeholder='Jan Kowalski'
									required
								/>
							</div>

							<div className={styles.form__group}>
								<label htmlFor='email'>Email *</label>
								<input
									type='email'
									id='email'
									name='email'
									value={purchaseData.email}
									onChange={handleInputChange}
									className={styles.form__input}
									placeholder='jan@example.com'
									required
								/>
							</div>

							<div className={styles.form__group}>
								<label htmlFor='phone'>Telefon</label>
								<input
									type='tel'
									id='phone'
									name='phone'
									value={purchaseData.phone}
									onChange={handleInputChange}
									className={styles.form__input}
									placeholder='+48 123 456 789'
								/>
							</div>

							<div className={styles.form__group}>
								<label htmlFor='company'>Firma/Organizacja</label>
								<input
									type='text'
									id='company'
									name='company'
									value={purchaseData.company}
									onChange={handleInputChange}
									className={styles.form__input}
									placeholder='Nazwa firmy'
								/>
							</div>

							<div className={styles.purchase__summary}>
								<div className={styles.summary__line}>
									<span>
										{selectedTicket.name} x {purchaseData.quantity}
									</span>
									<span>{selectedTicket.price * purchaseData.quantity} zł</span>
								</div>
								<div className={styles.summary__total}>
									<span>Razem do zapłaty:</span>
									<span>{calculateTotal()} zł</span>
								</div>
							</div>

							<div className={styles.form__actions}>
								<button type='button' onClick={resetForm} className={styles.btn__cancel} disabled={isProcessing}>
									Anuluj
								</button>
								<button type='submit' disabled={isProcessing} className={styles.btn__purchase}>
									{isProcessing ? (
										<>
											<FaSpinner className={styles.spinner} />
											Przetwarzanie...
										</>
									) : selectedTicket.price === 0 ? (
										'Zarezerwuj'
									) : (
										'Przejdź do płatności'
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</section>
	);
}
