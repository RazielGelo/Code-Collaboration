import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React from 'react'
import { useRouter } from "next/router"

// This function checks the pathname and returns a specific background
function bgChanger(path: string) {
    // This will check the path and return a string
    switch(path) {
        default:
            return "../bglogin.png"
    }
}

// function bgSizeChanger(path: string) {
//     // This will check the path and return a string
//     switch(path) {
//         case "/":
//             return "100px 100px"
//         default:
//             return "cover"
//     }
// }

type Props = {
    children: React.ReactNode
}

export default function Layout ({children}: Props) {
    const { pathname } = useRouter()
    const bg = bgChanger(pathname)
    // const bgSize = bgSizeChanger(pathname)

    const myStyle = {
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `cover`,
        backgroundPosition: "center"
    }
    return (
        <div style={myStyle}>
            <Navbar />
            {children} 
            <Footer />
        </div>
    )
}