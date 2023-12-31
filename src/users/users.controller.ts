import {
    Body, Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Query,
    NotFoundException,
    UseInterceptors,
    Session
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user-decorator';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService) { };

    // @Get('/whoami')
    // whoAmIm(@Session() session: any) {
    //     return this.usersService.findOne(session.userId);
    // };

    @Get('/whoami')
    whoAmIm(@CurrentUser() user: string) {
        return user;
    };

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    };

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    };

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    };

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) throw new NotFoundException('user not found');
        return user;
    };

    @Get()
    async findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    };

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    };

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    };
};
