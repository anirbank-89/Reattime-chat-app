import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const USER_SCHEMA = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

USER_SCHEMA.pre('save', async function (next: any) {
  let user = this as UserDocument;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(10); // process.env.PASSWORD_SALT_FACTOR as unknown as number

  const hash = bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
});

// Used for logging in
USER_SCHEMA.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const userModel = mongoose.model<UserDocument>('user', USER_SCHEMA);

export default userModel;
