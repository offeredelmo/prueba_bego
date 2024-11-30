import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUserDtoAndLogin {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(
        email: string,
        password: string
    ){
        this.email = email
        this.password = password
    }
    
}


    

