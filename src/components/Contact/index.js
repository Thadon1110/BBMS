'use client';

import styles from './Contact.module.scss';
import SectionHeader from '../SectionHeader';
import { FaEnvelope, FaPhone, FaLinkedin, FaYoutube, FaFacebookF } from 'react-icons/fa6';
import { FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
		captcha: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [captchaQuestion, setCaptchaQuestion] = useState({ question: '', answer: 0 });

	// Generuj nowe pytanie captcha
	const generateCaptcha = () => {
		const num1 = Math.floor(Math.random() * 10) + 1;
		const num2 = Math.floor(Math.random() * 10) + 1;
		const operations = ['+', '-'];
		const operation = operations[Math.floor(Math.random() * operations.length)];

		let answer;
		let question;

		switch (operation) {
			case '+':
				answer = num1 + num2;
				question = `${num1} + ${num2}`;
				break;
			case '-':
				answer = num1 - num2;
				question = `${num1} - ${num2}`;
				break;
		}

		setCaptchaQuestion({ question, answer });
	};

	// Generuj captcha przy pierwszym załadowaniu
	useEffect(() => {
		generateCaptcha();
	}, []);

	// Ukryj alert po 5 sekundach
	useEffect(() => {
		if (alert) {
			const timer = setTimeout(() => {
				setAlert(null);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [alert]);

	const showAlert = (type, message) => {
		setAlert({ type, message });
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		// Sprawdź captcha
		if (parseInt(formData.captcha) !== captchaQuestion.answer) {
			showAlert('error', 'Nieprawidłowa odpowiedź na pytanie anty-spam!');
			setIsLoading(false);
			generateCaptcha(); // Nowe pytanie
			setFormData((prev) => ({ ...prev, captcha: '' }));
			return;
		}

		try {
			// XAMPP - localhost (dla testów)
			// const response = await fetch('http://localhost/send-email.php', {
			// PRODUKCJA: /send-email.php
			const response = await fetch('/api/send-email.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					message: formData.message,
				}),
			});

			const responseText = await response.text();
			console.log('PHP Response:', responseText);

			let data;
			try {
				data = JSON.parse(responseText);
			} catch (e) {
				throw new Error('Serwer zwrócił nieprawidłową odpowiedź');
			}

			if (data.success) {
				// Wyczyść formularz
				setFormData({
					name: '',
					email: '',
					message: '',
					captcha: '',
				});
				generateCaptcha(); // Nowe pytanie captcha
				showAlert('success', data.message);
			} else {
				showAlert('error', data.message);
			}
		} catch (error) {
			console.error('Błąd:', error);
			showAlert('error', 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
		} finally {
			setIsLoading(false);
		}
	};

	// Oblicz className dla alert
	const alertClassName = alert ? `${styles.alert} ${styles[`alert--${alert.type}`]}` : '';

	return (
		<section className={styles.contact} id='kontakt'>
			<SectionHeader title='Kontakt' subtitle='Masz pytania dotyczące konferencji? Skontaktuj się z nami!' />

			{/* Custom Alert */}
			{alert && (
				<div className={alertClassName}>
					<div className={styles.alert__content}>
						{alert.type === 'success' ? <FaCheckCircle className={styles.alert__icon} /> : <FaExclamationTriangle className={styles.alert__icon} />}
						<span className={styles.alert__message}>{alert.message}</span>
						<button className={styles.alert__close} onClick={() => setAlert(null)}>
							×
						</button>
					</div>
				</div>
			)}

			<div className={styles.contact__container}>
				<div className={styles.contact__info}>
					<h3 className={styles.info__heading}>Informacje kontaktowe</h3>

					<ul className={styles.info__list}>
						<li className={styles.info__item}>
							<FaEnvelope className={styles.info__icon} />
							<a href='mailto:mfuz@trawialnia.eu' className={styles.info__link}>
								mfuz@trawialnia.eu
							</a>
						</li>
						<li className={styles.info__item}>
							<FaPhone className={styles.info__icon} />
							<a href='tel:+48668102874' className={styles.info__link}>
								+48 668 102 874
							</a>
						</li>
						<li className={styles.info__item}>
							<FaMapMarkerAlt className={styles.info__icon} />
							<address className={styles.info__address}>
								Hotel Villa Verde, ul. Hotelowa 12,
								<br />
								42-400 Zawiercie
							</address>
						</li>
					</ul>

					<div className={styles.social}>
						<h3 className={styles.social__heading}>Obserwuj nas</h3>

						<div className={styles.social__links}>
							<a href='#' className={styles.social__link} aria-label='LinkedIn'>
								<FaLinkedin />
							</a>
							<a href='#' className={styles.social__link} aria-label='YouTube'>
								<FaYoutube />
							</a>
							<a href='#' className={styles.social__link} aria-label='Facebook'>
								<FaFacebookF />
							</a>
						</div>
					</div>
				</div>

				<form className={styles.contact__form} onSubmit={handleSubmit}>
					<div className={styles.form__group}>
						<input
							type='text'
							id='name'
							name='name'
							placeholder='Imię i nazwisko'
							className={styles.form__input}
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.form__group}>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='Email'
							className={styles.form__input}
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.form__group}>
						<textarea
							id='message'
							name='message'
							placeholder='Wiadomość'
							className={styles.form__textarea}
							value={formData.message}
							onChange={handleChange}
							required
						></textarea>
					</div>

					{/* Captcha */}
					<div className={styles.form__group}>
						<label className={styles.captcha__label}>Pytanie anty-spam: Ile to {captchaQuestion.question}?</label>
						<input
							type='number'
							id='captcha'
							name='captcha'
							placeholder='Twoja odpowiedź...'
							className={styles.form__input}
							value={formData.captcha}
							onChange={handleChange}
							required
						/>
					</div>

					<button type='submit' className={styles.form__button} disabled={isLoading}>
						{isLoading ? 'WYSYŁANIE...' : 'WYŚLIJ WIADOMOŚĆ'}
					</button>
				</form>
			</div>
		</section>
	);
}
