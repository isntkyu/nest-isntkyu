import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@ApiTags('workspace')
@Controller('api/workspaces')
export class WorkspacesController {
    constructor(private workspacesService: WorkspacesService) {}

    @Get()
    getMyWorkspaces( @User() user: Users){
        return this.workspacesService.findMyWorkspace(user.id);
    }

    @Post()
    createWorkspace(@User() user: Users, @Body() body: CreateWorkspaceDto){
        return this.workspacesService.createWorkspace(
            body.workspace,
            body.url,
            user.id,
        );
    }

    @Get(':url/members')
    getAllMembersFromWorkspace(@Param('url') url: string) {
        return this.workspacesService.getWorkspaceMembers(url);
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
