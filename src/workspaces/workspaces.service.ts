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
        const workspace = this.workspaceRepository.create({
            name,
            url,
            OwnerId: myId,
        })
        const returned = this.workspaceRepository.save(workspace);

        const workspaceMember = new WorkspaceMembers();
        workspaceMember.UserId = myId;
        workspaceMember.WorkspaceId = (await returned).id;
        await this.workspaceMembersRepository.save(workspaceMember);
        const channel = new Channels();
        channel.name = '일반';
        channel.WorkspaceId = (await returned).id;
        const channelReturned = await this.channelsRepository.save(channel);
        const channelMember = new ChannelMembers();
        channelMember.UserId = myId;
        channelMember.ChannelId = channelReturned.id;
        await this.channelMembersRepository.save(channelMember);
    }

    async getWorkspaceMembers(url: string) {
        return this.usersRepository.createQueryBuilder('user')
        .innerJoin('user.WorkspaceMembers', 'm')
        .innerJoin('m.Workspace', 'w', 'w.url = :url', {url})
        .getMany();
    }   
}
