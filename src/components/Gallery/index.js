'use client';

import { useState } from 'react';
import styles from './Gallery.module.scss';
import SectionHeader from '../SectionHeader';
import Image from 'next/image';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

const galleryItems = [
	{
		id: 1,
		title: 'Highlights - Edycja 4',
		description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.',
		thumbnail: '/placeholder.png',
		videoId: 'VIDEO_ID_1',
	},
	{
		id: 2,
		title: 'Highlights - Edycja 4',
		description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.',
		thumbnail: '/placeholder.png',
		videoId: 'VIDEO_ID_2',
	},
	{
		id: 3,
		title: 'Highlights - Edycja 4',
		description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.',
		thumbnail: '/placeholder.png',
		videoId: 'VIDEO_ID_3',
	},
	{
		id: 4,
		title: 'Highlights - Edycja 4',
		description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.',
		thumbnail: '/placeholder.png',
		videoId: 'VIDEO_ID_4',
	},
	// Dodatkowe filmy, które będą widoczne po kliknięciu "Zobacz więcej"
	{
		id: 5,
		title: 'Highlights - Edycja 3',
		description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.',
		thumbnail: '/placeholder.png',
		videoId: 'VIDEO_ID_5',
	},
	{
		id: 6,
		title: 'Highlights - Edycja 3',
		description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.',
		thumbnail: '/placeholder.png',
		videoId: 'VIDEO_ID_6',
	},
	{
		id: 7,
		title: 'Highlights - Edycja 2',
		description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.',
		thumbnail: '/placeholder.png',
		videoId: 'VIDEO_ID_7',
	},
	{
		id: 8,
		title: 'Highlights - Edycja 2',
		description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.',
		thumbnail: '/placeholder.png',
		videoId: 'VIDEO_ID_8',
	},
];

export default function Gallery() {
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	// Określamy ile filmów pokazać - domyślnie 4, po rozwinięciu wszystkie
	const visibleItems = showMore ? galleryItems : galleryItems.slice(0, 4);

	return (
		<section className={styles.gallery}>
			<SectionHeader title='Galeria' subtitle='Zobacz jak było podczas poprzednich edycji' />

			<div className={`${styles.gallery__grid} ${showMore ? styles.gallery__expanded : ''}`}>
				{visibleItems.map((item) => (
					<div key={item.id} className={styles.gallery__item}>
						<div className={styles.thumbnail}>
							<Image src={item.thumbnail} alt={item.title} width={480} height={320} className={styles.thumbnail__image} />
							<div className={styles.thumbnail__overlay}>
								<div className={styles.play__button}>
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
										<polygon points='5,3 19,12 5,21' />
									</svg>
								</div>
							</div>
						</div>
						<div className={styles.gallery__info}>
							<h3 className={styles.info__title}>{item.title}</h3>
							<p className={styles.info__description}>{item.description}</p>
						</div>
					</div>
				))}
			</div>

			<button className={styles.gallery__more} onClick={toggleShowMore} aria-expanded={showMore}>
				{showMore ? (
					<>
						<FaAngleUp className={styles.more__icon} />
						POKAŻ MNIEJ
					</>
				) : (
					<>
						<FaAngleDown className={styles.more__icon} />
						ZOBACZ WIĘCEJ FILMÓW
					</>
				)}
			</button>
		</section>
	);
}
