import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/Users";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalSerializer extends PassportSerializer {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
    ) {
        super();
    }

    serializeUser(user: Users, doen: CallableFunction) {
        doen(null, user.id);
    }

    async deserializeUser(userId: string, done: CallableFunction) {
        return await this.usersRepository
            .findOneOrFail(
                {
                    id: +userId,
                },
                {
                    select: ['id', 'email', 'nickname'],
                    relations: ['Workspaces'],
                }
            ).then((user) => {
                console.log('user', user);
                done(null, user);
            })
            .catch((error) => done(error)); //DB를 다룰떈 에러처리
    }
}