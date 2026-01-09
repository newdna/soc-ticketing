import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    // 🔐 Runtime type guard
    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("userID" in decoded)
    ) {
      return res.sendStatus(401);
    }

    req.user = {
      userID: (decoded as AuthPayload).userID,
    };

    next();
  } catch {
    res.sendStatus(401);
  }
};
