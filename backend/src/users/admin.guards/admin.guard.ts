import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
    
    if (user && user.admin === 'true') {
      return true;
    }
    else 
      return false;
  }
}