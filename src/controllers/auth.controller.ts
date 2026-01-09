import * as authService from '../services/auth.service'
// import express from 'express';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await authService.register(name, email, password);
  res.status(201).json(user);
};
