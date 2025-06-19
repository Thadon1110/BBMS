import styles from './Agenda.module.scss';
import SectionHeader from '../SectionHeader';
import { FaClock } from 'react-icons/fa6';

export const agendaItems = [
	{
		id: 1,
		time: '11:00 – 11:55',
		title: 'Rejestracja i networking',
		description:
			'Zacznij dzień od aromatycznej kawy, poznaj pierwsze twarze i odbierz pakiet konferencyjny. To idealny moment, by złapać pierwszy kontakt i rozgrzać się do dyskusji.',
	},
	{
		id: 2,
		time: '12:00 – 12:10',
		title: 'Uroczyste otwarcie konferencji',
		description:
			'Witamy oficjalnie! Przedstawimy program, główne tematy i powitamy gości honorowych. Krótkie wystąpienie organizatorów nada ton całemu wydarzeniu.',
	},
	{
		id: 3,
		time: '12:15 – 13:30',
		title: 'Prezentacja: „Stal nierdzewna w innowacyjnych zastosowaniach”',
		description:
			'Wejdź w świat nowoczesnych technologii – od AI po przemysł ciężki. Dwóch topowych ekspertów odkryje przed Tobą potencjał stali nierdzewnej w przyszłości przemysłu.',
	},
	{
		id: 4,
		time: '13:30 – 14:15',
		title: 'Warsztat naukowy: „Zmysł na metalowej ścieżce”',
		description:
			'Technologia spotyka praktykę. Interaktywny warsztat z dr. inż. Adamem Mirką to okazja, by dotknąć innowacji i zrozumieć ją od środka.',
	},
	{
		id: 5,
		time: '14:20 – 15:10',
		title: 'Przerwa lunchowa & networking',
		description:
			'Przerwa z charakterem – pyszny lunch w towarzystwie ludzi z branży. Idealna okazja na wymianę wizytówek i rozmowy, które mogą zaprocentować.',
	},
	{
		id: 6,
		time: '15:20 – 17:00',
		title: 'Panel biznesu: „Nasza przyszłość”',
		description:
			'Mocny skład panelistów i gorące tematy: sztuczna inteligencja, odpowiedzialność technologiczna, globalne regulacje. To nie wykład – to zderzenie wizji.',
	},
	{
		id: 7,
		time: '17:00 – 17:15',
		title: 'Podsumowanie i zamknięcie konferencji',
		description: 'Czas zebrać myśli, wyciągnąć wnioski i zakończyć dzień z konkretem. Podziękowania, refleksje i... zapowiedź kolejnej edycji!',
	},
	{
		id: 8,
		time: '17:30 – 22:00',
		title: 'Bankiet biznesowy & networking',
		description:
			'Kolacja w eleganckim stylu, kieliszek w dłoni, rozmowy bez garniturowego spięcia. Czas na mniej oficjalną stronę networkingu – i może nowe partnerstwa.',
	},
];

export default function Agenda() {
	return (
		<section className={styles.agenda} id='agenda'>
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
