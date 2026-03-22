import { ApiProperty } from "@nestjs/swagger";

export class SendEmailDto {
    @ApiProperty({ description: 'Sender email', example: 'noreply@example.com' })
    from: string;

    @ApiProperty({ description: 'Recipient email', example: 'user@example.com' })
    to: string;

    @ApiProperty({ description: 'Email subject', example: 'Welcome' })
    subject: string;

    @ApiProperty({ description: 'Plain text body', example: 'Hello' })
    text: string;

    @ApiProperty({ description: 'HTML body', example: '<p>Hello</p>' })
    html: string;
}
