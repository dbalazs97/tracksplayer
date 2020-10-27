import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Track } from 'tracksplayer-common';
import { Spotify } from '../../../core/interfaces/declare-spotify.interface';
import { SpotifyApiService } from '../../../core/services/spotify-api.service';
import { Player } from './player.class';

@Injectable({
	providedIn: 'root',
})
export class SpotifyPlayerService extends Player {
	private player!: Spotify.SpotifyPlayer;
	private trackSubscription: Subscription;
	private deviceId!: string;

	constructor(
		private apiService: SpotifyApiService,
	) {
		super();
		this.trackSubscription = this.track.pipe(filter(t => !!t)).subscribe(async (track) => {
			await this.player.pause();
			await this.fetchTrack(track ?? undefined);
			await this.player.pause();
		});
	}

	private _position: number = 0;

	public get position(): number {
		this.player.getCurrentState().then(state => {
			this._position = (state?.position ?? 0) / 1000;
		});
		return this._position;
	}

	public set position(position: number) {
		this.apiService.seekTrack(this.deviceId, position).then();
	}

	public get volume(): number {
		return this.player.volume * 100;
	}

	public set volume(volume: number) {
		this.apiService.setVolume(this.deviceId, volume).then();
	}

	public async destroy(): Promise<boolean> {
		return Promise.resolve(false);
	}

	public async initialize(): Promise<boolean> {
		return new Promise(resolve => {
			this.player = new (window as any).Spotify.Player({
				name: 'TracksPlayer',
				getOAuthToken: (cb: any) => this.apiService.getToken().then(tokens => cb(tokens.access_token)),
			});

			// @ts-ignore
			this.player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				this.deviceId = device_id;
				resolve();
			});

			this.player.connect();
		});
	}

	public async pause(): Promise<void> {
		await this.apiService.pauseTrack(this.deviceId);
	}

	public async play(): Promise<void> {
		await this.apiService.playTrack(this.deviceId);
	}

	private async fetchTrack(track?: Track) {
		if (track) {
			await this.apiService.playTrack(this.deviceId, track.id);
		}
	}

}
