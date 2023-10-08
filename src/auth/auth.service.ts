import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user.model';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async login(user) {
        const payload = { sub: user.idUser, email: user.email }

        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(email: string, password: string) {
        let user: User;
        try {
            user = await this.userService.findByEmail(email);
        } catch (error) {
            return null;
        }
        const isPasswordValid = compareSync(password, user.senha);
        if (!isPasswordValid) return null;

        return user;
    }

}
