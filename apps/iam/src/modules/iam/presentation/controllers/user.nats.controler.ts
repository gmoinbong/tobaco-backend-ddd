import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserService } from "../../application/user.service";
import { CreateUserDto, UpdateUserDto } from "../dto";
import { Controller } from "@nestjs/common";

@Controller()
export class UserNatsController {
    constructor(private readonly userService: UserService) { }

    @MessagePattern("users.create")
    async create(@Payload() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
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