import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { IdBased, Track } from 'tracksplayer-common';
import { DomainMappable } from '../../core/interface/domain-mappable.interface';
import { UserModel } from '../../user/model/user.model';

@modelOptions({ schemaOptions: { collection: 'tracks' } })
export class TrackModel implements DomainMappable<TrackModel, Track>, Track, IdBased {
  public _id: string;

  @prop({ ref: () => UserModel })
  public owner: Ref<UserModel>;

  @prop()
  public album: string;

  @prop()
  public artist: string;

  @prop()
  public artwork: string;

  @prop()
  public id: string;

  @prop()
  public length: number;

  @prop()
  public title: string;

  static toDomain(object: TrackModel): Track {
    return {
      album: object?.album ?? '',
      artist: object?.artist ?? '',
      artwork: object?.artwork ?? '',
      id: object?.id ?? '',
      length: object?.length ?? 0,
      title: object?.title ?? '',
    };
  }

  public fromDomain(domain: Track): TrackModel {
    this.album = domain?.album ?? '';
    this.artist = domain?.artist ?? '';
    this.artwork = domain?.artwork ?? '';
    this.id = domain?.id ?? '';
    this.length = domain?.length ?? 0;
    this.title = domain?.title ?? '';
    return this;
  }
}
