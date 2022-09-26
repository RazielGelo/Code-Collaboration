import Navbar from '@/components/navbar';
import '@/styles/Navbar.module.sass'

export default function Layout({children}) {
    return (
        <div className="container">
            <Navbar/>
            {children}
        </div>
    )
}