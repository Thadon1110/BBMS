// CountdownSection.jsx
'use client';

import { useEffect, useState } from 'react';
import styles from './Countdown.module.scss';

export default function Countdown() {
	const [hasMounted, setHasMounted] = useState(false);
	const [timeLeft, setTimeLeft] = useState({ dni: 0, godzin: 0, minut: 0, sekund: 0 });

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			const targetDate = new Date('2025-09-17T17:00:00');
			const now = new Date();
			const diff = targetDate.getTime() - now.getTime();

			setTimeLeft({
				dni: Math.floor(diff / (1000 * 60 * 60 * 24)),
				godzin: Math.floor((diff / (1000 * 60 * 60)) % 24),
				minut: Math.floor((diff / 1000 / 60) % 60),
				sekund: Math.floor((diff / 1000) % 60),
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	if (!hasMounted) return null;

	return (
		<section className={styles.countdown}>
			<h2>KONFERENCJA ROZPOCZNIE SIĘ ZA</h2>
			<div className={styles.countdown__grid}>
				{Object.entries(timeLeft).map(([label, value]) => (
					<div key={label} className={styles.countdown__item}>
						<span className={styles.countdown__value}>{String(value).padStart(2, '0')}</span>
						<span className={styles.countdown__label}>{label.toUpperCase()}</span>
					</div>
				))}
			</div>
		</section>
	);
}
