import { Expose, Exclude } from 'class-transformer';

//Expose, return properties...
//Exclude, dont reuturn properties

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
};