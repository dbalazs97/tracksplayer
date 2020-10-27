import { Injectable } from '@angular/core';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';
import { Track } from 'tracksplayer-common';
import { environment } from '../../../../environments/environment';
import { SpotifyApiService } from '../../../core/services/spotify-api.service';
import { PlayerManagerService } from '../manager/player-manager.service';
import { SpotifyPlayerService } from '../player/spotify-player.service';
import { Provider } from './provider.class';

@Injectable({
	providedIn: 'root',
})
export class SpotifyProviderService extends Provider {
	public isConnected: boolean = false;

	public name: string = 'Spotify';
	public icon = faSpotify;

	constructor(
		private playerManager: PlayerManagerService,
		private apiService: SpotifyApiService,
	) {
		super();
	}

	public connect(): Promise<boolean> {
		return this.apiService.authorize(environment.spotify.clientId, environment.spotify.redirectUrl, environment.spotify.scopes);
	}

	public destroy(): Promise<boolean> {
		return Promise.resolve(false);
	}

	public async get(id: string): Promise<Track> {
		return Promise.resolve({} as Track);
	}

	public async initialize(): Promise<boolean> {
		if (await this.apiService.isAuthenticated()) {
			this.isConnected = true;
			(window as any).onSpotifyWebPlaybackSDKReady = async () => await this.playerManager.initializePlayerByType(SpotifyPlayerService);
		} else {
			this.isConnected = false;
			(window as any).onSpotifyWebPlaybackSDKReady = () => {
			};
		}
		return Promise.resolve(true);
	}

	public async loadToPlayer(track: Track): Promise<void> {
		this.playerManager.setPlayerByType(SpotifyPlayerService);
		this.playerManager.currentPlayer.value?.track.next(track);
		this.playerManager.currentPlayer.value?.play();
		return Promise.resolve(undefined);
	}

	public async search(q: string): Promise<Array<Track>> {
		return this.apiService.searchTracks(q);
	}

}
