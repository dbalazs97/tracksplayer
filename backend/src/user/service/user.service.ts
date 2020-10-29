import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from 'nestjs-typegoose';
import { UserLoginRequestDto } from 'tracksplayer-common/dto/user/user-login-request.dto';
import { UserLoginResponseDto } from 'tracksplayer-common/dto/user/user-login-response.dto';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>,
    private jwtService: JwtService,
  ) {
  }

  public async validateUser(username: string, password: string): Promise<Partial<UserModel> | null> {
    const user = await this.userModel.findOne({ username }).lean();
    const isPasswordSame = await bcrypt.compare(password, user?.passwordHash ?? '');

    if (user && isPasswordSame) {
      return { username: user.username };
    } else {
      return null;
    }
  }

  public async login(dto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    const user = await this.userModel.findOne({ username: dto.username });
    if (user) {
      const jwtPayload = { username: dto.username, sub: user._id };
      const token = await this.jwtService.signAsync(jwtPayload);
      return {
        token,
      };
    }
  }
}
