import { RequestHandler } from "express";
import { body, validationResult } from "express-validator";

export const validationMiddleware : RequestHandler = async (req,res,next)=>{
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
}