import clientPromise from "@/database";
import {ResponseType} from "@/interfaces/Next";
import {NextApiRequest, NextApiResponse} from "next";
import Student from "@/interfaces/Students";
import {setupDatabase} from "@/actions/Database";
import { getStudents, registerStudent } from "@/actions/Student";

// export interface ResponseData {
//     id: string;
// }

export interface ResponseErrorData {
    message: string;
}

export default async function studentHandler(req: NextApiRequest, res:NextApiResponse<ResponseType<Student[] | ResponseErrorData>>) {
    try {
        if(req.method === "GET") {
            //sets up the database
            const client = await setupDatabase();
            // get students from functions in the actions folder
            const cursor = getStudents(client);
            // initialize students to store the students got from cursor
            const students: Student[] = [];
            // pushes all students from cursor to students array
            for await (const doc of cursor) {
                students.push(doc as unknown as Student)
            }
            //closes the database
            await client.close();
            // sends back the student and a code 200 for success

            if(students.length > 0) {
                res.status(200).json(
                    {
                        data: students,
                        code: 200
                    }
                )
            } else {
                throw {
                    code: 200,
                    message: "There are no students yet"
                }
            }
        } else if(req.method === "POST") {
            
            const {studentID, firstName, lastName, dob, age, email}: {studentID: string, firstName: string, lastName: string, dob: string, age: number, email: string} = req.body
            // validates the input field
            if(!studentID || studentID.charAt(0) !== "#" || studentID.length < 10 || studentID.trim() !== studentID || !firstName ||firstName.trim() !== firstName || !lastName || lastName.trim() !== lastName || !dob || !age || !email) {
                throw {
                    code: 400,
                    message: "You have enter invalid input"
                }
            }

            // setup the database
            const client = await setupDatabase();

            // get students from functions in the actions folder
            const cursor = getStudents(client);

            // initialize students to store the students got from cursor
            const students: Student[] = [];

            // pushes all students from cursor to students array
            for await (const doc of cursor) {
                students.push(doc as unknown as Student)
            }

            // Checks if the user already exist in the database
            let existingStudent = students.filter((student) => 
                student.studentID === req.body.studentID 
            )

            // if the user exist throw an error
            if(existingStudent.length > 0) {
                throw {
                    code: 409,
                    message: "Student already exist"
                }
            }

            // store the new Student
            const student = req.body as Student;
            const document = await registerStudent(client, student);

            // gives the student a unique id from mongodb
            student.id = document.insertedId;

            // closes the database
            await client.close();

            // if successfull sends code 200 and data of the student
            res.status(201).json(
                {
                    data: [
                        student
                    ],
                    code: 20
                }
            );
            // sends code 400 and blank array if there is none
        } else {
            res.status(400).send(
                {
                    data: [],
                    code: 400
                }
            )
        }
    } catch (e) {
        // send the thrown error with their message
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