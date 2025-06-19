import styles from './MainGuest.module.scss';
import SectionHeader from '../SectionHeader';
import Image from 'next/image';
import { FaInstagram, FaWikipediaW, FaLinkedinIn } from 'react-icons/fa6';

export default function MainGuest() {
	return (
		<section className={styles.star} id='gosc-glowny'>
			<SectionHeader title='Gwiazdą Programu' subtitle='Poznaj naszą główną prelegentkę, która podzieli się unikalnymi doświadczeniami i wiedzą' />

			<div className={styles.star__card}>
				<div className={styles.star__content}>
					<span className={styles.star__tag}>Główna Gwiazda</span>
					<h3>Beata Tadla</h3>
					<p>
						Beata Tadla to jedna z najbardziej rozpoznawalnych dziennikarek i prezenterek telewizyjnych w Polsce. Od lat związana z mediami, zdobywała
						doświadczenie w największych stacjach informacyjnych, prowadząc programy publicystyczne, informacyjne oraz wywiady z najważniejszymi
						postaciami świata polityki, nauki i biznesu.
					</p>
					<p>
						Znana z charyzmy, profesjonalizmu i niezwykłej umiejętności budowania relacji, od lat inspiruje kolejne pokolenia dziennikarzy i liderów
						opinii. Podczas konferencji BBMS5 opowie o roli komunikacji, wiarygodności i odwagi w świecie dynamicznych zmian
						społeczno-technologicznych.
					</p>
					<p>
						Jej wystąpienie będzie nie tylko spotkaniem z wieloletnim doświadczeniem medialnym, ale też osobistą refleksją nad tym, co w dzisiejszym
						świecie najbardziej przyciąga uwagę odbiorców i buduje autentyczne relacje.
					</p>

					<div className={styles.star__social}>
						<a href='https://www.linkedin.com/in/beata-tadla-1b51a1119/' className={styles.social__link} target='_blank' rel='noopener noreferrer'>
							<FaLinkedinIn />
						</a>
						<a href='https://www.instagram.com/beatatadla/' className={styles.social__link} target='_blank' rel='noopener noreferrer'>
							<FaInstagram />
						</a>
						<a href='https://en.wikipedia.org/wiki/Beata_Tadla' className={styles.social__link} target='_blank' rel='noopener noreferrer'>
							<FaWikipediaW />
						</a>
					</div>
				</div>
				<div className={styles.star__image}>
					<Image
						src='/main_star.jpg'
						alt='Beata Tadla'
						width={400}
						height={400}
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
					/>
				</div>
			</div>
		</section>
	);
}
