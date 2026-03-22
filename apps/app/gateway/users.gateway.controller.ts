import { UserDocs } from "@iam/modules/iam/presentation/docs/user.docs";
import { CreateUserDto, UpdateUserDto } from "@iam/modules/iam/presentation/dto";
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller("users")
export class UsersGatewayController {
    constructor(@Inject("iam") private readonly iamClient: ClientProxy
    ) { }


    @Post()
    @UserDocs.create()
    async create(@Body() createUserDto: CreateUserDto) {
        return firstValueFrom(this.iamClient.send("users.create", createUserDto))
    }

    @Get(":id")
    @UserDocs.getById()
    async getById(@Param("id") id: string) {
        return firstValueFrom(this.iamClient.send("users.getById", id))
    }

    @Put(":id")
    @UserDocs.update()
    async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return firstValueFrom(this.iamClient.send("users.update", updateUserDto))
    }

    @Delete(":id")
    @UserDocs.delete()
    async delete(@Param("id") id: string) {
        return firstValueFrom(this.iamClient.send("users.delete", id))
    }

}