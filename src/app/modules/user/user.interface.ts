import { Types } from "mongoose";

export type TUser = {
    name:string;
    email:string;
    password:string;
    role:string;
    agentReq:Types.ObjectId;
    whatsapp:string;
    linkedin:string;
    twitter:string;
    facebook:string
}