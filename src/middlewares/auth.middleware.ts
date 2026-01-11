import jwt from 'jsonwebtoken';
import express from 'express';

export const requireAuth = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const auth = req.get('Authorization') || "";

    const token = auth.split(" ")[1] || "";
    //   console.log(token);
    try {
        const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
        );
    // console.log(decoded);
        if (
        typeof decoded !== "object" ||
        decoded === null ||
        !("name" in decoded)
        ) {
            console.log(decoded);
            return res.sendStatus(401);
        }

        req.body.user = {
        userID: decoded.userID,
        userName: decoded.name,
        userEmail: decoded.email
        };
        
        next();
    } catch {
        res.sendStatus(401);
    }
};
