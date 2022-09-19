import { MongoClient } from "mongodb";
import Student from "../interfaces/Students";

// function to get all students
export function getStudents(client: MongoClient) {
    // return all the students in the database
    return client.db().collection('students').find();
}

// function to create new students
export async function registerStudent(client: MongoClient, student:Student) {
    const {studentID, firstName, lastName, dob, age, email} = student;

    // validation to check if all fields are with value
    if(!studentID || !firstName || !lastName || !dob || !age || !email) {
        throw {
            code: 400,
            message: "Please complete the student information"
        };
    }

    // inserts the student in the database
    return client.db().collection('students').insertOne(student);
}

