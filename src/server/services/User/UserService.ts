import { AuthProvider } from "futbol-in-core/enum";
import { UserRole } from "futbol-in-core/enum";
import { UserStatus } from "futbol-in-core/enum";
import connectDb from "@/server/lib/db";
import { IOperadorDocument, Operador } from "@/server/models/User/Operador.model";
import { OperadorDTO } from "futbol-in-core/types";
import { IUserDocument, User } from "@/server/models/User/User.model";
import { UserDTO } from "futbol-in-core/types";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

export class UserService {
  static async getAll(): Promise<Array<UserDTO&{code:string|undefined}>> {
    await connectDb();
    const users = await User.find({}).lean<IUserDocument[]>();
    return users.map((user) => ({
      ...this.mapToDTO(user),
      code: user.verificationCode
    }));
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

  static async searchByName(name: string): Promise<UserDTO[]> {
    await connectDb();

    const regex = new RegExp(name, "i");

    const users = await User.find({
      $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
    }).lean<IUserDocument[]>();

    return users.map((u) => this.mapToDTO(u));
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

  static async createPerfilOperador(data:{
    operador: Omit<OperadorDTO,'id'>,
    idUsuario: string
  }): Promise<IOperadorDocument> {
    await connectDb();
    const operadorCreado = new Operador(data.operador);
    const user = await User.findById(data.idUsuario)

    if(!user){
      throw new Error('No se encontró al usuario en la base de datos')
    }

    user.idOperador = operadorCreado.id;
    await user.save()
    return await operadorCreado.save();
  }

  static async getPerfilOperador(idOperador:string|null): Promise<IOperadorDocument|null> {
    if(!idOperador) return null
    await connectDb();
    const operador = await Operador.findById(idOperador);
    if(!operador){
      throw new Error('No se encontró al operador en la base de datos')
    }
    return operador;
  }

  static async getPerfilesOperadores(idsOperador:string[]): Promise<IOperadorDocument[]> {
    await connectDb();
    const operador = await Operador.find({ _id: { $in: idsOperador } });
    if(!operador){
      throw new Error('No se encontró al operador en la base de datos')
    }
    return operador;
  }

  static async updateUser(
    userId: string,
    updateData: Partial<UserDTO>
  ): Promise<IUserDocument | null> {
    await connectDb();
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  }

  static async updateOperador(
    operadorId: string,
    updateData: Partial<UserDTO>
  ): Promise<IOperadorDocument | null> {
    await connectDb();
    const updatedOperador = await Operador.findByIdAndUpdate(operadorId, updateData, {
      new: true,
      runValidators: true,
    });
    return updatedOperador;
  }

  static async validatePassword(
    inputPassword: string,
    userPassword: string
  ): Promise<boolean> {
    return bcrypt.compareSync(inputPassword, userPassword);
  }

  static async agregarEquipo(
    idEquipo: Types.ObjectId,
    idUser: string
  ): Promise<IUserDocument | undefined> {
    await connectDb();
    const user = await this.findById(idUser);
    user?.equipos.push(idEquipo);
    return await user?.save();
  }

  static async incrementUserStat(
    userId: string,
    statKey: keyof IUserDocument["stats"]
  ) {
    await connectDb();
    await User.updateOne(
      { _id: userId },
      { $inc: { [`stats.${statKey}`]: 1 } }
    );
  }

  static async decrementUserStat(
    userId: string,
    statKey: keyof IUserDocument["stats"]
  ) {
    await connectDb();
    await User.updateOne(
      { _id: userId },
      { $inc: { [`stats.${statKey}`]: 1 } }
    );
  }

  static mapOperadorToDTO(operador: IOperadorDocument): OperadorDTO {
    return {
      id: operador._id.toString(),
      nombreComercial: operador.nombreComercial,
      ciudad: operador.ciudad,
      bio: operador.bio,
      enlaces: operador.enlaces,
      telefonos: operador.telefonos.map(t => ({
        numero: t.numero,
        persona: t.persona
      })),
      usuarios: operador.usuarios.map((u) => u.toString()),
      futbolines: operador.futbolines,
      fondo: operador.fondo,
      logo: operador.logo,
    }
  }

  static mapToDTO(user: IUserDocument): UserDTO {
    return {
      id: user._id.toString(),
      idOperador: user.idOperador?.toString() || null,
      name: user.name || "",
      email: user.email,
      imagen: user.imagen,
      status: user.status || UserStatus.MUST_CONFIRM_EMAIL,
      role: user.role || [UserRole.USER],
      provider: user.provider,
      createdAt: user.createdAt,
      stats: {
        lugaresAgregados: user.stats.addedFutbolines,
        lugaresRevisados: user.stats.votedFutbolines,
        lugaresVerificados: user.stats.verifiedFutbolines,
      },
      equipos: user.equipos?.map((e) => e.toString()),
      nombre: user.nombre,
      telefono: user.telefono,
      posicion: user.posicion,
      ciudad: user.ciudad,
      ciudadActual: user.ciudadActual
    };
  }
}
