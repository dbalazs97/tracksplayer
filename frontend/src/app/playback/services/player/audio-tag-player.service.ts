import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Player } from './player.class';

@Injectable({
	providedIn: 'root',
})
export class AudioTagPlayerService extends Player {
	private audioTag!: HTMLAudioElement;
	private trackSubscription: Subscription;
	private renderer: Renderer2;

	constructor(
		private rendererFactory: RendererFactory2,
	) {
		super();
		this.renderer = this.rendererFactory.createRenderer(null, null);
		this.trackSubscription = this.track.pipe(filter(t => !!t)).subscribe(track => {
			this.audioTag.pause();
			this.audioTag.src = track?.id ?? '';
		});
	}

	public get position(): number {
		return this.audioTag?.currentTime ?? 0;
	}

	public set position(position: number) {
		this.audioTag.currentTime = position;
	}

	public get volume(): number {
		return this.audioTag?.volume ?? 0;
	}

	public set volume(volume: number) {
		this.audioTag.volume = volume;
	}

	public initialize(): Promise<boolean> {
		this.audioTag = this.renderer.createElement('audio');
		this.audioTag.autoplay = false;
		this.renderer.appendChild(document.body, this.audioTag);
		return Promise.resolve(true);
	}

	public destroy(): Promise<boolean> {
		this.trackSubscription?.unsubscribe();
		this.audioTag.remove();
		return Promise.resolve(true);
	}

	public async pause(): Promise<void> {
		this.audioTag.pause();
	}

	public async play(): Promise<void> {
		await this.audioTag.play();
	}

}
