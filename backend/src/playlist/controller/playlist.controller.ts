import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { Playlist } from 'tracksplayer-common';
import {
  PlaylistAddTrackRequestDto,
  PlaylistCreateRequestDto,
  PlaylistCreateResponseDto,
  PlaylistResponseDto,
} from 'tracksplayer-common/dto';
import { User } from '../../user/decorator/user.decorator';
import { JwtGuard } from '../../user/guard/jwt.guard';
import { PlaylistModel } from '../model/playlist.model';
import { PlaylistService } from '../service/playlist.service';

@Controller('playlist')
export class PlaylistController {
  constructor(
    private playlistService: PlaylistService,
  ) {
  }

  @Get('')
  @UseGuards(JwtGuard)
  public async getAllPlaylist(@User() userId: string): Promise<PlaylistResponseDto> {
    const playlists = await this.playlistService.getAllPlaylists(userId);
    return {
      playlists: playlists.map(playlist => PlaylistModel.toDomain(playlist)),
    };
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  public async getPlaylistById(@User() userId: string, @Param('id') playlistId: string): Promise<Playlist> {
    return PlaylistModel.toDomain(await this.playlistService.getPlaylistById(userId, playlistId));
  }

  @Post('')
  @UseGuards(JwtGuard)
  public async createPlaylist(@User() userId: string, @Body() data: PlaylistCreateRequestDto): Promise<PlaylistCreateResponseDto> {
    return {
      id: await this.playlistService.createPlaylist(userId, data),
    };
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deletePlaylistById(@User() userId: string, @Param('id') playlistId: string): Promise<void> {
    await this.playlistService.deletePlaylistById(userId, playlistId);
  }

  @Post(':id/track')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async addTrackToPlaylist(@User() userId: string, @Param('id') playlistId: string, @Body() data: PlaylistAddTrackRequestDto): Promise<void> {
    await this.playlistService.addTrackToPlaylist(userId, playlistId, data);
  }
}
