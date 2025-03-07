import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller()
export class AppController {
  private users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('users')
  getUsers() {
    return this.users;
  }

  @Post('users')
  createUser(@Body() user: { name: string; email: string }) {
    this.users.push({ id: this.users.length + 1, ...user });
    return user;
  }

  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() user: { name: string }) {
    const index = this.users.findIndex((u) => u.id === parseInt(id));
    if (index !== -1) {
      this.users[index].name = user.name;
    }
    return this.users[index];
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    this.users = this.users.filter((u) => u.id !== parseInt(id));
    return { message: 'User deleted' };
  }
}