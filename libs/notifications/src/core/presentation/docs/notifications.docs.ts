import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SendEmailDto } from "../dto/send-email.dto";

export const notificationsDocs = {
    sendEmail: () =>
        applyDecorators(
            ApiOperation({ summary: 'Send email' }),
            ApiBody({ type: SendEmailDto }),
            ApiResponse({ status: 200, description: 'Email sent successfully' }),
        ),
}