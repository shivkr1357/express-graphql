import { Document, Types } from "mongoose";

export interface CheckString {
   value: string;
   label: string;
   min?: number;
   max?: number;
   required?: boolean;
}

export interface IErrorRes {
   status: boolean;
   statusCode: number;
   message: string;
   errors?: Errors;
   v;
}

export interface UserModel {
   _id: string;
   email: String;
   password: String;
   fullName: String;
   profilePicture: String;
   colorTheme: String;
   isDeactivated: Boolean;
   phone?: String;
   deviceToken?: String;
   address?: String;
   hobbies?: [];
   gender?: String;
   language?: String;
   about?: String;
}

export interface SignInBody {
   email: String;
   password: String;
}

export interface tokenBody {
   userId: String;
   token: String;
   createdAt: Date;
}

export interface IPost extends Document {
   title: string;
   description?: string; // Optional since it's not marked as required in the schema
   userId: Types.ObjectId;
   image: string;
   tags: string[];
   postType: string;
   likes: Types.ObjectId[];
   comments: Types.ObjectId[];
   createdAt: Date;
   updatedAt: Date;
}

export interface IPostReport extends Document {
   content: string;
   postId: Types.ObjectId;
   ReporterUserId: Types.ObjectId;
}

export interface PostCommentsType extends Document {
   comment: string;
   postId: Types.ObjectId;
   userId: Types.ObjectId;
   likes: Types.ObjectId[];
}
