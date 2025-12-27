import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class FakeAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        // Always allow access for the fake auth guard
        return true;
    }
}
