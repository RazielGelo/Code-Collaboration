import { useSession, signIn, signOut } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import styles from '@/styles/Signup.module.sass';
import React, { useState } from 'react';
import { instance } from '@/resources/axiosInstance';


export default function MovieUpload() {
    const [movieName, setMovieName] = useState('');
    const [description, setDescription] = useState('');
    const [casts, setCasts] = useState('');
    const [rating, setRating] = useState(0);
    const [category, setCategory] = useState('');
    const [movieImage, setMovieImage] = useState('');


    function handleMovieNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value

        setMovieName(value);
    }

    function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value

        setDescription(value);
    }

    function handleCastsChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value

        setCasts(value);
    }

    function handleRatingChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        const numVal = +value;

        setRating(numVal);
    }

    function handleCategoryChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value

        setCategory(value);
    }

    async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.files[0]

        console.log(value);

        const form = new FormData();
        form.append('images', value);
        const setting = {
            method: 'POST',
            url: 'file',
            data: form
        };

        try {
            const {data} = await instance.request(setting);
            setMovieImage(data.data.filename)
        } catch(error) {
            console.log(error)
        }
    }

    async function handleSubmit() {
        const movie = {
            movieName,
            description,
            casts,
            rating,
            category,
            movieImage
        }

        try {
            const {data} = await instance.post('/movie', movie)
        } catch(error) {
            console.log(error);
        }

    }
    return(
        <div>
            <div>
                <h1>MOVIE UPLOAD</h1>
                <div>
                    <input type='text' placeholder='MOVIE/SHOW NAME' value={movieName} onChange={handleMovieNameChange} className={styles.input} />
                </div>
                <div>
                    <input type='text' placeholder='DESCRIPTION' value={description} onChange={handleDescriptionChange} className={styles.input}/>
                </div>
                <div>
                    <input type='text' placeholder='CASTS' value={casts} onChange={handleCastsChange} className={styles.input}/>
                </div>
                <div>
                    <input type='text' placeholder='RATING' value={rating} onChange={handleRatingChange} className={styles.input}/>
                </div>
                <div>
                    <input type='text' placeholder='CATEGORY' value={category} onChange={handleCategoryChange} className={styles.input}/>
                </div>
                <div>
                    <input type="file" name="file" placeholder="" onChange={handleImageChange}/>
                </div>
                <button onClick={handleSubmit}>SIGNUP</button>
            </div>
        </div>
    )
}