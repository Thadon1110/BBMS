'use client';

import { useState, useRef } from 'react';
import styles from './Gallery.module.scss';
import SectionHeader from '../SectionHeader';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

// Sample gallery items with YouTube video IDs
const galleryItems = [
	{
		id: 6,
		title: 'Big Business Meets Science 4 - Radosław Dzik o sztucznej inteligencji',
		description: 'Radosław Dzik o sztucznej inteligencji podczas Big Business Meets Science 4 (24.11.2023 r.)',
		videoId: 'v_ysmb6w5Nw',
	},
	{
		id: 9,
		title: 'Big Business Meets Science 4 - Wojciech Taranczewski o pracach antykorozyjnych',
		description: 'Wojciech Taranczewski o pracach antykorozyjnych podczas Big Business Meets Science 4 (24.11.2023 r.)',
		videoId: 'LUuFZuI8wEw',
	},
	{
		id: 5,
		title: 'Big Business Meets Science 4 - Kulisy wydarzenia',
		description: 'Kulisy Big Business Meets Science 4 - gali zorganizowanej przez Joannę Idzikowską (trawialnia.eu)',
		videoId: 'Uea9K5YJ6bk',
	},
	{
		id: 4,
		title: 'Big Business Meets Science 1 - Rafael Badziag o wydarzeniu',
		description: 'Rafael Badziag na otwarciu hali trawialnia.eu oraz konferencji BIG BUSINESS MEETS SCIENCE',
		videoId: 'r6kGJkQjQQY',
	},
	{
		id: 1,
		title: 'Big Business Meets Science 4 - Profesor Zbigniew Brytan o korozji',
		description: 'Profesor Zbigniew Brytan - Jak unikać korozji stali nierdzewnych',
		videoId: 'eyfZEKkB2IM',
	},
	{
		id: 3,
		title: 'Big Business Meets Science 3 - Kulisy wydarzenia',
		description: 'Kulisy Big Business Meets Science 3 - gali zorganizowanej przez Joannę Idzikowską (trawialnia.eu)',
		videoId: 'VcZMacOHBVI',
	},
	{
		id: 2,
		title: 'Big Business Meets Science 1 - Podsumowanie otwarcia hali trawialnia.eu',
		description: 'Big Business Meets Science - podsumowanie otwarcia hali trawialnia.eu (20.02.2020 r.)',
		videoId: 'ZZ2XPgtECg4',
	},
	{
		id: 8,
		title: 'Big Business Meets Science 2 - Maciej Orłoś o Fundacji Serca Kreacja',
		description: 'Maciej Orłoś o Fundacji Serca Kreacja oraz Big Business Meets Science 2',
		videoId: 'rDhiZsRa4Rc',
	},
	{
		id: 7,
		title: 'Big Business Meets Science 2 - Rozpoczęcie',
		description: 'Idzikowska i Orłoś na rozpoczęcie Big Business Meets Science 2 (24.05.2021 r.)',
		videoId: 'BnIKdprAn3g',
	},
];

export default function Gallery() {
	const [showMore, setShowMore] = useState(false);
	const [activeVideo, setActiveVideo] = useState(null);
	const videoRef = useRef(null);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	// Determine how many videos to show - default 4, all when expanded
	const visibleItems = showMore ? galleryItems : galleryItems.slice(0, 4);

	// Function to get YouTube thumbnail URL
	const getYouTubeThumbnail = (videoId) => {
		return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	};

	// Function to play video
	const playVideo = (videoId) => {
		setActiveVideo(videoId);
		// You could add modal functionality here or redirect to YouTube
		window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
	};

	// Funkcja do obsługi błędów ładowania obrazu
	const handleImageError = (e, videoId) => {
		// Fallback do hqdefault jeśli maxresdefault nie jest dostępne
		e.target.onerror = null; // Unikamy nieskończonej pętli błędów
		e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
	};

	return (
		<section className={styles.gallery}>
			<SectionHeader title='Galeria' subtitle='Zobacz jak było podczas poprzednich edycji' />

			<div className={`${styles.gallery__grid} ${showMore ? styles.gallery__expanded : ''}`}>
				{visibleItems.map((item, index) => (
					<div key={item.id} className={styles.gallery__item} style={{ '--item-index': index }} onClick={() => playVideo(item.videoId)}>
						<div className={styles.thumbnail}>
							{/* Use YouTube thumbnail instead of local image */}
							<div
								className={styles.thumbnail__image}
								style={{
									backgroundImage: `url(${getYouTubeThumbnail(item.videoId)})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
									width: '100%',
									height: '100%',
								}}
								alt={item.title}
								onError={(e) => handleImageError(e, item.videoId)}
								loading='lazy'
							/>
							<div className={styles.thumbnail__overlay}>
								<div className={styles.play__button}>
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
										<polygon points='5,3 19,12 5,21' fill='currentColor' />
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
