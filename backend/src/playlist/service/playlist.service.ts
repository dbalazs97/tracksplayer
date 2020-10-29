import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { PlaylistAddTrackRequestDto, PlaylistCreateRequestDto } from 'tracksplayer-common/dto';
import { PlaylistModel } from '../model/playlist.model';
import { TrackModel } from '../model/track.model';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(PlaylistModel) private readonly playlistModel: ReturnModelType<typeof PlaylistModel>,
    @InjectModel(TrackModel) private readonly trackModel: ReturnModelType<typeof TrackModel>,
  ) {
  }

  public async getAllPlaylists(userId: string): Promise<PlaylistModel[]> {
    return this.playlistModel.find({ owner: userId }).lean();
  }

  public async getPlaylistById(userId: string, playlistId: string): Promise<PlaylistModel> {
    return this.playlistModel.findOne({ owner: userId, _id: playlistId }).lean();
  }

  public async createPlaylist(userId: string, data: PlaylistCreateRequestDto): Promise<string> {
    const playlistToCreate = new PlaylistModel();
    playlistToCreate.fromDomain(data as any);
    playlistToCreate.owner = userId;
    const modelCreated = await this.playlistModel.create(playlistToCreate);
    return modelCreated._id;
  }

  public async deletePlaylistById(userId: string, playlistId: string): Promise<void> {
    return this.playlistModel.deleteOne({ owner: userId, _id: playlistId }).lean();
  }

  public async addTrackToPlaylist(userId: string, playlistId: string, data: PlaylistAddTrackRequestDto): Promise<void> {
    const verifiedTracks = await this.trackModel.find({ _id: { $in: data.tracks }, owner: userId }).lean();
    return this.playlistModel.findOneAndUpdate({
      owner: userId,
      _id: playlistId,
    }, {
      $addToSet: { tracks: verifiedTracks.map(track => track._id) as any },
    }).lean();
  }
}
