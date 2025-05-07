import styles from './Sponsors.module.scss';
import SectionHeader from '../SectionHeader';
import Image from 'next/image';

const sponsorsList = [
	{
		id: 1,
		name: 'Logo Sponsor 1',
		image: '/placeholder.png',
		url: 'https://example.com/sponsor1',
	},
	{
		id: 2,
		name: 'Logo Sponsor 2',
		image: '/placeholder.png',
		url: 'https://example.com/sponsor2',
	},
	{
		id: 3,
		name: 'Logo Sponsor 3',
		image: '/placeholder.png',
		url: 'https://example.com/sponsor3',
	},
	{
		id: 4,
		name: 'Logo Sponsor 4',
		image: '/placeholder.png',
		url: 'https://example.com/sponsor4',
	},
	{
		id: 5,
		name: 'Logo Sponsor 5',
		image: '/placeholder.png',
		url: 'https://example.com/sponsor5',
	},
	{
		id: 6,
		name: 'Logo Sponsor 6',
		image: '/placeholder.png',
		url: 'https://example.com/sponsor6',
	},
];

export default function Sponsors() {
	return (
		<section className={styles.sponsors}>
			<SectionHeader title='Sponsorzy' subtitle='Dziękujemy naszym partnerom za wsparcie tegorocznej edycji konferencji' />

			<div className={styles.sponsors__container}>
				{sponsorsList.map((sponsor) => (
					<a key={sponsor.id} href={sponsor.url} className={styles.sponsor__item} target='_blank' rel='noopener noreferrer'>
						<Image src={sponsor.image} alt={sponsor.name} width={180} height={100} className={styles.sponsor__logo} />
					</a>
				))}
			</div>
		</section>
	);
}
