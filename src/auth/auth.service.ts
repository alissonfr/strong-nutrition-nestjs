import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user.model';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

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
