import { Request, Response } from "express";
import { prismaClient } from "../";
import { hashSync } from "bcrypt";
import { body, validationResult } from "express-validator";

export const signup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "failed",
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { email, password, name } = req.body;
    let user = await prismaClient.user.findFirst({
      where: { email },
    });

    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists!",
      });
    }
    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10), 
      },
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);

    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const signupValidationRules = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("name").notEmpty().withMessage("Name is required"),
];
