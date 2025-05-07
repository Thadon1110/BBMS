import styles from './page.module.scss';
import Image from 'next/image';
import { FaCalendarDays, FaLocationDot, FaTicket, FaCalendarCheck } from 'react-icons/fa6';

//Components
import Countdown from '@/components/Countdown';
import MainGuest from '@/components/MainGuest';
import Speakers from '@/components/Speakers';
import Agenda from '@/components/Agenda';
import Tickets from '@/components/Tickets';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Sponsors from '@/components/Sponsors';

export default function Home() {
	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__bgc}></div>
				<Image className={styles.header__background} src='/background_max.webp' alt='' fill priority></Image>

				<div className={styles.header__content}>
					<div className={styles.content__info}>
						<p className={styles.info__date}>
							<FaCalendarDays /> <time dateTime='2025-09-17'>17 Września 2025</time>
						</p>

						<p className={styles.info__location}>
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
						<a href='#' className={styles.buttons__ticket}>
							<FaTicket /> Kup Bilet
						</a>

						<a href='#' className={styles.buttons__agenda}>
							<FaCalendarCheck /> Zobacz Agendę
						</a>
					</div>
				</div>
			</header>

			<Countdown />

			<main className={styles.main}>
				<MainGuest />
				<Speakers />
				<Agenda />
				<Tickets />
				<Gallery />
				<Sponsors />
				<Contact />
			</main>
		</>
	);
}
