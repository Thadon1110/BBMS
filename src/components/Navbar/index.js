'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import { FaBars, FaXmark } from 'react-icons/fa6';

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Obsługa stanu menu mobilnego
	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
	}, [menuOpen]);

	// Obsługa scrollowania i dodawania tła
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				// Ustaw próg scrollowania (100px)
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		// Dodaj event listener do scrollowania
		window.addEventListener('scroll', handleScroll);

		// Cleanup po odmontowaniu komponentu
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
			<div className={styles.nav__logo}>
				<a href='#'>
					<Image src='/logo.webp' alt='Big Business Meets Science 5' width={592} height={270} priority></Image>
				</a>
			</div>

			{/* DESKTOP */}
			<div className={styles.nav__desktopLinks}>
				<a href='#prelegenci'>Prelegenci</a>
				<a href='#agenda'>Agenda</a>
				<a href='#galeria'>Galeria</a>
				<a href='#sponsorzy'>Sponsorzy</a>
				<a href='#kontakt'>Kontakt</a>
				<a href='#bilety' className={styles.desktop__ticket}>
					Kup Bilet
				</a>
			</div>

			{/* MOBILE */}
			<button className={styles.nav__menu} onClick={() => setMenuOpen(true)}>
				<FaBars />
			</button>

			<div className={`${styles.nav__mobilePanel} ${menuOpen ? styles.open : ''}`}>
				<button className={styles.nav__close} onClick={() => setMenuOpen(false)}>
					<FaXmark />
				</button>
				<a href='#prelegenci' onClick={() => setMenuOpen(false)}>
					Prelegenci
				</a>
				<a href='#agenda' onClick={() => setMenuOpen(false)}>
					Agenda
				</a>
				<a href='#galeria' onClick={() => setMenuOpen(false)}>
					Galeria
				</a>
				<a href='#sponsorzy' onClick={() => setMenuOpen(false)}>
					Sponsorzy
				</a>
				<a href='#kontakt' onClick={() => setMenuOpen(false)}>
					Kontakt
				</a>
				<a href='#bilety' className={styles.mobile__ticket} onClick={() => setMenuOpen(false)}>
					Kup Bilet
				</a>
			</div>
		</nav>
	);
}
