import { Controller, Get, Post, Query, Param, Body } from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
    @Get()
    getAllChannels() {

    }

    @Post()
    createChannel() {

    }

    @Get(':name')
    getSpecificChannel() {

    }

    @Get(':name/chats')
    // getChat(@Query('perPage') perPage, @Query('page') page, @Param('id') id) {
    getChats(@Query() query, @Param() param) {
        console.log(query.perPage, query.page);
        console.log(param.url, param.id);
    }

    @Post(':name/chats')
    postChat(@Body() body) {

    }

    @Get(':name/members')
    getAllMembers() {

    }

    @Post(':name/members')
    inviteMembers() {
        
    }

}
