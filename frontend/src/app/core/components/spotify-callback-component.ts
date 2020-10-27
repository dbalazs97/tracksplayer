import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PlayerManagerService } from '../../playback/services/manager/player-manager.service';
import { SpotifyPlayerService } from '../../playback/services/player/spotify-player.service';
import { SpotifyProviderService } from '../../playback/services/provider/spotify-provider.service';
import { SpotifyApiService } from '../services/spotify-api.service';

@Component({
	template: '<strong>Processing spotify login...<br><span style="color: red">{{ error }}</span></strong>',
})
export class SpotifyCallbackComponent implements OnInit {
	public error: string = '';

	constructor(
		private playerManager: PlayerManagerService,
		private provider: SpotifyProviderService,
		private apiService: SpotifyApiService,
		private route: ActivatedRoute,
		private router: Router,
	) {
	}

	public ngOnInit() {
		this.route.queryParamMap.subscribe(async params => {
			const error = params.get('error');
			if (error) {
				this.error = error;
			} else {
				const tokens = await this.apiService.getTokenFromSpotify(
					environment.spotify.clientId,
					environment.spotify.clientSecret,
					environment.spotify.redirectUrl,
					params.get('code') ?? '',
				);

				await this.apiService.storeTokens(tokens);
				await this.provider.initialize();
				await this.playerManager.initializePlayerByType(SpotifyPlayerService);
				await this.router.navigateByUrl('');
			}
		});
	}
}
