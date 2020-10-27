import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { Track } from 'tracksplayer-common';
import { WithLifeCycle } from '../../../core/interfaces/with-lifecycle.interface';

export abstract class Provider implements WithLifeCycle {
	public abstract isConnected: boolean;

	public abstract name: string;

	public abstract icon: IconDefinition;

	public abstract initialize(): Promise<boolean>;

	public abstract destroy(): Promise<boolean>;

	public abstract connect(): Promise<boolean>;

	public abstract async search(q: string): Promise<Array<Track>>;

	public abstract async get(id: string): Promise<Track>;

	public abstract async loadToPlayer(id: Track): Promise<void>;
}
