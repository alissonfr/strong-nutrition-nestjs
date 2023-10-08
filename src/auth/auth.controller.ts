import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login() {
        return { success: true }
    }

    @Get('ola')
    async ola() {
        return { message: 'Ola, mundo!' }
    }
}
