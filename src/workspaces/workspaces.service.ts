import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
    constructor(
        @InjectRepository(Workspaces)
        private workspaceRepository: Repository<Workspaces>,
        @InjectRepository(Channels)
        private channelsRepository: Repository<Channels>,
        @InjectRepository(WorkspaceMembers)
        private workspaceMembersRepository: Repository<WorkspaceMembers>,
        @InjectRepository(ChannelMembers)
        private channelMembersRepository: Repository<ChannelMembers>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async findById(id: number) {
        return this.workspaceRepository.findByIds([id]);
    }

    async findMyWorkspace(myId: number) {
        return this.workspaceRepository.find({
            where: {
                WorkspaceMembers: [{UserId: myId}]
            }
        })
    }

    async createWorkspace (name:string, url: string, myId: number) {
        
    }
}
