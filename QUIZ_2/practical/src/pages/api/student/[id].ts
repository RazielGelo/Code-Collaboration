import {ResponseType} from "@/interfaces/Next";
import {NextApiRequest, NextApiResponse} from "next";
import Student from "@/interfaces/Students";
import {setupDatabase} from "@/actions/Database";
import { getStudents } from "@/actions/Student";
import {ResponseErrorData} from "../student"

// function to get one student 
export default async function getStudent(req: NextApiRequest, res:NextApiResponse<ResponseType<Student[] | ResponseErrorData>>) {
    try {
        if(req.method === "GET") {
            // sets up the database
            const client = await setupDatabase();

            // get students from functions in the actions folder
            const cursor = getStudents(client);

            // initialize students to store the students got from cursor
            const students: Student[] = [];

            // pushes all students from cursor to students array
            for await (const doc of cursor) {
                students.push(doc as unknown as Student)
            }

            // Filters out the students you are looking for by his/her studentID
            let studentFound = students.filter((student) => 
                student.studentID.substring(1) === req.query.id
            )

            // closes the database
            await client.close();

            // sends back the student and a code 200 for success
            res.status(200).json(
                {
                    data: studentFound,
                    code: 200
                }
            )
        } else if (req.method === "PUT") {
            // sets up database
            const client = await setupDatabase();

            // get students from functions in the actions folder
            const cursor = getStudents(client);

            // initialize students to store the students got from cursor
            const students: Student[] = [];

            // pushes all students from cursor to students array
            for await (const doc of cursor) {
                students.push(doc as unknown as Student)
            }

            // Filters out the students you are looking for by his/her studentID
            let studentFound = students.filter((student) => 
                student.studentID.substring(1) === req.query.id
            )
            
            console.log(studentFound[0])

            
            let newUpdate = {
                $set: {
                    ...studentFound[0],
                    firstName: req.body.firstName,
                    lastName: req.body.lastName

                }
            }

            // updates the database
            await client.db().collection('students').updateOne({studentID: `#${req.query.id}`}, newUpdate, function (err, result) { console.log(err, result); });

            
            // // closes the database
            // await client.close();
            

            res.status(200).json(
                    {
                        data:req.body.id,
                        code: 200
                    }
                )
            }
    } catch(e) {
        let {code = 500, message} = e;
        res.status(code).json(
            {
                code,
                data: {
                    message
                }
            }
        )
    }
}