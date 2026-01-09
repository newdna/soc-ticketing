import { createUser }from '../services/auth.service.js';
import { type Request, type Response} from 'express';
import { userLogin } from '../services/login.service.js';

export const register:any = async (req: Request, res: Response) => {
    const { name, email, password } = req.body ?? {};
    if(!name || !email || !password){
        return res.status(400).json({message: "Missing fields"});
    };

    const user = await createUser(name, email, password);
    
    return res.status(201).json({
        message: "User registered", user,
    });
}

export const hello = async (req: Request, res: Response) => {
    res.status(201).json({ Message: req.body.user });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body ?? {};
    const user = await userLogin(email, password);
    res.status(201).json({ Message: user});
    //validate user & password udh ada apa blm
    // klo blm return error
    // klo udh generate token, tokennya return response
};