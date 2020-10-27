export const environment = {
	production: false,
	baseUrl: 'http://localhost:4200',
	spotify: {
		redirectUrl: 'http://localhost:4200/spotify-callback',
		clientId: '513411d909b7420aad3d74fa9a8976b3',
		clientSecret: 'c075bcba088a4cef9c7206e1b37287f2',
		scopes: 'streaming user-read-email user-read-private',
	},
};

import 'zone.js/dist/zone-error';
