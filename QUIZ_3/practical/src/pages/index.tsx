import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <div>
        <Image src="/moviebanner.png" alt="banner" width="1700" height="800"></Image>
      </div>
      <div>
        <input type="text" placeholder="SEARCH" />
      </div>
    </div>
  )
}

export default Home
