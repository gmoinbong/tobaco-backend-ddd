import { ApiProperty } from "@nestjs/swagger";

export class SendOtpDto {
    @ApiProperty({ description: "Recipient email", example: "recipient@mail.com" })
    email: string;
}