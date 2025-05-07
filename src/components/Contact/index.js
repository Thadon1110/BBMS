'use client';

import styles from './Contact.module.scss';
import SectionHeader from '../SectionHeader';
import { FaEnvelope, FaPhone, FaLinkedin, FaYoutube, FaFacebookF } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		topic: '',
		message: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Tutaj będzie logika wysyłania formularza
		console.log('Formularz wysłany:', formData);
		// W rzeczywistej aplikacji tutaj byłoby wysłanie danych do API

		// Reset formularza po wysłaniu
		setFormData({
			name: '',
			email: '',
			topic: 'Wiadomość ze strony Big Business Meets Science',
			message: '',
		});

		// Komunikat o sukcesie
		alert('Wiadomość została wysłana!');
	};

	return (
		<section className={styles.contact}>
			<SectionHeader title='Kontakt' subtitle='Masz pytania dotyczące konferencji? Skontaktuj się z nami!' />

			<div className={styles.contact__container}>
				<div className={styles.contact__info}>
					<h3 className={styles.info__heading}>Informacje kontaktowe</h3>

					<ul className={styles.info__list}>
						<li className={styles.info__item}>
							<FaEnvelope className={styles.info__icon} />
							<a href='mailto:123@123.pl' className={styles.info__link}>
								123@123.pl
							</a>
						</li>
						<li className={styles.info__item}>
							<FaPhone className={styles.info__icon} />
							<a href='tel:+48123123123' className={styles.info__link}>
								+48 123 123 123
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

					{/* <div className={styles.form__group}>
						<input
							type='text'
							id='topic'
							name='topic'
							placeholder='Temat'
							className={styles.form__input}
							value={formData.topic}
							onChange={handleChange}
							required
						/>
					</div> */}

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

					<button type='submit' className={styles.form__button}>
						WYŚLIJ WIADOMOŚĆ
					</button>
				</form>
			</div>
		</section>
	);
}
