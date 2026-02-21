import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "../../application/user.service";
import { UserDocs } from "../docs/user.docs";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UserDocs.create()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(":id")
  @UserDocs.getById()
  async getById(@Param("id") id: string) {
    return this.userService.getById(id);
  }

  @Put(":id")
  @UserDocs.update()
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @UserDocs.delete()
  async delete(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
