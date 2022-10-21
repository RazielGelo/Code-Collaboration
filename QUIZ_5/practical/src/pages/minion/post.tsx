import Image from "next/image";
import styles from "@/styles/Post.module.sass";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { instance } from "@/resources/axiosInstance";


export default function Post() {
    const inputRef = useRef(null)

    const [input, setInput] = useState({
        minionName: "",
        minionSkills: "",
        minionPersonality: "",
        minionEmail: "",
        minionPhone: "",
        minionDescription: "",
        minionImage: ""
      });
      const router = useRouter();
    
      function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
    
        setInput((prev) => ({
          ...prev,
          [name]: value,
        }));
      }

      function handleClick() {
        inputRef?.current?.click()
      }

      async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>){
          try {
            const file = event.target.files[0];
            console.log("File: ", file.name);
            const form = new FormData();
            form.append("files", file);
            const img = {
                method: "POST",
                url: "file",
                data: form
            };
            console.log(img)
            console.log("before data")
            const { data } = await instance.request(img);
            console.log("Data", data)
            setInput(data.data.filename);
        } catch (error: any) {
            console.log("Error uploading", error);
        }
    };

    
      async function handleSubmit() {
        try {
          const { minionName, minionSkills, minionPersonality, minionEmail, minionPhone, minionDescription, minionImage } = input;
        //   if (!minionName || !minionSkills || minionPersonality || minionEmail || minionPhone || minionDescription) {
        //     throw {
        //       message: "Error",
        //     };
        //   }

        //   console.log("Image: ", minionImage);
    
          const body = {
            name: minionName,
            skills: minionSkills,
            personality: minionPersonality,
            email: minionEmail,
            phone: minionPhone,
            description: minionDescription,
            image: minionImage
          };

          const { data } = await instance.post("minion/create", body);
          console.log(data)

          router.push('/')
        } catch (e) {
          console.log(e);
        }
      }

    return (
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <Image src="/postminlogo.png" width="493px" height="80px" alt="logo" />
                    <input type="text" name="minionName" value={input.minionName} placeholder="minion name" onChange={handleInputChange}/>
                    <input type="text" name="minionSkills" value={input.minionSkills} placeholder="skills" onChange={handleInputChange}/>
                    <input type="text" name="minionPersonality" value={input.minionPersonality} placeholder="personality" onChange={handleInputChange}/>
                    <input type="email" name="minionEmail" value={input.minionEmail} placeholder="email" onChange={handleInputChange}/>
                    <input type="text" name="minionPhone" value={input.minionPhone} placeholder="phone" onChange={handleInputChange}/>
                    <input type="text" name="minionDescription" value={input.minionDescription} placeholder="description" style={{height: "271px"}} onChange={handleInputChange}/>
                    <div className={styles.buttonNone}>
                        <input type="file" name="minionImage" value={input.minionImage} accept="image" ref={inputRef} onChange={handleImageChange} style={{display: "none"}} />
                        <button className={styles.noborder} onClick={handleClick}>
                            <Image src="/camera.png" width="100px" height="75px" alt="logo" />
                        </button>
                    </div>
                    <button className={styles.button} onClick={handleSubmit}>post</button>
                    <Image src="/botimg.png" width="789px" height="351px" alt="logo" />
                </div>
            </div>
    )
}