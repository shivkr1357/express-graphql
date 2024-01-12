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
}

export interface SignUpBody {
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

export interface tokenBody {
  userId: String;
  token: String;
  createdAt: Date;
}
