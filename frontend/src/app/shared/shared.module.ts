import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeriodicallyPipe } from './pipes/periodically.pipe';

@NgModule({
	declarations: [ PeriodicallyPipe ],
	imports: [
		CommonModule,
	],
	exports: [
		PeriodicallyPipe,
	],
})
export class SharedModule {
}
