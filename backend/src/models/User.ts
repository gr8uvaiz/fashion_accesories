import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAddress {
  _id?: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  profile: {
    avatar?: string;
    phone?: string;
    dateOfBirth?: Date;
    gender?: "male" | "female" | "other";
    bio?: string;
  };
  addresses: IAddress[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const addressSchema = new Schema({
  label: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  street: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 200,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      avatar: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      dateOfBirth: {
        type: Date,
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },
      bio: {
        type: String,
        maxlength: 500,
      },
    },
    addresses: [addressSchema],
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", userSchema);
