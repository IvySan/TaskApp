import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.CREATED) //HTTP status code "201 Created."
    @Post('register')
    public async register(@Body() createUserDto:Prisma.UserUncheckedCreateInput){
        await this.authService.register(createUserDto);
    }

 
}
