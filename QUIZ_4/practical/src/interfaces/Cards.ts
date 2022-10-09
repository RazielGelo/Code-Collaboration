import { ObjectId } from "mongoose";

export default interface Card {
    id?: string | ObjectId;
    userEmail: string;
    cardName: string;
    cardType: string;
    serialNumber: string;
    cardImage: string;
}