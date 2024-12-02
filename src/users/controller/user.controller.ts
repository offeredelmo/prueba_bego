import { IsEmail, validate } from "class-validator";
import { CreateUserDtoAndLogin } from "../model/user.dto";
import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export class UserController {

    userService = new UserService()


    async createUser(req: Request, res: Response) {
        try {
            const createUserDto = new CreateUserDtoAndLogin(req.body.email, req.body.password)
            await this.validateDTO(createUserDto, res)
            const newUser = await this.userService.createUser(createUserDto)
            return res.status(201).json(newUser)
        } catch (error) {
            res.status(500).json(
               { message: `A ocurrido un error inesperado ${error}`}
            )
        }
    }

    async logIn(req: Request, res: Response) {
        try {
           if (req.body.email) {
            const loginUserDto = new CreateUserDtoAndLogin(req.body.email, req.body.password) //validar que es un correo 
            await this.validateDTO(loginUserDto, res)
            const loginUser = await this.userService.logIn(loginUserDto) 
            return res.status(200).json(loginUser)
           } else {
            res.status(400).json({"message": "Error en las credenciales",})
           }
        } catch (error) {
            res.status(500).json(
               { message: `A ocurrido un error al intentar iniciar sesion ${error}`}
            )
        }
    }




    async validateDTO(dto: any, res: Response) {
        const validateDto = await validate(dto)
        if (validateDto.length > 0) {
            throw res.status(400).json({ message: 'Validation failed', errors: validateDto })
        }
    }


    
}