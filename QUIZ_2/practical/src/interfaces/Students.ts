import {ObjectId} from "mongodb"

// Student Schema
export default interface Student {
    id?: string | ObjectId;
    studentID: string;
    firstName: string;
    lastName: string;
    dob: string;
    age: number;
    email: string
}