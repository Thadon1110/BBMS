'use client';

import styles from './page.module.scss';
import Image from 'next/image';
import { FaCalendarDays, FaLocationDot, FaTicket, FaCalendarCheck } from 'react-icons/fa6';

//Components
import Countdown from '@/components/Countdown';
import MainGuest from '@/components/MainGuest';
import Speakers from '@/components/Speakers';
import Vocalist from '@/components/Vocalist';
import Agenda from '@/components/Agenda';
import Tickets from '@/components/Tickets';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Sponsors from '@/components/Sponsors';

export default function Home() {
	const handleAddToCalendar = () => {
		const eventDetails = {
			title: 'BIG BUSINESS MEETS SCIENCE 5',
			start: '2025-09-17T11:00:00',
			end: '2025-09-17T22:00:00',
			location: 'Hotel Villa Verde, Zawiercie',
			description:
				'Dołącz do wyjątkowej konferencji łączącej świat biznesu i nauki – inspirujące prelekcje, networking i wiedza na najwyższym poziomie.',
		};

		// Google Calendar URL
		const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start.replace(/[-:]/g, '').replace('T', 'T')}Z/${eventDetails.end.replace(/[-:]/g, '').replace('T', 'T')}Z&location=${encodeURIComponent(eventDetails.location)}&details=${encodeURIComponent(eventDetails.description)}`;

		// Otwórz Google Calendar
		window.open(googleCalendarUrl, '_blank');
	};

	const handleOpenLocation = () => {
		const location = 'Hotel Villa Verde, Zawiercie';
		const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

		// Otwórz Google Maps
		window.open(googleMapsUrl, '_blank');
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__bgc}></div>
				<Image className={styles.header__background} src='/background_max.webp' alt='' fill priority></Image>

				<div className={styles.header__content}>
					<div className={styles.content__info}>
						<p
							className={`${styles.info__date} ${styles.clickable}`}
							onClick={handleAddToCalendar}
							title='Dodaj do kalendarza'
							role='button'
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									handleAddToCalendar();
								}
							}}
						>
							<FaCalendarDays /> <time dateTime='2025-09-17'>17 Września 2025</time>
						</p>

						<p
							className={`${styles.info__location} ${styles.clickable}`}
							onClick={handleOpenLocation}
							title='Zobacz lokalizację na mapie'
							role='button'
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									handleOpenLocation();
								}
							}}
						>
							<FaLocationDot /> Hotel Villa Verde, Zawiercie
						</p>
					</div>

					<h1>
						BIG BUSINESS MEETS SCIENCE <span className={styles.title__color}>5</span>
					</h1>

					<p className={styles.content__desc}>
						Dołącz do wyjątkowej konferencji łączącej świat biznesu i nauki – inspirujące prelekcje, networking i wiedza na najwyższym poziomie.
					</p>

					<div className={styles.content__buttons}>
						<a href='#bilety' className={styles.buttons__ticket}>
							<FaTicket /> Kup Bilet
						</a>

						<a href='#agenda' className={styles.buttons__agenda}>
							<FaCalendarCheck /> Zobacz Agendę
						</a>
					</div>
				</div>
			</header>

			<Countdown />

			<main className={styles.main}>
				<MainGuest />
				<Speakers />
				<Vocalist />
				<Agenda />
				<Tickets />
				<Gallery />
				<Sponsors />
				<Contact />
			</main>
		</>
	);
}
