export interface WithLifeCycle {
	initialize(): Promise<boolean>;

	destroy(): Promise<boolean>;
}
