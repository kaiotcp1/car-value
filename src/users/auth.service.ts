import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class AuthService {
    constructor(private usersServices: UsersService) { }

    async signup(email: string, password: string) {
        //See if email is in use
        const user = await this.usersServices.find(email);

        if (user.length) {
            throw new BadRequestException('Email in use');
        };
        // Hash the users password
        // Generet a salt

        // hash the salt and the password together

        // Join the hashed result and the salt together

        // Create a new user and save it

        //return the user
    };

    signin() {

    };

};