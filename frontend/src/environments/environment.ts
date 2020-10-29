export const environment = {
	production: false,
	baseUrl: 'http://localhost:4200',
	spotify: {
    redirectUrl: 'http://localhost:4200/spotify-callback',
    clientId: '--REDACTED--',
    clientSecret: '--REDACTED--',
    scopes: 'streaming user-read-email user-read-private',
  },
};
