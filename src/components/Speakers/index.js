import styles from './Speakers.module.scss';
import SectionHeader from '../SectionHeader';
import Image from 'next/image';
import { FaLinkedinIn } from 'react-icons/fa6';

const speakersData = [
	{
		id: 1,
		name: 'Dr. Hab. Inż. Zbigniew Brytan',
		role: 'Wykładowca na Politechnice Śląskiej',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
		image: '/placeholder.png',
		linkedin: 'https://linkedin.com/',
	},
	{
		id: 2,
		name: 'Dr. Hab. Inż. Zbigniew Brytan',
		role: 'Wykładowca na Politechnice Śląskiej',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
		image: '/placeholder.png',
		linkedin: 'https://linkedin.com/',
	},
	{
		id: 3,
		name: 'Dr. Hab. Inż. Zbigniew Brytan',
		role: 'Wykładowca na Politechnice Śląskiej',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
		image: '/placeholder.png',
		linkedin: 'https://linkedin.com/',
	},
	{
		id: 4,
		name: 'Dr. Hab. Inż. Zbigniew Brytan',
		role: 'Wykładowca na Politechnice Śląskiej',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
		image: '/placeholder.png',
		linkedin: 'https://linkedin.com/',
	},
	{
		id: 5,
		name: 'Dr. Hab. Inż. Zbigniew Brytan',
		role: 'Wykładowca na Politechnice Śląskiej',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
		image: '/placeholder.png',
		linkedin: 'https://linkedin.com/',
	},
	{
		id: 6,
		name: 'Dr. Hab. Inż. Zbigniew Brytan',
		role: 'Wykładowca na Politechnice Śląskiej',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
		image: '/placeholder.png',
		linkedin: 'https://linkedin.com/',
	},
];

export default function Speakers() {
	return (
		<section className={styles.speakers}>
			<SectionHeader title='Nasi Prelegenci' subtitle='Poznaj ekspertów, którzy podzielą się swoją wiedzą i doświadczeniem podczas BBMS5' />

			<div className={styles.speakers__grid}>
				{speakersData.map((speaker) => (
					<div key={speaker.id} className={styles.speaker__card}>
						<div className={styles.speaker__image}>
							<Image
								src={speaker.image}
								alt={speaker.name}
								width={200}
								height={200}
								placeholder='blur'
								blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
							/>
							{/* <a href={speaker.linkedin} className={styles.linkedin__icon} target='_blank' rel='noopener noreferrer'>
								<FaLinkedinIn />
							</a> */}
						</div>

						<div className={styles.speaker__info}>
							<h3>{speaker.name}</h3>
							<span className={styles.speaker__role}>{speaker.role}</span>
							<p>{speaker.description}</p>
							<div className={styles.info__media}>
								<a href={speaker.linkedin} className={styles.linkedin__link} target='_blank' rel='noopener noreferrer'>
									<FaLinkedinIn />
								</a>
								<a href={speaker.linkedin} className={styles.linkedin__link} target='_blank' rel='noopener noreferrer'>
									<FaLinkedinIn />
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
