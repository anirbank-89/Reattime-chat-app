import { object, string, ref } from 'yup';

export const createUserSchema = object({
  body: object({
    username: string()
      .min(3, 'Username is too short - should be 3 chars minimum')
      .required('Username is required'),
    email: string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 6 chars minimum'),
    cnf_password: string().oneOf(
      [ref('password'), undefined],
      "Passwords don't match"
    ),
  }),
});
