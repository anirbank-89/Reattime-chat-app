import userModel from '../models/user.model';

export async function allUsers() {
  try {
    return await userModel.find();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
