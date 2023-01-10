import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserSchema } from './user.model';
import { UserUpdateDto } from './UserUpdate.dto';
import { UserRole } from './Role.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { UserDetails } from './userInterface.details';
import { hasRoles } from '../Auth/Decorators/UserHasRoles';
import { RolesGuard } from '../Auth/Guard/roleGuard';
import { JwtGuard } from '../Auth/Guard/jwt.guard';
import { SecureRoute } from '../Auth/Guard/SecureRoute.guard';

@ApiTags('User CRUD')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  //get all user

  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  @hasRoles(UserRole.Admin, UserRole.User,UserRole.Librarian)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'This API Get All Users From DB' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: UserSchema,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  readUser() {
    console.log('All data Extracted....');
    return this.UserService.getAllUser();
  }

  //get user by id

  @UseGuards(JwtGuard, SecureRoute, RolesGuard)
  @Get(':id')
  @hasRoles(UserRole.Admin, UserRole.Librarian)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Api to get user by id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.UserService.findById(id);
  }

  @UseGuards(JwtGuard, SecureRoute, RolesGuard)
  @hasRoles(UserRole.Admin)
  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update the user in DB' })
  @ApiParam({
    description: 'enter unique id',
    required: true,
    name: 'id',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        User_name: {
          type: 'string',
          example: 'test',
          description: 'this is the name of user',
        },
        email: {
          type: 'string',
          example: 'test',
          description: 'this is the email of user must be unique',
        },
        password: {
          type: 'string',
          example: '******',
          description: 'pasword of user',
        },
        role: {
          type: 'string',
          enum: [UserRole.Admin, UserRole.Librarian, UserRole.User],
          description: 'role of user must be the given role to select',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'success', type: UserUpdateDto })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async updateUserId(
    @Param('id') id: string,
    @Body() UserUpdate: UserUpdateDto,
  ): Promise<UserSchema> {
    console.log('updated.....');
    return this.UserService.userUpdate(id, UserUpdate);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @hasRoles(UserRole.Admin)
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Api to Delete user from DB' })
  @ApiResponse({ status: 200, description: 'success', type: UserSchema })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async deleteUser(@Param('id') id: string) {
    console.log('Deleted.....');
    return this.UserService.delUser(id);
  }
}
