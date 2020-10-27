import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Player } from '../../playback/services/player/player.class';

@Pipe({ name: 'periodically', pure: true })
export class PeriodicallyPipe implements PipeTransform {
	private interval: number = 0;

	public transform(player: Player | null, property: keyof Player): Observable<any> {
		return new Observable(subscriber => {
			this.interval = setInterval(() => subscriber.next(player?.[property] ?? 0), 500);
		}).pipe(finalize(() => clearInterval(this.interval)));
	}
}
