import { Document } from "mongoose";

export interface User extends Document {
  username?: string; 
  password: string;
  email: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpiresAt?: Date;
  passwordVerification: (password: string, hasedPassword: string) => Promise<boolean>;
  passwordResetTokenGenerator: () => string;
  createdAt: Date;
  updatedAt: Date;
  subscribedTill:Date
}
