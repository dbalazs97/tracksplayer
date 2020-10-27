import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { PlayerManagerService } from '../../services/manager/player-manager.service';
import { ProviderManagerService } from '../../services/manager/provider-manager.service';
import { Player } from '../../services/player/player.class';

@Component({
	selector: 'tracksplayer-player',
	templateUrl: './player.component.html',
	styleUrls: [ './player.component.scss' ],
})
export class PlayerComponent {
	public faPlay = faPlay;
	public faPause = faPause;
	public faStop = faStop;

	public player: BehaviorSubject<Player | null> = this.playerManager.currentPlayer;

	constructor(
		public sanitizer: DomSanitizer,
		private providerManager: ProviderManagerService,
		private playerManager: PlayerManagerService,
	) {
	}

}
