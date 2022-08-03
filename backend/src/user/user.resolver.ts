import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CurrentUser,
  CurrentUserPayload,
} from '../common/decorator/current-user.decorator';
import { Public } from '../common/decorator/public.decorator';
import { CreateUserInput } from './dto/create-user.input';
import { LoggedUserOutput } from './dto/logged-user.output';
import { LoginUserInput } from './dto/login-user.input';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  @Public()
  @Mutation(() => LoggedUserOutput)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.userService.loginUser(loginUserInput);
  }

  @Query(() => User)
  async me(@CurrentUser() currentUser: CurrentUserPayload) {
    return this.userService.findById(currentUser.userId);
  }
}
