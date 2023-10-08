import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: any) {
        return req.user;
    }

    @Get('ola')
    async ola() {
        return { message: 'Ola, mundo!' }
    }
}
