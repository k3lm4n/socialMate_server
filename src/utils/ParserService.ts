import { JWTServices } from "./JWTServices";

interface IJWTPayload {
  user_id: string;
  email: string;
  role: string;
}

export const ParserService = (token: string) => {
  const payload = JWTServices.verify(token) as IJWTPayload;
  return payload;
};
