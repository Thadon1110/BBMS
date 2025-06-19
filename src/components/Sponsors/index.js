'use client';

import styles from './Sponsors.module.scss';
import SectionHeader from '../SectionHeader';
import Image from 'next/image';
import { useState } from 'react';

const sponsorsList = [
	{
		id: 1,
		name: 'Trawialnia.eu',
		image: '/sponsors/trawialnia.webp',
		url: 'https://trawialnia.eu/',
		scale: 1.0, // Normalna wielkość
	},
	{
		id: 2,
		name: 'IC Service',
		image: '/sponsors/icservice.webp',
		url: 'https://www.icservice.pl/',
		scale: 1.3, // Większe logo
	},
	// {
	// 	id: 3,
	// 	name: 'Logo Sponsor 3',
	// 	image: '/sponsors/trawialnia.webp',
	// 	url: 'https://example.com/sponsor3',
	// 	scale: 1.2, // Większe logo
	// },
	// {
	// 	id: 4,
	// 	name: 'Logo Sponsor 4',
	// 	image: '/sponsors/trawialnia.webp',
	// 	url: 'https://example.com/sponsor4',
	// 	scale: 0.9, // Nieco mniejsze
	// },
	// {
	// 	id: 5,
	// 	name: 'Logo Sponsor 5',
	// 	image: '/sponsors/trawialnia.webp',
	// 	url: 'https://example.com/sponsor5',
	// 	scale: 1.1, // Nieco większe
	// },
	// {
	// 	id: 6,
	// 	name: 'Logo Sponsor 6',
	// 	image: '/sponsors/trawialnia.webp',
	// 	url: 'https://example.com/sponsor6',
	// 	scale: 1.0, // Normalna wielkość
	// },
];

export default function Sponsors() {
	const [hoveredSponsor, setHoveredSponsor] = useState(null);

	return (
		<section className={styles.sponsors} id='sponsorzy'>
			<SectionHeader title='Sponsorzy' subtitle='Dziękujemy naszym partnerom za wsparcie tegorocznej edycji konferencji' />

			<div className={styles.sponsors__container}>
				{sponsorsList.map((sponsor) => {
					const isHovered = hoveredSponsor === sponsor.id;
					const currentScale = sponsor.scale || 1;
					const hoverScale = isHovered ? currentScale * 1.05 : currentScale;

					return (
						<div
							key={sponsor.id}
							className={styles.sponsor__card}
							onMouseEnter={() => setHoveredSponsor(sponsor.id)}
							onMouseLeave={() => setHoveredSponsor(null)}
						>
							<a
								href={sponsor.url}
								className={styles.sponsor__link}
								target='_blank'
								rel='noopener noreferrer'
								aria-label={`Odwiedź stronę ${sponsor.name}`}
							>
								<div className={styles.sponsor__imageWrapper}>
									<Image
										src={sponsor.image}
										alt={sponsor.name}
										width={250}
										height={200}
										className={styles.sponsor__logo}
										style={{
											transform: `scale(${hoverScale})`,
											filter: isHovered ? 'brightness(1.1) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
										}}
									/>
								</div>
								<div className={styles.sponsor__overlay}>
									<span className={styles.sponsor__name}>{sponsor.name}</span>
								</div>
							</a>
						</div>
					);
				})}
			</div>
		</section>
	);
}
