import { Injectable, UseInterceptors } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private UserModel: Model<User>) {

  }


  getAll() {
    return this.UserModel.find({}, {
      password: 0,
    });
  }

  async findOne(id: number) {
    const { password, ...user } = await this.UserModel.findById(id);
    return user;
  }

  async create(payload) {
    const newUserModel = new this.UserModel(payload);
    newUserModel.password = await bcrypt.hash(payload.password, 10);
    await newUserModel.save();
    const { password, ...data } = newUserModel.toJSON();
    return data;
  }

  async update(id: number, payload) {
    return this.UserModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
  }

  async delete(id: number) {
    return this.UserModel.findByIdAndDelete(id);
  }

  async findOneByName(username: string) {
    return this.UserModel.findOne({
      name: username,
    });
  }
}