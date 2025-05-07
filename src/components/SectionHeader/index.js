import styles from './SectionHeader.module.scss';

export default function SectionHeader({ title, subtitle }) {
	return (
		<div className={styles.header}>
			<h2>{title}</h2>
			<p>{subtitle}</p>
		</div>
	);
}
