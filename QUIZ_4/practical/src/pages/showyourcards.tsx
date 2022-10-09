import Link from 'next/link'
import styles from '../styles/Showyourcards.module.sass'
import Image from 'next/image'
import { NextPage } from 'next';
import { Props } from 'next/script';
import { ReactElement, ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type NextPageWithLayout = NextPage<Props> & { 
    getLayout: (page: ReactElement) => ReactNode;
}

export default function Showyourcards() {
    return (
        <div className={styles.container}>
            <div className={styles.seccontainer}>
                <h1 className={styles.fixposition1}>SHOW YOUR CARDS</h1>
                <input type ="text" placeholder="CARD NAME"/>
                <input type ="text" placeholder="CARD TYPE"/>
                <input type ="text" placeholder="SERIAL NUMBER"/>
                <input type='image' className={styles.fixposition1} src='/imagebutton.png' />
            </div>
        </div>
    )
}

Showyourcards.getLayout = function (page: ReactElement) {
    return (
        <div className={styles.layout}>
            <Navbar />
            {page}
            <Footer />
        </div>
    )
}