import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserSchema, UserDocument } from './user.model';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserUpdateDto } from './UserUpdate.dto';
import { UserDetails } from './userInterface.details';
import { UserRole } from './Role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchema.name) private UserMod: Model<UserDocument>,
  ) { }

  _getUserDetails(user: UserDocument): UserDetails {
    return user;
    // return {
    //   id: user._id,
    //   user_name: user.user_name,
    //   email: user.email,
    //   role: user.role,
    // };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.UserMod.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.UserMod.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(user): Promise<UserDocument> {
    const newUser = new this.UserMod(user);
    return newUser.save();
  }

  //to find the user who is login
  async findOne(userName: string): Promise<UserDocument | undefined> {
    return this.UserMod.findOne({ userName });
  }

  //  reading the user collection
  async getAllUser() {
    return this.UserMod.find({})
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }

  // upadting the data
  async userUpdate(
    id: string,
    data: UpdateQuery<UserDocument> | UserUpdateDto,
  ): Promise<UserSchema> {
    return this.UserMod.findByIdAndUpdate(id, data, { new: true });
  }

  // deleting the data
  async delUser(id: string) {
    return this.UserMod.findByIdAndRemove(id);
  }
  async saveorupdateRefreshToken(refreshToken: string, id: string) {
    await this.UserMod.updateOne(id as any, { refreshtoken: refreshToken });
  }

  //find token through id

  public async findForId(id: number): Promise<UserDocument | null> {
    return this.UserMod.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * saveRefreshToken
   */
  public saveRefreshToken(id: string, refreshToken: string) {
    return this.UserMod.findByIdAndUpdate(
      id,
      { refresh_token: refreshToken },
      { new: true },
    );
  }

  /**
   * compareRefreshToken
   */
  public async compareRefreshToken(id, refreshToken) {
    const userData = await this.UserMod.findById(id).exec();
    if (userData.refresh_token === refreshToken) {
      return true;
    }
    return false;
  }
}
