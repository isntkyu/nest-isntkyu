import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/dms')
export class DmsController {
    @Get(':id/chats')
    // getChat(@Query('perPage') perPage, @Query('page') page, @Param('id') id) {
    getChat(@Query() query, @Param() param) {
        console.log(query.perPage, query.page);
        console.log(param.url, param.id);
    }

    @Post(':id/chats')
    postChat(@Body() body) {

    }
}
