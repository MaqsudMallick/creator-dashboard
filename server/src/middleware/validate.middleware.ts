import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateRequest<T>(dtoClass: ClassConstructor<T>) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const output = plainToInstance<T, object>(dtoClass, req.body);
    const errors = await validate(output);

    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints ?? {}))
        .flat();
      res.status(400).json({ errors: messages });
      return;
    }

    req.body = output;
    next();
  };
}
