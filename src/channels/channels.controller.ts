import { Controller, Get, Post, Query, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { ChannelsService } from './channels.service';
import { PostChatDto } from './dto/post-chat.dto';

@ApiTags('channel')
@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService){}
    @Get()
    getAllChannels(@Param('url') url: string, @User() user) {
      return this.channelsService.getWorkspaceChannels(url, user.id);
    }

    @Post()
    createChannel() {

    }

    @Get(':name')
    getSpecificChannel(@Param('name') name:string) {

    }

    @Get(':name/chats')
    // getChat(@Query('perPage') perPage, @Query('page') page, @Param('id') id) {
    getChats(@Query() query, @Param() param, @Param('url') url:string, @Param('name') name:string) {
        console.log(query.perPage, query.page);
        console.log(param.url, param.id);
        return this.channelsService.getWorkspaceChannelChats(
          url,
          name,
          query.perPage,
          query.page,
        );
    }

    @Post(':name/chats')
    postChat(@Body() body: PostChatDto, 
    @Param('url') url:string, @Param('name') name:string, @User() user) {
      return this.channelsService.postChat({url, name, content: body.content, myId: user.id});
    }

    @UseInterceptors(FileInterceptor)
    @Post(':name/images')
    postImage(@UploadedFile() file: Express.Multer.File) {

    }

    @Get(':name/unreads')
    getUnreads(@Query('after') after: number, @Param('url') url:string, @Param('name') name:string) {
      return this.channelsService.getChannelUnreadsCount(url, name, after);
    }

    @Get(':name/members')
    getAllMembers(@Param('url') url:string, @Param('name') name:string) {
      return this.channelsService.getWorkspaceChannelMembers(url, name);
    }

    @Post(':name/members')
    inviteMembers() {
        
    }

}
