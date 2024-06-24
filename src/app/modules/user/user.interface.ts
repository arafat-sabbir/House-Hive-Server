import { Types } from "mongoose";
import { USER_ROLE } from "./user.const";

export type TUser = {
    name:string;
    email:string;
    password:string;
    photo:string;
    role:string;
    agentReq:Types.ObjectId;
    whatsapp:string;
    linkedin:string;
    twitter:string;
    facebook:string
    isDeleted?:string
}

export type TUserRole = keyof typeof USER_ROLE;