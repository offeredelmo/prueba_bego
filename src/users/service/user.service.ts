import { CreateUserDtoAndLogin } from "../model/user.dto";
import { connectToDatabase } from "../../conectDB"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { EnvironmentVariableError, UnauthorizedError } from "../../errors";


export class UserService {
    nameCollection = "users"
    async createUser(createUserDto: CreateUserDtoAndLogin) {
        try {
            const passwordHash = await bcrypt.hash(createUserDto.password, 10);
            const userCollection = (await connectToDatabase()).collection(this.nameCollection);
            const newUser = {
                email: createUserDto.email,
                password: passwordHash
            }
            const result = await userCollection.insertOne(newUser)
            return { message: '  Usuario creado', id: result.insertedId, email: newUser.email }
        } catch (error: any) {
          throw error
        }
    }


    async logIn(loginUserDto: CreateUserDtoAndLogin) {
        try {
            //primero obtener por correo al usuario
            const userCollection = (await connectToDatabase()).collection(this.nameCollection);
            const user = await userCollection.findOne({ email: loginUserDto.email })
            if (!user) {
                throw new UnauthorizedError("error de credenciales") //no se encontro el usuario
            }
            const passwordValidate = await bcrypt.compareSync(loginUserDto.password, user.password); // true
            if (!passwordValidate) {
                throw new UnauthorizedError("error de credenciales")
            }
            if (!process.env.JWT_KEY) { return new EnvironmentVariableError("Falta agregar la JWT_KEY") }
            const payload = {
                user: user._id,
                email: user.email
                
            }
            const token = jwt.sign(
                { data: payload },
                process.env.JWT_KEY || "",
                { expiresIn: "1h" }
            );
            return { _id: user._id, email: user.email, token: token }

        } catch (error: any) {
            throw error
        }
    }
}