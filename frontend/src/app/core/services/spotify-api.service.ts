import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Track } from 'tracksplayer-common';
import { environment } from '../../../environments/environment';
import { SpotifyTrack } from '../../playback/interfaces/spotify-track.interface';
import { SpotifyToken } from '../interfaces/spotify-token';
import { SpotifyTrackSearchResponse } from '../interfaces/spotify-track-search-response.interface';

@Injectable({
	providedIn: 'root',
})
export class SpotifyApiService {
	constructor(
		private http: HttpClient,
	) {
	}

	public authorize(clientId: string, redirectUrl: string, scope: string): Promise<any> {
		let params: HttpParams = new HttpParams();
		params = params.append('client_id', clientId);
		params = params.append('response_type', 'code');
		params = params.append('redirect_uri', redirectUrl);
		params = params.append('scope', scope);
		params = params.append('state', Math.random().toString(36).substring(7));

		window.location.href = `https://accounts.spotify.com/authorize?${ params.toString() }`;

		return Promise.resolve();
	}

	public getTokenFromSpotify(clientId: string, clientSecret: string, redirectUrl: string, code: string): Promise<SpotifyToken> {
		let params: HttpParams = new HttpParams();
		params = params.append('code', code);
		params = params.append('grant_type', 'authorization_code');
		params = params.append('redirect_uri', redirectUrl);

		return this.http.post<SpotifyToken>('https://accounts.spotify.com/api/token', params.toString(), {
			headers: {
				Authorization: `Basic ${ btoa(`${ clientId }:${ clientSecret }`) }`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}).toPromise();
	}

	public refreshTokenFromSpotify(clientId: string, clientSecret: string, refreshToken: string): Promise<SpotifyToken> {
		let params: HttpParams = new HttpParams();
		params = params.append('refresh_token', refreshToken);
		params = params.append('grant_type', 'refresh_token');

		return this.http.post<SpotifyToken>('https://accounts.spotify.com/api/token', params.toString(), {
			headers: {
				Authorization: `Basic ${ btoa(`${ clientId }:${ clientSecret }`) }`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}).toPromise();
	}

	public async isAuthenticated(): Promise<boolean> {
		const now = new Date();
		const accessToken = localStorage.getItem('spotify_access_token');
		const refreshToken = localStorage.getItem('spotify_refresh_token') ?? '';
		const expire = new Date(localStorage.getItem('spotify_expire') ?? '0');

		if (accessToken === null || refreshToken === null) {
			return false;
		}

		console.log(expire.getTime() - now.getTime());

		if (expire.getTime() - now.getTime() < 120) {
			try {
				const tokens = await this.refreshTokenFromSpotify(environment.spotify.clientId, environment.spotify.clientSecret, refreshToken);
				await this.storeTokens(tokens);
				return true;
			} catch {
				return false;
			}
		}

		return true;
	}

	public getToken(): Promise<SpotifyToken> {
		return Promise.resolve({
			access_token: localStorage.getItem('spotify_access_token') ?? '',
			refresh_token: localStorage.getItem('spotify_refresh_token') ?? '',
			expires_in: Number(localStorage.getItem('spotify_expire') ?? 0),
		});
	}

	public async storeTokens(tokens: SpotifyToken): Promise<void> {
		const now = new Date();
		now.setSeconds(now.getSeconds() + tokens.expires_in);

		localStorage.setItem('spotify_access_token', tokens.access_token);
		localStorage.setItem('spotify_refresh_token', tokens.refresh_token);
		localStorage.setItem('spotify_expire', now.toISOString());
		return Promise.resolve();
	}

	public async searchTracks(q: string): Promise<Array<Track>> {
		let params: HttpParams = new HttpParams();
		params = params.append('q', q);
		params = params.append('type', 'track');

		return this.http.get<SpotifyTrackSearchResponse>('https://api.spotify.com/v1/search', {
			params,
		}).pipe(
			map(res => res.tracks.items),
			map<SpotifyTrack[], Track[]>(tracks =>
				tracks.map(track => ({
					id: track.id,
					title: track.name,
					artist: track.artists.map(artist => artist.name).join(', '),
					album: track.album.name,
					length: track.duration_ms / 1000,
					artwork: track.album.images[0].url,
				})),
			),
		).toPromise();
	}

	public playTrack(deviceId: string, id?: string): Promise<any> {
		return this.http.put('https://api.spotify.com/v1/me/player/play', !!id ? {
			uris: [ `spotify:track:${ id }` ],
		} : {}, {
			params: new HttpParams({ fromObject: { device_id: deviceId } }),
		}).toPromise();
	}

	public pauseTrack(deviceId: string): Promise<any> {
		return this.http.put('https://api.spotify.com/v1/me/player/pause', {}, {
			params: !!deviceId ? new HttpParams({ fromObject: { device_id: deviceId } }) : undefined,
		}).toPromise();
	}

	public seekTrack(deviceId: string, position: number): Promise<any> {
		const params = new HttpParams({
			fromObject: {
				device_id: deviceId,
				position_ms: position.toString(),
			},
		});
		return this.http.put('https://api.spotify.com/v1/me/player/seek', {}, { params }).toPromise();
	}

	public setVolume(deviceId: string, volume: number): Promise<any> {
		const params = new HttpParams({
			fromObject: {
				device_id: deviceId,
				volume_percent: volume.toString(),
			},
		});
		return this.http.put('https://api.spotify.com/v1/me/player/volume', {}, { params }).toPromise();
	}
}
