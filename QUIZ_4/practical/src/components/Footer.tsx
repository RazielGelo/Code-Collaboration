import Image from 'next/image'
import styles from '@/styles/Footer.module.sass'
export default function Footer() {
    return (
        <div className={styles.container}>
            <div>
                <Image src='/yugifooter.png' width='210px' height='55px' />
            </div>
            <div>
                <p>Copyright 2021-2022 YUGIOH Allrights Reserved.</p>
            </div>
            <div>
                <Image src='/Frame.png' width='2600px' height='45px' />
            </div>
        </div>
       
    )
}