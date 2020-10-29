import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { TrackCreateRequestDto } from 'tracksplayer-common/dto';
import { PlaylistModel } from '../model/playlist.model';
import { TrackModel } from '../model/track.model';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(TrackModel) private readonly trackModel: ReturnModelType<typeof TrackModel>,
    @InjectModel(PlaylistModel) private readonly playlistModel: ReturnModelType<typeof PlaylistModel>,
  ) {
  }

  public async getTrackById(userId: string, trackId: string): Promise<TrackModel> {
    return this.trackModel.findOne({ owner: userId, _id: trackId }).lean();
  }

  public async createTrack(userId: string, data: TrackCreateRequestDto): Promise<string> {
    const trackToCreate = new TrackModel();
    trackToCreate.fromDomain(data);
    trackToCreate.owner = userId;
    const createdTrack = await this.trackModel.create(trackToCreate);
    return createdTrack._id;
  }

  public async deleteTrackById(userId: string, trackId: string): Promise<void> {
    await this.playlistModel.updateMany({ owner: userId }, { $pull: { tracks: { _id: trackId } } });
    await this.trackModel.deleteOne({ owner: userId, _id: trackId }).lean();
  }
}
