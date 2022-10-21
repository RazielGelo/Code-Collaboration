import { useSession, signIn, signOut, getProviders, getSession } from "next-auth/react";
import Image from "next/image";
import styles from "@/styles/Signup.module.sass";
import { useState } from "react";
import { useRouter } from 'next/router'
import { instance } from "@/resources/axiosInstance";

export async function getServerSideProps(context:any) {
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
  
export default function Signup() {
    const router = useRouter();
    const [input, setInput] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
    })

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
    
        setInput((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    
      async function handleSubmit() {
        try {
          const { email, confirmEmail, password, confirmPassword } = input;
          if (!email || !email.trim() ||  !password || !password.trim() || email !== confirmEmail || password !== confirmPassword) {
            throw {
              message: "Error",
            };
          }
    
          console.log(email, confirmEmail, password, confirmPassword);
    
          const body = {
            email,
            password,
          };
          const { data } = await instance.post("user/create", body);
          console.log(data)
    
          router.push('/login')
        } catch (e) {
          console.log(e);
        }
      }
    

    return (
            <div className={styles.container}>
                <div>
                    <Image src="/leftimg.svg" width="256px" height="715px" alt="image"/>
                </div>
                <div className={styles.inputContainer}>
                    <Image src="/reglogo.svg" width="380px" height="127px" alt="logo" />
                    <input type="email" name="email" value={input.email} placeholder="email" onChange={handleInputChange}/>
                    <input type="email" name="confirmEmail" value={input.confirmEmail} placeholder="confirm email" onChange={handleInputChange}/>
                    <input type="password" name="password" value={input.password} placeholder="password" onChange={handleInputChange}/>
                    <input type="password" name="confirmPassword" value={input.confirmPassword} placeholder="confirm password" onChange={handleInputChange}/>
                    <button className={styles.button} onClick={handleSubmit}>register</button>
                </div>
            </div>
    )
}