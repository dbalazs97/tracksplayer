import { Injectable } from '@angular/core';
import { FileUploadProviderService } from '../provider/file-upload-provider.service';
import { Provider } from '../provider/provider.class';
import { SpotifyProviderService } from '../provider/spotify-provider.service';

@Injectable({
	providedIn: 'root',
})
export class ProviderManagerService {

	public registeredProviders: Array<Provider> = [
		this.fileUploadProvider,
		this.spotifyProvider,
	];

	constructor(
		private fileUploadProvider: FileUploadProviderService,
		private spotifyProvider: SpotifyProviderService,
	) {
		for (const provider of this.registeredProviders) {
			provider.initialize().then();
		}
	}

}
