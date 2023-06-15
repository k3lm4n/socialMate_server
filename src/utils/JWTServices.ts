import jwt from "jsonwebtoken";

interface IJWTPayload {
  user_id: string;
  email: string;
  role: string;
}

const sign = (payload: IJWTPayload): String | "JWT_SECRET_NOT_FOUND" => {
  const secret = process.env.SECRET_JWT || "JWT_SECRET_NOT_FOUND";

  return jwt.sign(payload, secret, { expiresIn: "1d" });
};
const verify = (token: string) => {
  const secret = process.env.SECRET_JWT || "JWT_SECRET_NOT_FOUND";

  const decoded = jwt.verify(token, secret);
  try {
    if (typeof decoded === "string") {
      return decoded;
    }
    return decoded as IJWTPayload;
  } catch (error:any) {
    console.log(error);
    return "INVALID_TOKEN";
  }
};

export const JWTServices = {
  sign,
  verify,
};
