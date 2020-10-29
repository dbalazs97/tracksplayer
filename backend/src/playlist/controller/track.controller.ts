import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Track } from 'tracksplayer-common';
import { TrackCreateRequestDto, TrackCreateResponseDto } from 'tracksplayer-common/dto';
import { User } from '../../user/decorator/user.decorator';
import { JwtGuard } from '../../user/guard/jwt.guard';
import { TrackModel } from '../model/track.model';
import { PlaylistService } from '../service/playlist.service';
import { TrackService } from '../service/track.service';

@Controller('track')
export class TrackController {
  constructor(
    private playlistService: PlaylistService,
    private trackService: TrackService,
  ) {
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  public async getTrackById(@User() userId: string, @Param('id') trackId: string): Promise<Track> {
    const track = await this.trackService.getTrackById(userId, trackId);
    return TrackModel.toDomain(track);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  public async deleteTrackById(@User() userId: string, @Param('id') trackId: string) {
    await this.trackService.deleteTrackById(userId, trackId);
  }

  @Post('')
  @UseGuards(JwtGuard)
  public async createTrack(@User() userId: string, @Body() data: TrackCreateRequestDto): Promise<TrackCreateResponseDto> {
    return {
      id: await this.trackService.createTrack(userId, data),
    };
  }
}
