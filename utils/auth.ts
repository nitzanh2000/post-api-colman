import jwt from "jsonwebtoken";
import { User } from "../dtos/user";

export type JwtInfo = Pick<User, "_id" | "username">;

export const convertUserToJwtInfo = (user: User) => {
  return {
    _id: user._id.toString(),
    username: user.username,
  };
};

export const generateAccessToken = (
  user: JwtInfo,
  accessToken: string,
  expiryTime: string
) => {
  return jwt.sign(user, accessToken, { expiresIn: expiryTime });
};

export const generateRefreshToken = (
  user: JwtInfo,
  refreshTokenSecret: string,
  expiryTime: string
) => {
  const refreshToken = jwt.sign(user, refreshTokenSecret, {
    expiresIn: expiryTime,
  });

  return refreshToken;
};
