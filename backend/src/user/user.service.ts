import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const password = userDto.password;
    userDto.password = await bcrypt.hash(password, saltOrRounds);
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async find(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async loginUser(loginUserInput: LoginUserInput) {
    const user = await this.authService.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );
    if (!user) {
      throw new BadRequestException(`Email or password are invalid`);
    } else {
      return this.authService.generateUserCredentials(user);
    }
  }
}
