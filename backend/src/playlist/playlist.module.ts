import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CoreModule } from '../core/core.module';
import { PlaylistController } from './controller/playlist.controller';
import { TrackController } from './controller/track.controller';
import { PlaylistModel } from './model/playlist.model';
import { TrackModel } from './model/track.model';
import { PlaylistService } from './service/playlist.service';
import { TrackService } from './service/track.service';

@Module({
  imports: [
    TypegooseModule.forFeature([ PlaylistModel, TrackModel ]),
    CoreModule,
  ],
  controllers: [
    PlaylistController,
    TrackController,
  ],
  providers: [
    PlaylistService,
    TrackService,
  ],
})
export class PlaylistModule {
}
