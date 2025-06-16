import styles from './Vocalist.module.scss';
import SectionHeader from '../SectionHeader';
import Image from 'next/image';
import { FaMusic, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

export default function Vocalist() {
	return (
		<section className={styles.vocalist}>
			<SectionHeader title='Oprawa Muzyczna' subtitle='Poznaj artystkę, która zapewni niezapomnianą atmosferę muzyczną podczas konferencji' />

			<div className={styles.vocalist__card}>
				<div className={styles.vocalist__content}>
					<span className={styles.vocalist__tag}>Oprawa Artystyczna</span>
					<h3>Ilona Perz-Golka</h3>
					<p className={styles.vocalist__role}>Skrzypaczka i Wokalistka</p>
					<p>
						Utalentowana artystka, która swoim głosem i grą na skrzypcach tworzy magiczną atmosferę podczas wydarzeń biznesowych. Jej repertuar
						obejmuje zarówno klasyczne utwory, jak i nowoczesne interpretacje znanych melodii.
						<br />
						<br />
						Ilona ma za sobą liczne występy na prestiżowych wydarzeniach korporacyjnych, gdzie jej muzyka stanowi idealne tło dla networkingu i
						oficjalnych części programu. Jej profesjonalizm i talent sprawiają, że każde wydarzenie zyskuje wyjątkowy charakter.
						<br />
						<br />
						Podczas konferencji BBMS5 Ilona zapewni oprawę muzyczną, która podkreśli elegancki charakter wydarzenia i stworzy przyjemną atmosferę dla
						wszystkich uczestników.
					</p>
					<div className={styles.vocalist__social}>
						<a href='https://www.instagram.com/ylo_violin/' className={styles.social__link} target='_blank' rel='noopener noreferrer'>
							<FaInstagram />
						</a>
						<a href='https://www.linkedin.com/in/ilona-perz-golka/' className={styles.social__link} target='_blank' rel='noopener noreferrer'>
							<FaLinkedinIn />
						</a>
					</div>
				</div>
				<div className={styles.vocalist__image}>
					<Image
						src='/vocalist.jpg'
						alt='Ilona Perz-Golka'
						width={400}
						height={400}
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
					/>
					<div className={styles.vocalist__music_icon}>
						<FaMusic />
					</div>
				</div>
			</div>
		</section>
	);
}
