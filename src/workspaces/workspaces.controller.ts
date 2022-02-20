import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('workspace')
@Controller('api/workspaces')
export class WorkspacesController {
    @Get()
    getMyWorkspaces(){

    }

    @Post()
    createWorkspace(){
    
    }

    @Get(':url/members')
    getAllMembersFromWorkspace() {

    }

    @Post(':url/members')
    inviteMembersToWorkspace() {

    }

    @Delete(':url/members/:id')
    kickMembersFromWorkspace() {

    }

    @Get(':url/members/:id')
    getMemberInfoInWorkspace() {

    }
}
