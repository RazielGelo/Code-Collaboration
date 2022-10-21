import styles from "@/styles/Card.module.sass";
import Image from "next/image";

export default function Card() {
  return (
    <div className={styles.container}>
      <div>
        <Image src="/minion.png" width="430px" height="490px" alt="image" />
      </div>
      <div className={styles.info}>
        <p className={styles.header}>BOB</p>
        <p>Skill: Technology</p>
        <p>Personality: Choleric</p>
        <p>
          A betting strategy (also known as betting system) is a structured
          approach to gambling, in the attempt to produce a profit. To be
          successful, the system must change the house edge into a player
          advantage — which is impossible for pure games of probability with
          fixed odds, akin to a perpetual motion machine.
        </p>
        <p className={styles.header2}>Contact Info</p>
        <p>Phone: 111-1111-1111</p>
        <p>Email:bob@minion.ca</p>
      </div>
    </div>
  );
}
