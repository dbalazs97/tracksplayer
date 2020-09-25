import { Track } from 'tracksplayer-common';
import { WithLifeCycle } from '../interfaces/with-lifecycle.interface';
import { Player } from '../player/player.class';

export abstract class Provider implements WithLifeCycle {
	public abstract isConnected: boolean;

	public abstract initialize(): Promise<boolean>;

	public abstract destroy(): Promise<boolean>;

	public abstract connect(): Promise<boolean>;

	public abstract async search(q: string): Promise<Array<Track>>;

	public abstract async get(id: string): Promise<Track>;

	public abstract async getPlayer(id: string): Promise<Player>;
}
