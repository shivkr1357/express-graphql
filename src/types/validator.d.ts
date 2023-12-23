import { FileJSON } from "formidable";
import { BaseUser } from "../models/base_user.model";

export interface Errors {
  [props: string]: string;
}

export type Error = string | undefined;

export type fileObj = FileJSON | "";

export interface SanitizedData extends Errors {}

export interface CheckString {
  value: string;
  label: string;
  min?: number;
  max?: number;
  required?: boolean;
}

export type Truthy = true | "true" | 1 | "1" | "yes";
export type Falsy = false | "false" | 0 | "0" | "no";

export type BooleanTypes = Truthy | Falsy;

export interface IErrorRes {
  status: boolean;
  statusCode: number;
  message: string;
  errors?: Errors;
}

export interface IAppleInfo
  extends Pick<BaseUser, "profile_name" | "username"> {
  email?: string;
  profile_picture: fileObj;
}
