import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Sign In
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      res.status(404).json({ message: 'User does not exist!' });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      res.status(400).json({ message: 'Incorrect Password!' });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'secret',
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: existingUser.email, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Sign Up
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const existingUser = await User.findOne({ email });

  try {
    if (existingUser) res.status(404).json({ message: 'User already exist!' });
    if (password !== confirmPassword)
      res.status(400).json({ message: 'Passwords does not match' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, 'secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
