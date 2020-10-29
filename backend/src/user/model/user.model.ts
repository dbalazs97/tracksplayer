import { modelOptions, prop } from '@typegoose/typegoose';
import { IdBased } from 'tracksplayer-common';

@modelOptions({ schemaOptions: { collection: 'users' } })
export class UserModel implements IdBased {
  public _id: string;

  @prop()
  public username: string;

  @prop()
  public passwordHash: string;
}
