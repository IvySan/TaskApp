import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService: JwtService
    ){}

    async register(createUserDto:Prisma.UserUncheckedCreateInput){
        await this.usersService.create(createUserDto);
    }

    // async login(user:{email:string, password:string}){
    //     const payload = {email:user.email};
    //     const loginUser = await this.usersService.findOneByEmail(user.email);
    //     const passwordMatches = await bcrypt.compare(user.password, loginUser.password);
    //     const {password, ...userWithoutPassword} = loginUser;
        
    //     if(passwordMatches){
    //         return {
    //             access_token: this.jwtService.sign(payload),
    //             user: userWithoutPassword
    //         }
    //     }
    // }

    async login(user: { email: string, password: string }) {
        try {
            const payload = { email: user.email };
            const loginUser = await this.usersService.findOneByEmail(user.email);
    
            if (!loginUser) {
                throw new Error('User not found');
            }
    
            const passwordMatches = await bcrypt.compare(user.password, loginUser.password);
    
            if (!passwordMatches) {
                throw new Error('Invalid password');
            }
    
            const { password, ...userWithoutPassword } = loginUser;
    
            return {
                access_token: this.jwtService.sign(payload),
                user: userWithoutPassword,
            };
        } catch (error) {
            throw new Error('Authentication failed'); 
        }
    }

}
