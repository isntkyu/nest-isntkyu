import { ApiProperty } from "@nestjs/swagger";

export class JoinRequestDto {
    @ApiProperty({
        example: 'isntkyu@github.com',
        description: '이메일',
        required:true
    })
    public email: string;

    @ApiProperty({
        example: '이준규',
        description: '닉네임',
        required:true
    })
    public nickname: string;

    @ApiProperty({
        example: '1234',
        description: '비번',
        required:true
    })
    public password: string;
}