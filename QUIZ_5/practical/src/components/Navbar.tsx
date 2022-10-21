import Link from "next/link";
import styles from "@/styles/Navbar.module.sass";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  if(session){
    return (
      <div className={styles.navcontainer}>
        <div className={styles.nav1}>
          <Link href="/">meet minions</Link>
          <Link href="/">minions gallery</Link>
          <Link href="/">post minions</Link>
        </div>
        <div className={styles.nav2}>
        <p className={styles.fontStyle}>Signed in as {session.user?.email}</p>
          <button className={styles.button} onClick={() => signOut()}>Sign Out</button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.navcontainer}>
      <div className={styles.nav1}>
        <Link href="/">meet minions</Link>
        <Link href="/">minions gallery</Link>
        <Link href="/minion/post">post minions</Link>
      </div>
      <div className={styles.nav2}>
        <Link href="/login">login</Link>
        <Link href="/signup">register</Link>
      </div>
    </div>
  );
}
