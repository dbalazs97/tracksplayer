import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { PlayerComponent } from './pages/player/player.component';
import { PlaybackRoutingModule } from './playback-routing.module';

@NgModule({
	declarations: [ PlayerComponent ],
	imports: [
		CommonModule,
		PlaybackRoutingModule,
		FormsModule,
		FontAwesomeModule,
		SharedModule,
	],
})
export class PlaybackModule {
}
