import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { IdBased, Playlist } from 'tracksplayer-common';
import { DomainMappable } from '../../core/interface/domain-mappable.interface';
import { UserModel } from '../../user/model/user.model';
import { TrackModel } from './track.model';

@modelOptions({ schemaOptions: { collection: 'playlists' } })
export class PlaylistModel implements DomainMappable<PlaylistModel, Playlist>, Playlist, IdBased {
  public _id: string;

  @prop({ ref: () => UserModel })
  public owner: Ref<UserModel>;

  @prop()
  public name: string;

  @prop()
  public length: number;

  @prop()
  public artwork: string;

  @prop({ ref: () => TrackModel })
  // @ts-ignore
  public tracks: Ref<TrackModel>[];

  static toDomain(object: PlaylistModel): Playlist {
    return {
      id: object?._id ?? '',
      name: object?.name ?? '',
      length: object?.length ?? 0,
      artwork: object?.artwork ?? '',
      tracks: object?.tracks.map(track => track.toString()) as any ?? [],
    } as Playlist;
  }

  public fromDomain(domain: Playlist): PlaylistModel {
    this.name = domain?.name ?? '';
    this.length = domain?.length ?? 0;
    this.artwork = domain?.artwork ?? '';
    this.tracks = domain?.tracks as any ?? [];
    return this;
  }

}
