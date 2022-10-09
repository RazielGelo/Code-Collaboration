import Link from "next/link";
import styles from "../styles/Showyourcards.module.sass";
import Image from "next/image";
import { NextPage } from "next";
import { Props } from "next/script";
import { ReactElement, ReactNode, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSession } from "next-auth/react";
import { instance } from "@/resources/axiosInstance";
import router from "next/router";

// export async function getServerSideProps(context) {
//     const session = await getSession(context);
//     if (!session) {
//       return {
//         redirect: {
//           permanent: false,
//           destination: "/login",
//         },
//       };
//     }
// }

type NextPageWithLayout = NextPage<Props> & {
  getLayout: (page: ReactElement) => ReactNode;
};

export default function Showyourcards() {
  const [input, setInput] = useState({
    cardName: "",
    cardType: "",
    serialNumber: "",
    cardImage: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    try {
      const { cardName, cardType, serialNumber, cardImage} = input;
      if (!cardName || !cardType || !serialNumber || !cardImage) {
        throw {
          message: "Error",
        };
      }

      const body = {
        cardName,
        cardType,
        serialNumber,
        cardImage
      };
      const { data } = await instance.post("card", body);
      console.log(data)

      router.push('/')
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.seccontainer}>
        <h1 className={styles.fixposition1}>SHOW YOUR CARDS</h1>
        <input
          type="text"
          name="cardName"
          placeholder="CARD NAME"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cardType"
          placeholder="CARD TYPE"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="serialNumber"
          placeholder="SERIAL NUMBER"
          onChange={handleInputChange}
        />
        <input
          type="image"
          name="cardImage"
          className={styles.fixposition1}
          src="/imagebutton.png"
          onChange={handleInputChange}
        />
        <input
          type="image"
          className={styles.fixposition1}
          src="/signupbutton.png"
          width="187px"
          height="105.97px"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

Showyourcards.getLayout = function (page: ReactElement) {
  return (
    <div className={styles.layout}>
      <Navbar />
      {page}
      <Footer />
    </div>
  );
};
