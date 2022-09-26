import {useSession, signIn, signOut} from 'next-auth/react';
import React, {useState} from 'react';
import {instance} from '@/resources/axiosInstance';
import styles from '@/styles/Signup.module.sass'
import Image from 'next/image'

export default function SignIn () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;

        setUsername(value);
    }

    function handlePasswordChange (event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;

        setPassword(value);
    }

    async function registerUser() {
        const user = {
            username,
            password
        }

        try {
            const {data} = await instance.post('/register', user)
        } catch(error) {
            console.log(error);
        }
    }


    return(
        <div>
            <div className={styles.container}>
                <div>
                    <div>
                        <Image src="/movieside.png" alt="logo" width="650" height="850"></Image>
                    </div>
                </div>
                <div>
                    <div className={styles.title}>
                        <h1>SIGNUP</h1>
                    </div>
                    <div className={styles.inputfield}>
                        <div>
                            <input type='text' placeholder='USER NAME' value={username} onChange={handleUsernameChange} className={styles.input} />
                        </div>
                        <div>
                            <input type='password' placeholder='PASSWORD' value={password} onChange={handlePasswordChange} className={styles.input}/>
                        </div>
                        <button className={styles.buttonstyle} onClick={registerUser}>SIGNUP</button>
                    </div>
                </div>
            </div>
        </div>
    )
}