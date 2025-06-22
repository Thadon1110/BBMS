import styles from './Speakers.module.scss';
import SectionHeader from '../SectionHeader';
import Image from 'next/image';
import { FaLinkedinIn, FaWikipediaW, FaGlobe, FaInstagram } from 'react-icons/fa6';

const speakersData = [
	{
		id: 1,
		name: 'Joanna Idzikowska',
		role: 'Właścicielka i Dyrektor Zarządzająca Trawialnia.eu Sp. z o.o.',
		description:
			'Energetyczna liderka chemicznej obróbki metali – prekursorka trawienia i pasywacji stali nierdzewnej w Polsce. Założyła Trawialnia.eu (dawniej Chimimeca Polska) z francuskim kapitałem, kieruje firmą od ponad 20 lat, zdobywając m.in. tytuł w Diamentach Forbesa 2025. Fundatorka Fundacji Serca Kreacja i autorka “Mocna jak stal”, która łączy duchowość i biznes.',
		image: '/speakers/joanna_idzikowska.jpg',
		linkedin: 'https://www.linkedin.com/in/joanna-idzikowska/',
		instagram: 'https://www.instagram.com/joanna.idzikowska/',
		page: 'https://joannaidzikowska.pl/',
	},
	{
		id: 2,
		name: 'dr hab. inż. Zbigniew Brytan',
		role: 'Profesor uczelni na Politechnice Śląskiej',
		description:
			'Specjalista w zakresie inżynierii materiałowej, ze szczególnym naciskiem na badania nad odpornością metali na korozję i ich zastosowania w przemyśle. Wieloletni kierownik projektów badawczo‑rozwojowych oraz współautor wielu publikacji naukowych na tematy związane z nowoczesnymi technologiami materiałowymi.',
		image: '/speakers/zbigniew_brytan.jpg',
		linkedin: 'https://www.linkedin.com/in/zbigniew-brytan-0b09b416/',
	},
	{
		id: 3,
		name: 'mgr inż. Beata Drzazga',
		role: 'Prezes BetaMed S.A., członkini Rady Społecznej Politechniki Śląskiej',
		description:
			'Przedsiębiorczyni z wizją i empatią – założycielka i prezes BetaMed S.A., jednej z największych firm medycznych w Polsce (3200+ pracowników, 91 placówek). Członkini Rady Społecznej PŚ. Mentor, filantrop i aktywna prelegentka promująca etyczny biznes i ESG.',
		image: '/speakers/beata_drzazga.jpg',
		linkedin: 'https://www.linkedin.com/in/zbigniew-brytan-0b09b416/',
	},
	{
		id: 4,
		name: 'Ireneusz Popiół',
		role: 'Prezes Zarządu CHEMET S.A.',
		description:
			'Łączy naukę z biznesem – wprowadził symulacje numeryczne i własne laboratorium w CHEMET. Odznaczony Krzyżem Zasługi za wkład w rozwój przemysłu naftowo‑gazowego.',
		image: '/speakers/ireneusz_popiol.jpg',
		linkedin: 'https://www.linkedin.com/in/zbigniew-brytan-0b09b416/',
	},
	{
		id: 5,
		name: 'dr inż. Jerzy Niagaj, prof. nzw.',
		role: 'Profesor nadzwyczajny, Łukasiewicz – GIT (Centrum Spawalnictwa)',
		description:
			'Ekspert od energetyki jądrowej i technologii spawalniczych (MMA/TIG/MIG/FCAW/SAW), z 35-letnim doświadczeniem. Członek Kapituły MKES 2025, autor wytycznych ASME/AFCEN, licencjonowany Inżynier Spawalnik IWE, Visiting Professor w Lwowie 2021.',
		image: '/speakers/jerzy_niagaj.jpg',
		linkedin: 'https://www.linkedin.com/in/zbigniew-brytan-0b09b416/',
	},
	{
		id: 6,
		name: 'Małgorzata Różyńska-Woźniak',
		role: 'Prezes Zarządu PROMONTIN PROJECT Sp. z o.o.',
		description:
			'Zarządza PROMONTIN PROJECT – firmą inżynieryjno‑montażową specjalizującą się w EPC, instalacjach, filtracji i stalowych konstrukcjach. Firma uruchomiła nową halę w strefie Dębska Wola i realizuje projekty dekarbonizacyjne.',
		image: '/speakers/małgorzata_rozynska_wozniak.jpg',
		linkedin: 'https://www.linkedin.com/in/zbigniew-brytan-0b09b416/',
	},
	// {
	// 	id: 2,
	// 	name: 'prof. dr hab. inż. Juliusz Orlikowski',
	// 	role: 'Profesor na Politechnice Gdańskiej',
	// 	description:
	// 		'Ekspert w dziedzinie mechaniki materiałów i symulacji komputerowych struktur inżynierskich. Prowadzi zespoły badawcze specjalizujące się w modelowaniu numerycznym oraz technologii projektowania wspomaganego komputerowo (CAD), a także mentor młodych naukowców akademickich.',
	// 	image: '/speakers/juliusz_orlikowski.jpg',
	// 	linkedin: 'https://www.linkedin.com/in/juliusz-orlikowski-23173b7/',
	// 	wikipedia: 'https://pl.wikipedia.org/wiki/Juliusz_Orlikowski',
	// },
	// {
	// 	id: 3,
	// 	name: 'dr hab. inż. Stefan Krakowiak',
	// 	role: 'Profesor uczelni na Politechnice Gdańskiej',
	// 	description:
	// 		'Specjalista w dziedzinie elektrotechniki i systemów energetycznych. Zajmuje się technologiami ochrony przed korozją, nowoczesnymi powłokami ochronnymi oraz efektywnością energetyczną. Autor licznych publikacji naukowych oraz aktywny uczestnik projektów badawczych realizowanych na Wydziale Chemicznym PG.',
	// 	image: '/speakers/stefan_krakowiak.jpg',
	// 	linkedin: 'https://www.linkedin.com/in/stefan-krakowiak-4776a3177/',
	// },
	// {
	// 	id: 4,
	// 	name: 'Andrzej Michalski-Stępkowski',
	// 	role: 'Prezes Stowarzyszenia Stal Nierdzewna & Polskiego Stowarzyszenia Aluminium',
	// 	description:
	// 		'Od 2016 r. pełni rolę prezesa Stowarzyszenia Stal Nierdzewna (SSN), reprezentującego czołowe firmy z branży w Polsce. Od 2021 r. kieruje również Polskim Stowarzyszeniem Aluminium. Wcześniej związany jako dziennikarz i redaktor w „Rzeczpospolitej”, założyciel magazynu Nowa Stal, ekspert branży stalowej i aluminiowej z ponad 15-letnim doświadczeniem.',
	// 	image: '/speakers/andrzej_michalski_stepkowski.jpg',
	// 	linkedin: 'https://www.linkedin.com/in/andrzejmichalskist%C4%99pkowski/',
	// },
	// {
	// 	id: 5,
	// 	name: 'Green Reporting',
	// 	role: 'Startup technologiczny',
	// 	description:
	// 		'Green Reporting to polska firma założona w 2023 roku, specjalizująca się w automatyzacji procesów CBAM – Carbon Border Adjustment Mechanism. Oferuje narzędzie „Reporting Assistant”, które wspiera importery i służby celne w zbieraniu danych, generowaniu raportów CO₂ i zapewnianiu zgodności z regulacjami UE-wszystko z wykorzystaniem AI, ML i analizy danych.',
	// 	image: '/speakers/greenreporting.jpg',
	// 	linkedin: 'https://www.linkedin.com/company/green-reporting-ltd/',
	// 	page: 'https://greenreporting.eu/',
	// },
	// {
	// 	id: 6,
	// 	name: 'Aperam',
	// 	role: 'Globalna firma ze stali nierdzewnej',
	// 	description:
	// 		'Aperam to światowy lider w produkcji stali nierdzewnej, elektrycznej i specjalistycznej, silnie zorientowany na recykling i zrównoważony rozwój. Posiada zdolność produkcyjną 2,5 mln ton w Europie i Brazylii, w ponad 40 krajach, przy zaangażowaniu ~12 000 pracowników. W 90% wykorzystuje złom, a rozszerza ofertę o ogniwa recyklingowe, bio-charcoal czy rozwój cirkularnej ekonomii.',
	// 	image: '/speakers/aperam.jpg',
	// 	linkedin: 'https://www.linkedin.com/company/aperam-poland/',
	// 	page: 'https://www.aperam.com/pl/',
	// 	wikipedia: 'https://en.wikipedia.org/wiki/Aperam',
	// },
];

