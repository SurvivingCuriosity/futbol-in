import bcrypt from "bcryptjs";
import { User } from "@/shared/models/User/User.model";
import connectDb from "@/shared/lib/db";
import { UserStatus } from "@/shared/enum/User/Status";
import { AuthProvider } from "@/shared/enum/User/AuthProvider";
import { UserRole } from "@/shared/enum/User/Role";
import { IUserDocument } from "@/shared/models/User/User.model";
import { UserDTO } from "@/shared/models/User/UserDTO";

export class UserService {

  static async getAll(): Promise<UserDTO[]> {
    await connectDb();
    const users = await User.find({}).lean<IUserDocument[]>();
    return users.map(user => this.mapToDTO(user));
  }

  static async findById(
    id: string | undefined | null
  ): Promise<IUserDocument | null> {
    await connectDb();
    return User.findById(id);
  }

  static async findByEmail(
    email: string | undefined | null
  ): Promise<IUserDocument | null> {
    await connectDb();
    return User.findOne({ email });
  }

  static async findByUsername(username: string): Promise<IUserDocument | null> {
    await connectDb();
    return User.findOne({ name: username });
  }

  static async createGoogleUser(
    email: string | undefined | null
  ): Promise<IUserDocument> {
    await connectDb();
    if (!email) {
      throw new Error("No se introdujo email");
    }
    const newUser = new User({
      email,
      status: UserStatus.MUST_CREATE_USERNAME,
      provider: AuthProvider.GOOGLE,
    });
    return newUser.save();
  }

  static async createUser(
    userData: Partial<IUserDocument>
  ): Promise<IUserDocument> {
    await connectDb();
    const user = new User(userData);
    return user.save();
  }

  static async validatePassword(
    inputPassword: string,
    userPassword: string
  ): Promise<boolean> {
    return bcrypt.compareSync(inputPassword, userPassword);
  }

  static mapToDTO(user: IUserDocument): UserDTO {
    return {
      id: user._id.toString(),
      name: user.name || "",
      email: user.email,
      imagen: user.imagen,
      status: user.status || UserStatus.MUST_CONFIRM_EMAIL,
      role: user.role || UserRole.USER,
      provider: user.provider,
      createdAt: user.createdAt,
    };
  }
}
