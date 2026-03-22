import { ArgumentsHost, Catch, RpcExceptionFilter } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { DomainError } from "../errors";
import { RpcException } from "@nestjs/microservices";

@Catch(DomainError)
export class DomainErrorRpcFilter implements RpcExceptionFilter<DomainError> {
    catch(exception: DomainError, host: ArgumentsHost): Observable<any> {
        return throwError(() => new RpcException({
            statusCode: exception.statusCode,
            message: exception.message,
            error: exception.name
        }))
    }

}