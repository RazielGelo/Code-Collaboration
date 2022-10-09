import Link from "next/link";
import styles from "../styles/Signup.module.sass";
import Image from "next/image";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactElement, ReactNode, useState } from "react";
import { NextPage } from "next";
import { Props } from "next/script";
import { getCsrfToken, getProviders, getSession } from "next-auth/react";
import { instance } from '@/resources/axiosInstance';
import { Router, useRouter } from 'next/router'

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    return {
      props: {
        providers: await getProviders(),
      },
    };
  }

type NextPageWithLayout = NextPage<Props> & {
  getLayout: (page: ReactElement) => ReactNode;
};

export default function Signup() {
  const [input, setInput] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    console.log('Before')
    try {
      const { email, confirmEmail, password, confirmPassword } = input;
      if (email !== confirmEmail || password !== confirmPassword) {
        throw {
          message: "Error",
        };
      }

      console.log('Hello')
      console.log(email, confirmEmail, password, confirmPassword);

      const body = {
        email,
        password,
      };
      const { data } = await instance.post("user", body);
      console.log(data)

      router.push('/login')
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.seccontainer}>
        <h1 className={styles.fixposition1}>SIGNUP</h1>
        <p className={styles.fixposition2}>
          LEARN AND PLAY THE BEST CARD GAME.
        </p>
        <input
          type="email"
          placeholder="YOUR EMAIL"
          name="email"
          value={input.email}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="EMAIL CONFIRMATION"
          name="confirmEmail"
          value={input.confirmEmail}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          name="password"
          value={input.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="PASSWORD CONFIRMATION"
          name="confirmPassword"
          value={input.confirmPassword}
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

Signup.getLayout = function (page: ReactElement) {
  return (
    <div className={styles.layout}>
      <Navbar />
      {page}
      <Footer />
    </div>
  );
};
