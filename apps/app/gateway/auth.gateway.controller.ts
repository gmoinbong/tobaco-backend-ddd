import { AuthDocs } from "@iam/modules/iam/presentation/docs/auth.docs";
import { LoginDto } from "@iam/modules/iam/presentation/dto";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller("auth")
export class AuthGatewayController {
    constructor(@Inject("iam") private readonly iamClient: ClientProxy) { }

    @Post("login")
    @AuthDocs.login()
    async login(@Body() loginDto: LoginDto) {
        return firstValueFrom(this.iamClient.send("auth.login", loginDto));
    }
}
