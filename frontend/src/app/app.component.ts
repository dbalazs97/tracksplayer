import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { BehaviorSubject } from 'rxjs';
import { TrackView } from './core/interfaces/track-view.interface';
import { ProviderManagerService } from './playback/services/manager/provider-manager.service';

@Component({
	selector: 'tracksplayer-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
})
export class AppComponent {
	public searchField: string = '';
	public tracks: BehaviorSubject<Array<TrackView>> = new BehaviorSubject<Array<TrackView>>([]);
	public faPlay: any = faPlay;

	constructor(
		public providerManager: ProviderManagerService,
		public sanitizer: DomSanitizer,
	) {
	}

	async onSearchChange() {
		this.tracks.next([]);
		for (const provider of this.providerManager.registeredProviders) {
			const result = (await provider.search(this.searchField)).map(track => ({
				track: {
					...track,
					artwork: this.sanitizer.bypassSecurityTrustResourceUrl(track.artwork),
				}, provider,
			} as TrackView));
			this.tracks.next([ ...this.tracks.value, ...result ]);
		}
	}
}
