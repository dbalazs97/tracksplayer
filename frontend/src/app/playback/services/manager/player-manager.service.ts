import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AudioTagPlayerService } from '../player/audio-tag-player.service';
import { Player } from '../player/player.class';
import { SpotifyPlayerService } from '../player/spotify-player.service';

@Injectable({
	providedIn: 'root',
})
export class PlayerManagerService {
	public currentPlayer: BehaviorSubject<Player | null> = new BehaviorSubject<Player | null>(null);

	constructor(
		private audioTagPlayer: AudioTagPlayerService,
		private spotifyTagPlayer: SpotifyPlayerService,
	) {
	}

	public setPlayerByType(player: Type<Player>): void {
		this.currentPlayer.value?.pause();
		switch (player) {
			case AudioTagPlayerService:
				return this.currentPlayer.next(this.audioTagPlayer);
			case SpotifyPlayerService:
				return this.currentPlayer.next(this.spotifyTagPlayer);
			default:
				return this.currentPlayer.next(null);
		}
	}

	public async initializePlayerByType(player: Type<Player>) {
		switch (player) {
			case AudioTagPlayerService:
				return this.audioTagPlayer.initialize();
			case SpotifyPlayerService:
				return this.spotifyTagPlayer.initialize();
			default:
				return this.currentPlayer.next(null);
		}
	}

}
