import styles from './Agenda.module.scss';
import SectionHeader from '../SectionHeader';
import { FaClock } from 'react-icons/fa6';

const agendaItems = [
	{
		id: 1,
		time: '9:00 - 10:00',
		title: 'Rejestracja i poranna kawa',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
	},
	{
		id: 2,
		time: '9:00 - 10:00',
		title: 'Rejestracja i poranna kawa',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
	},
	{
		id: 3,
		time: '9:00 - 10:00',
		title: 'Rejestracja i poranna kawa',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
	},
	{
		id: 4,
		time: '9:00 - 10:00',
		title: 'Rejestracja i poranna kawa',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
	},
	{
		id: 5,
		time: '9:00 - 10:00',
		title: 'Rejestracja i poranna kawa',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
	},
	{
		id: 6,
		time: '9:00 - 10:00',
		title: 'Rejestracja i poranna kawa',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
	},
	{
		id: 7,
		time: '9:00 - 10:00',
		title: 'Rejestracja i poranna kawa',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
	},
	{
		id: 8,
		time: '9:00 - 10:00',
		title: 'Rejestracja i poranna kawa',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
	},
	{
		id: 9,
		time: '9:00 - 10:00',
		title: 'Rejestracja i poranna kawa',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
	},
	{
		id: 10,
		time: '9:00 - 10:00',
		title: 'Rejestracja i poranna kawa',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
	},
];

export default function Agenda() {
	return (
		<section className={styles.agenda}>
			<SectionHeader title='Program Konferencji' subtitle='Zaplanuj swój udział w najciekawszych wykładach i warsztatach' />

			<div className={styles.agenda__container}>
				{agendaItems.map((item) => (
					<div key={item.id} className={styles.agenda__item}>
						<div className={styles.agenda__time}>
							<FaClock className={styles.clock__icon} />
							<span>{item.time}</span>
						</div>

						<div className={styles.agenda__content}>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
