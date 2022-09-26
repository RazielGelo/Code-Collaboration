import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import '@/styles/Navbar.module.sass'

export default function Layout({children}) {
    return (
        <div className="container">
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )
}