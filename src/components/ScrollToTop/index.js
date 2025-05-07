'use client';

import { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.scss';
import { FaAngleUp } from 'react-icons/fa6';

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	// Sprawdza, czy użytkownik zescrollował stronę na określoną wysokość
	const toggleVisibility = () => {
		if (window.scrollY > 500) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	// Przewija stronę do góry
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	return (
		<>
			{isVisible && (
				<button className={styles.scrollToTop} onClick={scrollToTop} aria-label='Przewiń do góry'>
					<FaAngleUp />
				</button>
			)}
		</>
	);
}
