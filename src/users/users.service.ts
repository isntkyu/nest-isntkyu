import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(WorkspaceMembers)
        private workspaceMembersRepository: Repository<WorkspaceMembers>,
        @InjectRepository(ChannelMembers)
        private channelMembersRepository: Repository<ChannelMembers>,
        private connection: Connection,
    ) {}
    getUser() {}
    async join(email: string, nickname: string, password: string){
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect(); // 수동
        await queryRunner.startTransaction();
        const user = await queryRunner.manager.getRepository(Users)
        .findOne({where: {email}})

        if (user) {
            // 이미 존재하는 유저 에러
            throw new UnauthorizedException('이미 존재하는 사용자입니다.');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        try {
            const returned = await queryRunner.manager.getRepository(Users).save({
                email,
                nickname,
                password: hashedPassword
            })
            //중간테이블 사용 장단점
            //방법1
            const workspaceMember = queryRunner.manager.getRepository(WorkspaceMembers).create();
            workspaceMember.UserId = returned.id;
            workspaceMember.WorkspaceId = 1;
            //방법2
            await queryRunner.manager.getRepository(ChannelMembers).save({ //data mapper
                UserId: returned.id,
                ChannelId: 1
            })
            await queryRunner.commitTransaction();
        } catch(error) {
            console.log(error);
            queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

        
        return true;
    }
}
