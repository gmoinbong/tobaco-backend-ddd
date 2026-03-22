import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class RpcToHttpExceptionFIlter implements ExceptionFilter {
    private readonly logger = new Logger(RpcToHttpExceptionFIlter.name)

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const err = exception as any;
        const rawStatus = err?.statusCode ?? err?.code
        const status = typeof rawStatus === 'number' ? rawStatus : HttpStatus.INTERNAL_SERVER_ERROR
        const message = err?.message ?? 'Internal server error'

        this.logger.warn(`RPC/HTTP error: ${status} - ${message}`);

        response.status(status).json({
            statusCode: status,
            message,
            error: err?.name ?? 'Error',
        });

    }

}