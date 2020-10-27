import { BehaviorSubject } from 'rxjs';
import { Track } from 'tracksplayer-common';
import { WithLifeCycle } from '../../../core/interfaces/with-lifecycle.interface';

export abstract class Player implements WithLifeCycle {
	public track: BehaviorSubject<Track | null> = new BehaviorSubject<Track | null>(null);

	public abstract get position(): number;

	public abstract set position(position: number);

	public abstract get volume(): number;

	public abstract set volume(volume: number);

	public async abstract initialize(): Promise<boolean>;

	public async abstract destroy(): Promise<boolean>;

	public async abstract play(): Promise<void>;

	public async abstract pause(): Promise<void>;
}
