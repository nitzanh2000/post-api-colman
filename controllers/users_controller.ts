import { Request, Response } from "express";
import { User } from "../dtos/user";
import { UserModel } from "../models/user_model";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserById = async (req: Request, res: Response) => {
  const userId: string = req.params.id;

  try {
    const user: User = await UserModel.findById(userId);

    if (!!user) {
      res.send(user);
    } else {
      res.status(404).send("Cannot find specified user");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createUser = async (req: Request, res: Response) => {
  const newUser: User = req.body;
  
  try {
    const user: User = await UserModel.create(newUser);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const updatedUserData: User = req.body;

  try {
    const result = await UserModel.updateOne({ _id: userId }, updatedUserData);
    if (!!result.modifiedCount) {
      res.status(201).send();
    } else {
      res.status(404).send("Cannot find specified user");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  const userId: string = req.params.id;

  try {
    const result = await UserModel.deleteOne({ _id: userId });
    if (!!result.deletedCount) {
      res.status(201).send();
    } else {
      res.status(404).send("Cannot find specified user");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUserById };
