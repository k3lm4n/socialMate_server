import { JWTServices } from "./JWTServices";

interface IJWTPayload {
  user_id: string;
  email: string;
  role: string;
}

export const ParserService = (token: string) => {

  const [bearer, tokenValue] = token.split(" ");

  const payload = JWTServices.verify(tokenValue) as IJWTPayload;
  return payload;
};
