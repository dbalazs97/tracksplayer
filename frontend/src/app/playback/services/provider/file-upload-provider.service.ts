import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { Track } from 'tracksplayer-common';
import { PlayerManagerService } from '../manager/player-manager.service';
import { AudioTagPlayerService } from '../player/audio-tag-player.service';
import { Provider } from './provider.class';

declare global {
	interface Window {
		musicmetadata: any;
	}
}

@Injectable({
	providedIn: 'root',
})
export class FileUploadProviderService extends Provider {
	public files: Map<string, Track> = new Map();
	public isConnected: boolean = false;

	public name: string = 'Local files';
	public icon = faFileAlt;

	private fileInput!: HTMLInputElement;
	private renderer: Renderer2;

	constructor(
		private rendererFactory: RendererFactory2,
		private playerManager: PlayerManagerService,
	) {
		super();
		this.renderer = this.rendererFactory.createRenderer(null, null);
	}

	public connect(): Promise<boolean> {
		return new Promise(resolve => {
			this.fileInput = this.renderer.createElement('input');
			this.fileInput.type = 'file';
			this.fileInput.accept = 'audio/*';
			this.fileInput.multiple = true;
			this.fileInput.hidden = true;
			this.renderer.appendChild(document.body, this.fileInput);
			this.fileInput.click();

			this.fileInput.addEventListener('change', async () => {
				for (const file of Array.from(this.fileInput.files as unknown as File[])) {
					const buffer = await file.arrayBuffer();
					const blob = new Blob([ buffer ]);
					const url = URL.createObjectURL(blob);

					window.musicmetadata(buffer as any, { duration: true }, (err: any, metadata: any) => {
						console.log(err, metadata);
						this.files.set(url, {
							id: url,
							title: metadata.title ?? '',
							artist: metadata.artist?.join(', ') ?? '',
							album: metadata.album ?? '',
							artwork: URL.createObjectURL(new Blob([ metadata.picture[0]?.data ?? '' ], { 'type': 'image/' + metadata.picture[0].format })),
							length: metadata.duration ?? 0,
						});
					});
				}
				resolve();
			});
		});
	}

	public destroy(): Promise<boolean> {
		this.fileInput.remove();
		return Promise.resolve(true);
	}

	public async get(id: string): Promise<Track> {
		return new Promise((resolve, reject) => {
			const track = this.files.get(id);
			if (track === undefined) {
				reject();
			} else {
				resolve(track);
			}
		});
	}

	public async loadToPlayer(track: Track): Promise<void> {
		return new Promise((resolve, reject) => {
			this.playerManager.setPlayerByType(AudioTagPlayerService);
			const trackFound = this.files.get(track.id);
			if (trackFound === undefined) {
				reject();
			} else {
				this.playerManager.currentPlayer.value?.track.next(trackFound);
				this.playerManager.currentPlayer.value?.play();
			}
		});
	}

	public async initialize(): Promise<boolean> {
		await this.playerManager.initializePlayerByType(AudioTagPlayerService);
		return Promise.resolve(true);
	}

	public async search(q: string): Promise<Array<Track>> {
		return new Promise((resolve) => {
			const results: Array<Track> = [];
			for (const track of this.files.values()) {
				if (
					track.title.toLowerCase().includes(q.toLowerCase()) ||
					track.artist.toLowerCase().includes(q.toLowerCase()) ||
					track.album.toLowerCase().includes(q.toLowerCase())
				) {
					results.push(track);
				}
			}
			resolve(results);
		});
	}

}
