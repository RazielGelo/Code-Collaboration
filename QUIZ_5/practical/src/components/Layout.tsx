import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React from 'react'
import { useRouter } from "next/router"
import bgChanger from '@/helper/bgChanger'

type Props = {
    children: React.ReactNode
}

export default function Layout ({children}: Props) {
    const { pathname } = useRouter()
    const bg = bgChanger(pathname)

    const myStyle = {
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }
    return (
        <div style={myStyle}>
            <Navbar />
            {children} 
            <Footer />
        </div>
    )
}