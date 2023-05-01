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
      .min(8, 'Password is too short - should be 6 chars minimum')
      .required('Password is required'),
    cnf_password: string().oneOf(
      [ref('password'), undefined],
      "Passwords don't match"
    ),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    usernameOrEmail: string(),
    password: string().required('Password is required'),
  }),
});

export const setUserAvatarSchema = object({
  body: object({
    avatarImage: string().required('Avatar image is required'),
  }),
  params: object({
    id: string().required('id in params is required'),
  }),
});

export const getAllUsersSchema = object({});
