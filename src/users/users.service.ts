import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) {}
    getUser() {}
    async postUsers(email: string, nickname: string, password: string){
        if (!email) {
            //없으면 에러
            throw new HttpException('이메일없음', 400);
        }
        if (!nickname) {
            //없으면 에러
            throw new HttpException('닉네임없음', 400);
        }
        if (!password) {
            //없으면 에러
            throw new HttpException('비번없음', 400);
        }
        const user = await this.usersRepository.findOne({where: {email}})

        if (user) {
            // 이미 존재하는 유저 에러
            throw new Error('이미 존재하는 사용자입니다.');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await this.usersRepository.save({
            email,
            nickname,
            password: hashedPassword
        })
    }
}
