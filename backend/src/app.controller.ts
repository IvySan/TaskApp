

import { Body,Request, Controller, Get, Post, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/auth.guards/jwt-auth.guards';


@Controller()
export class AppController {
  constructor(private  authService: AuthService) {}

  
  @HttpCode(HttpStatus.OK)//HTTP status code "200 OK."
  @Post('auth/login')
  async login(@Body() loginUser: {email:string, password: string}){
      return this.authService.login(loginUser);
  }

   
  @UseGuards(JwtAuthGuard)//isto kao @UseGuards(AuthGuard('jwt'))
  @Get('auth/validate')
  //ovo u nasem slucaju vraca email
  validate(@Request() req) {
    return req.user;
  }
  //hocemo da nam vrati id usera, bolja opcija od email-a
  // logout(@GetCurrentUserId() userId: number) {
  //   return userId;
  // }
}
