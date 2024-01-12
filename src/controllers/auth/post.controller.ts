import { RequestHandler } from "express";
import { SignUpBody } from "../../types/validator";

const SignUp: RequestHandler = (req, res) => {
  const { email, password } = req.body as SignUpBody;

  res.send("Auth sighup method working");
};

export default { SignUp };
