'use client';

import styles from './Footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaFacebookF, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__top}>
				<div className={styles.footer__container}>
					<div className={styles.footer__brand}>
						<div className={styles.brand__logo}>
							<Image src='/logo.png' alt='BBMS Logo' width={220} height={75} className={styles.logo__image} />
						</div>
						<p className={styles.brand__text}>
							Konferencja BIG BUSINESS MEETS SCIENCE to wyjątkowe wydarzenie łączące świat biznesu i nauki. Dołącz do nas, aby zdobyć wiedzę, kontakty
							i inspirację!
						</p>
						<div className={styles.brand__social}>
							<a href='#' className={styles.social__link} aria-label='LinkedIn'>
								<FaLinkedin />
							</a>
							<a href='#' className={styles.social__link} aria-label='Facebook'>
								<FaFacebookF />
							</a>
							<a href='#' className={styles.social__link} aria-label='YouTube'>
								<FaYoutube />
							</a>
						</div>
					</div>

					<div className={styles.footer__nav}>
						<div className={styles.nav__column}>
							<h3 className={styles.nav__title}>Nawigacja</h3>
							<ul className={styles.nav__list}>
								<li>
									<Link href='/#prelegenci'>Prelegenci</Link>
								</li>
								<li>
									<Link href='/#agenda'>Agenda</Link>
								</li>
								<li>
									<Link href='/#bilety'>Bilety</Link>
								</li>
								<li>
									<Link href='/#galeria'>Galeria</Link>
								</li>
								<li>
									<Link href='/#kontakt'>Kontakt</Link>
								</li>
							</ul>
						</div>

						<div className={styles.nav__column}>
							<h3 className={styles.nav__title}>Informacje</h3>
							<ul className={styles.nav__list}>
								{/* <li>
									<Link href='/#o-konferencji'>O konferencji</Link>
								</li> */}
								<li>
									<Link href='/#gosc-glowny'>Główny gość</Link>
								</li>
								<li>
									<Link href='/#prelegenci'>Nasi prelegenci</Link>
								</li>
								<li>
									<Link href='/#glowna-wokalistka'>Główna wokalistka</Link>
								</li>
								<li>
									<Link href='/#sponsorzy'>Nasi sponsorzy</Link>
								</li>
								{/* <li>
									<Link href='/#kontakt'>Kontakt z nami</Link>
								</li> */}
							</ul>
						</div>

						<div className={styles.nav__column}>
							<h3 className={styles.nav__title}>Kontakt</h3>
							<ul className={styles.nav__list}>
								<li>
									<a href='tel:+48668102874' className={styles.contact__link}>
										+48 668 102 874
									</a>
								</li>
								<li>
									<a href='mailto:mfuz@trawialnia.eu' className={styles.contact__link}>
										mfuz@trawialnia.eu
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.footer__bottom}>
				<div className={styles.footer__container}>
					<p className={styles.footer__copyright}>&copy; {new Date().getFullYear()} BBMS - Wszelkie prawa zastrzeżone.</p>
				</div>
			</div>
		</footer>
	);
}
