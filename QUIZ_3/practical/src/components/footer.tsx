import styles from '@/styles/Footer.module.sass';

export default function Footer() {
    return (
        <div>
            <div className={styles.container}>
                <ul className={styles.ulstyle}>
                    <li>ABOUT</li>
                    <li>OUR COMPANY</li>
                    <li>OUR TEAM</li>
                </ul>
                <ul className={styles.ulstyle}>
                    <li>HELP</li>
                    <li>HELP CENTER</li>
                    <li>FAQ</li>
                    <li>PRIVACY</li>
                </ul>
                <ul className={styles.ulstyle}>
                    <li>CONTACT</li>
                    <li>PHONE</li>
                    <li>EMAIL</li>
                </ul>
            </div>
        </div>
    )
}