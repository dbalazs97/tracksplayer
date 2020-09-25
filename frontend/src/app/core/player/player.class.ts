import { BehaviorSubject } from 'rxjs';
import { Track } from 'tracksplayer-common';
import { WithLifeCycle } from '../interfaces/with-lifecycle.interface';

export abstract class Player implements WithLifeCycle {
	public abstract track: BehaviorSubject<Track>;

	public abstract get position(): number;

	public abstract set position(position: number);

	public abstract get volume(): number;

	public abstract set volume(volume: number);

	public abstract initialize(): Promise<boolean>;

	public abstract destroy(): Promise<boolean>;

	public abstract play(): void;

	public abstract pause(): void;
}