export default function Speakers() {
	return (
		<section className={styles.speakers} id='prelegenci'>
			<SectionHeader title='Nasi Prelegenci' subtitle='Poznaj ekspertów, którzy podzielą się swoją wiedzą i doświadczeniem podczas BBMS5' />

			<div className={styles.speakers__grid}>
				{speakersData.map((speaker) => (
					<div key={speaker.id} className={styles.speaker__card}>
						<div className={styles.speaker__image}>
							<Image
								src={speaker.image}
								alt={speaker.name}
								width={500}
								height={500}
								placeholder='blur'
								blurDataURL='data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACwAAAAAAQABAAACAkQBADs='
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
								{speaker.linkedin && (
									<a href={speaker.linkedin} className={styles.linkedin__link} target='_blank' rel='noopener noreferrer'>
										<FaLinkedinIn />
									</a>
								)}

								{speaker.wikipedia && (
									<a href={speaker.wikipedia} className={styles.linkedin__link} target='_blank' rel='noopener noreferrer'>
										<FaWikipediaW />
									</a>
								)}

								{speaker.instagram && (
									<a href={speaker.instagram} className={styles.linkedin__link} target='_blank' rel='noopener noreferrer'>
										<FaInstagram />
									</a>
								)}

								{speaker.page && (
									<a href={speaker.page} className={styles.linkedin__link} target='_blank' rel='noopener noreferrer'>
										<FaGlobe />
									</a>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
