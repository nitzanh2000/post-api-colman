import jwt from "jsonwebtoken";
import { User } from "../dtos/user";

export const generateAccessToken = (
  user: JwtInfo,
  accessToken: string,
  expiryTime: string
) => {
  return jwt.sign(user, accessToken, { expiresIn: expiryTime });
};

export type JwtInfo = Pick<User, "_id" | "username">;

export const generateRefreshToken = (
  user: User,
  refreshTokenSecret: string,
  expiresIn: string
) => jwt.sign(user, refreshTokenSecret, { expiresIn });

export const convertUserToPlain = (user: User): User => ({
  _id: user._id.toString(),
  username: user.username,
  password: user.password,
  email: user.password,
});

export const convertUserToJwtInfo = (user: User) => {
  return {
    _id: user._id.toString(),
    username: user.username,
  };
};