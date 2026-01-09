import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.get('Authorization') || "";

  const token = auth.split(" ")[1] || "";
  console.log(token);
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
  console.log(decoded);
    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("name" in decoded)
    ) {
      return res.sendStatus(401);
    }

    req.body.user = {
      userID: decoded.userID,
    };
    

    next();
  } catch {
    res.sendStatus(401);
  }
};
