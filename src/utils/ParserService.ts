import { JWTServices } from "./JWTServices";

interface IJWTPayload {
  user_id: string;
  email: string;
  role: string;
}

export const ParserService = (token: string) => {
  let bearer = "";
  let tokenValue = "";
  if (token.includes("Bearer")) {
    [bearer, tokenValue] = token.split(" ");
  } else tokenValue = token;

  const payload = JWTServices.verify(tokenValue) as IJWTPayload;
  return payload;
};
