import {useSession, signIn, signOut} from 'next-auth/react';
import React, {useState} from 'react';
import {instance} from '@/resources/axiosInstance';
import styles from '@/styles/Signup.module.sass'

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
            <div>
                <h1>SIGNUP</h1>
                <div>
                    <input type='text' placeholder='USER NAME' value={username} onChange={handleUsernameChange} className={styles.input} />
                </div>
                <div>
                    <input type='password' placeholder='PASSWORD' value={password} onChange={handlePasswordChange} className={styles.input}/>
                </div>
                <button onClick={registerUser}>SIGNUP</button>
            </div>
        </div>
    )
}