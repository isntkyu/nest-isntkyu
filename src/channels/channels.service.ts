import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { ChannelChats } from '../entities/ChannelChats';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import { Users } from '../entities/Users';
import { Workspaces } from '../entities/Workspaces';

@Injectable()
export class ChannelsService {
  constructor(
      @InjectRepository(Channels)
      private channelsRepository: Repository<Channels>,
      @InjectRepository(ChannelMembers)
      private channelMembersRepository: Repository<ChannelMembers>,
      @InjectRepository(Workspaces)
      private workspacesRepository: Repository<Workspaces>,
      @InjectRepository(ChannelChats)
      private channelChatsRepository: Repository<ChannelChats>,
      @InjectRepository(Users)
      private usersRepository: Repository<Users>,
  ) {}

  async findById(id: number) {
    return this.channelChatsRepository.findOne({where:{id}});
  }

  async getWorkspaceChannels(url: string, myId: number) {
    return this.channelsRepository
      .createQueryBuilder('channels')
      .innerJoinAndSelect(
        'channels.ChannelMembers',
        'channelMembers',
        'channelMembers.userId = :myId',
        { myId },
      )
      .innerJoinAndSelect(
        'channels.Workspace',
        'workspace',
        'workspace.url = :url',
        { url },
      )
      .getMany();
  }

  async getWorkspaceChannel(url: string, name: string) {
    return this.channelsRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .where('channel.name = :name', { name })
      .getOne();
  }
}
