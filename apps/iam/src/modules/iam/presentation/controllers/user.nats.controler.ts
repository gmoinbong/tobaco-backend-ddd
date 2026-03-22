import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserService } from "../../application/user.service";
import { CreateUserDto, UpdateUserDto } from "../dto";
import { Controller, UseFilters } from "@nestjs/common";
import { SendOtpUseCase } from "libs/notifications/src/core/application/send-otp.use.case";
import { DomainErrorRpcFilter } from "@shared/core/domain/mappers/domain-error.rpc-filter";

@Controller()
@UseFilters(DomainErrorRpcFilter)
export class UserNatsController {
    constructor(private readonly userService: UserService, private readonly sendOtpUseCase: SendOtpUseCase) { }

    @MessagePattern("users.create")
    async create(@Payload() createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);
        if (user) {
            await this.sendOtpUseCase.execute(createUserDto.email);
        }
        return user;
    }

    @MessagePattern("users.getById")
    async getById(@Payload() data: { id: string }) {
        return this.userService.getById(data.id);
    }

    @MessagePattern("users.update")
    async update(@Payload() data: { id: string } & UpdateUserDto) {
        const { id, ...updateUserDto } = data
        return this.userService.update(data.id, updateUserDto);
    }

    @MessagePattern("users.delete")
    async delete(@Payload() data: { id: string }) {
        return this.userService.delete(data.id);
    }
}