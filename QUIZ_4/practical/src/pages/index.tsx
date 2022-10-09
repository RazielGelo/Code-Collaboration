import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Props } from "next/script";
import { ReactElement, ReactNode } from "react";
import styles from "../styles/Home.module.sass";



type NextPageWithLayout = NextPage<Props> & {
  getLayout: (page: ReactElement) => ReactNode;
};

const Home: NextPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.con1}>
          <Image src="/yugilogo.png" width="504px" height="132px" alt="yugi" />
          <p>THE MOST INTELLEGENT CARD GAME</p>
          <input
            type="image"
            src="/signupbutton.png"
            width="210px"
            height="119px"
          />
        </div>
        <div className={styles.imagecon}>
          <Image src="/yugisleeves.png" width="620px" height="432px" alt='yugi'/>
        </div>
      </div>

      <div className={styles.bg}>
        <div className={styles.container2}>
          <div className={styles.con2}>
            <p id='#what'>WHAT IS YUGIOH</p>
            <span>
              If a unit electric point charge is in motion in an electromagnetic
              field, the force acting upon it is equal to the electric force
              which is present at the locality of the charge, and which we
              ascertain by transformation of the field to a system of
              co-ordinates at rest relatively to the electrical charge.{" "}
            </span>
          </div>
          <div>
            <Image src="/cardsright.png" width="538px" height="434px" alt='image'/>
          </div>
        </div>

        <div className={styles.container3}>
          <div>
            <Image src="/cardleft.png" width="538px" height="434px" alt='image' />
          </div>
          <div className={styles.con3}>
            <p id='#how'>HOW TO PLAY</p>
            <span>
              If a unit electric point charge is in motion in an electromagnetic
              field, the force acting upon it is equal to the electric force
              which is present at the locality of the charge, and which we
              ascertain by transformation of the field to a system of
              co-ordinates at rest relatively to the electrical charge.
            </span>
          </div>
        </div>

        <div className={styles.container4}>
          <div className={styles.con4}>
            <p id='#cards'>CARDS</p>
          </div>
          <div className={styles.cards}>
            <Image src="/card5.png" width="200px" height="260px" alt='image' />
            <Image src="/card4.png" width="200px" height="260px" alt='image' />
            <Image src="/card3.png" width="200px" height="260px" alt='image' />
            <Image src="/card2.png" width="200px" height="260px" alt='image' />
            <Image src="/card1.png" width="200px" height="260px" alt='image' />
          </div>
          <div className={styles.seemore}>
            <Link href='/'><a href='/'>SEE MORE</a></Link>
          </div>
        </div>
      </div>

      <div className={styles.container5}>
        <div className={styles.con5}>
          <p>SIGNUP</p>
          <span>LEARN AND PLAY THE BEST CARD GAME.</span>
          <div className={styles.con51}>
            <input type="email" placeholder="YOUR EMAIL" />
            <input type="image" src="/signupbutton.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = function (page: ReactElement) {
  return (
    <div>
      <Navbar />
      {page}
      <Footer />
    </div>
  );
};

export default Home;
