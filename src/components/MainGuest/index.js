import styles from './MainGuest.module.scss';
import SectionHeader from '../SectionHeader';
import Image from 'next/image';
import { FaCalendarPlus } from 'react-icons/fa6';

export default function MainGuest() {
	return (
		<section className={styles.star}>
			<SectionHeader title='Gwiazdą Programu' subtitle='Poznaj naszą główną prelegentkę, która podzieli się unikalnymi doświadczeniami i wiedzą' />

			<div className={styles.star__card}>
				<div className={styles.star__content}>
					<span className={styles.star__tag}>Główna Gwiazda</span>
					<h3>Beata Tadla</h3>
					<p>
						loremDolore minim ullamco qui ex fugiat laborum. Do dolor laboris nisi ullamco. Et aliqua qui ipsum eiusmod anim laboris laboris pariatur
						pariatur ullamco. Consequat officia exercitation culpa irure nulla tempor ullamco non elit dolore ea esse proident. Duis Lorem Lorem nisi
						cupidatat culpa sunt labore duis in veniam.
						<br />
						<br />
						Mollit ut exercitation cupidatat dolore aliquip est ullamco ipsum est excepteur proident eu. Do ea exercitation cillum dolor exercitation.
						Sint ut amet ullamco dolor laboris ut veniam aute. Aute amet ipsum dolor ea ad dolore consectetur ut. Mollit veniam ea elit incididunt
						consequat mollit anim sit. Exercitation est incididunt aliquip id cupidatat laboris ea exercitation aliquip ullamco magna laborum ullamco.
						Et aliqua ex qui aute proident anim minim consequat ipsum reprehenderit laborum veniam.
						<br />
						<br />
						Id velit id duis sit occaecat. Aute cillum eiusmod nostrud amet ea qui elit ipsum reprehenderit commodo irure officia. Pariatur cupidatat
						consequat velit ex commodo et do sint ut id. Nisi irure velit laboris deserunt in velit deserunt sit dolore sint sunt nostrud sunt. Dolor
						quis non sint reprehenderit pariatur est.
					</p>
					{/* <a className={styles.star__calendar} href='#'>
						<FaCalendarPlus /> Dodaj do kalendarza
					</a> */}
				</div>
				<div className={styles.star__image}>
					<Image src='https://placehold.co/320x320.png?text=Beata+Tadla&font=montserrat' alt='Beata Tadla' width={320} height={320} />
				</div>
			</div>
		</section>
	);
}
