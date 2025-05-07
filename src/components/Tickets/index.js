import styles from './Tickets.module.scss';
import SectionHeader from '../SectionHeader';
import { FaCheck } from 'react-icons/fa6';

const ticketTypes = [
	{
		id: 1,
		name: 'Free Pass',
		description: 'Limit darmowych wejść',
		price: 0,
		features: ['Sesja otwierająca', 'Materiały konferencyjne', 'Networking', 'Catering'],
		popular: false,
		badge: '20 Miejsc',
		buttonColor: 'white',
	},
	{
		id: 2,
		name: 'Silver',
		description: 'Pełen dostęp do konferencji',
		price: 499,
		features: ['Sesja otwierająca', 'Materiały konferencyjne', 'Networking', 'Catering'],
		popular: true,
		badge: 'Najpopularniejszy',
		buttonColor: 'primary',
	},
];

export default function Tickets() {
	return (
		<section className={styles.tickets}>
			<SectionHeader title='Bilety' subtitle='Zarezerwuj swoje miejsce na konferencji' />

			<div className={styles.tickets__container}>
				{ticketTypes.map((ticket) => (
					<div key={ticket.id} className={`${styles.ticket__card} ${ticket.popular ? styles.ticket__popular : ''}`}>
						<p className={`${styles.ticket__badge} ${ticket.popular == true ? styles.badge__popular : styles.badge__standard}`}>{ticket.badge}</p>

						<h3 className={styles.ticket__name}>{ticket.name}</h3>
						<p className={styles.ticket__description}>{ticket.description}</p>

						<div className={styles.ticket__price}>
							<span className={styles.price__value}>{ticket.price}</span>
							<span className={styles.price__currency}>zł</span>
						</div>

						<ul className={styles.ticket__features}>
							{ticket.features.map((feature, index) => (
								<li key={index} className={styles.feature__item}>
									<FaCheck className={styles.feature__icon} />
									<span>{feature}</span>
								</li>
							))}
						</ul>

						<button className={`${styles.ticket__button} ${ticket.popular ? styles.button__popular : styles.button__standard}`}>Zarezerwuj</button>
					</div>
				))}
			</div>
		</section>
	);
}
