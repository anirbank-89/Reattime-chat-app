import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (e: any) {
      console.log('Validating request failed due to ', e.message);
      return res.status(400).send({
        errors: e.errors,
      });
    }
  };

export default validate;
