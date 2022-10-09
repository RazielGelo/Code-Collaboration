import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from '@/styles/Layout.module.sass'


export default function Layout ({children}) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}