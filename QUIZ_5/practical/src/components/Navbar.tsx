import Link from "next/link";
import styles from "@/styles/Navbar.module.sass";

export default function Navbar() {
  return (
    <div className={styles.navcontainer}>
      <div className={styles.nav1}>
        <Link href="/">meet minions</Link>
        <Link href="/">minions gallery</Link>
        <Link href="/">post minions</Link>
      </div>
      <div className={styles.nav2}>
        <Link href="/">login</Link>
        <Link href="/">register</Link>
      </div>
    </div>
  );
}
