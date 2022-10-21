import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.sass"
import Card from "@/components/Card"

const Home: NextPage = () => {
  return (
    <div>
      <div className={styles.container1}>
        <Image src="/minindex.png" width="1400px" height="900px" alt="image"/>
      </div>
      <div>
        <div className={styles.container2}>
            <input className={styles.search} type="text" placeholder="SEARCH"/>
            <Image src="/meetmin.png" width="493px" height="105px" alt="logo"/>
            <Card />
            <Card />
            <Card />
            <Image src="/mingallery.png" width="545px" height="89px" alt="logo"/>
        </div>
      </div>
    </div>
  )
}

export default Home
