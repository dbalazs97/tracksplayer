import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalGuard } from '../guard/local.guard';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {
  }

  @UseGuards(LocalGuard)
  @Post('login')
  public login(@Request() req) {
    return this.userService.login(req.user);
  }
}
