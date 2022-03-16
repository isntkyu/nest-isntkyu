import { Controller, Get, Post, Query, Param, Body, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import multer from 'multer';
import path, { basename } from 'path';
import { User } from 'src/common/decorators/user.decorator';
import { ChannelsService } from './channels.service';
import { PostChatDto } from './dto/post-chat.dto';
import fs from 'fs';
import { Users } from 'src/entities/Users';

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

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

    @UseInterceptors(
      FilesInterceptor('image', 10, {
        storage: multer.diskStorage({
          destination(req, file, cb) {
            cb(null, 'uploads/');
          },
          filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
          },
        }),
        limits: { fileSize: 5 * 1024 * 1024 }, //500mb
      }),
    )
    @Post(':name/images')
    postImage(
      @Param('url') url,
      @Param('name') name,
      @UploadedFiles() files: Express.Multer.File[],
      @User() user: Users,
    ) {
      return this.channelsService.createWorkspaceChannelImages(
        url, name, files, user.id,
      );
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
