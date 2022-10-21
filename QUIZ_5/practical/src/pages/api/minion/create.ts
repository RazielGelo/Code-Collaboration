import { createMinion } from "@/actions/Minion";
import Minion from "@/interfaces/Minion";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === "POST") {
            let {name, skills, personality, email, phone, description, image} = req.body as Minion
            console.log(req.body);
            // if (!name || !skills || !personality || !email || !phone || !description || !image) {
            //     throw {
            //         code: 400,
            //       message: " Error invalid input",
            //     };
            //   }
            
            const minion: Minion = {
                name,
                skills,
                personality,
                email,
                phone,
                description,
                image
            }
            const minionDoc = await createMinion(minion)

            res.status(200).json({
                code: 200,
                minionDoc
            })
        } else {
            res.status(404).json({
                code: 404,
                message: "Error creating a minion"
            })
        }
    } catch(error: any) {
        throw new Error("Error", error)
    }
}