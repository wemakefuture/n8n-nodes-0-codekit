import { INodeProperties } from 'n8n-workflow';

export const generateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['generate'],
			},
		},
		options: [
			{
				name: 'City',
				value: 'city',
				description: 'Get a random City',
				action: 'Generate a random city',
			},
			{
				name: 'Color',
				value: 'color',
				description: 'Get a random Color',
				action: 'Generate a random color',
			},
			{
				name: 'Decode JSON Web Token',
				value: 'jsonwebtoken-decode',
				description: 'Decode a JSON Web Token',
				action: 'Decode a json web token',
			},
			{
				name: 'Encode JSON Web Token',
				value: 'jsonwebtoken-encode',
				description: 'Encode a JSON Web Token',
				action: 'Encode a json web token',
			},
			{
				name: 'HTML Scraping',
				value: 'html-scrape',
				description: 'Scrape HTML from a URL',
				action: 'Scrape HTML from a URL',
			},
			{
				name: 'Mock Data User',
				value: 'mockdata-user',
				description: 'Generate mock data for a user',
				action: 'Generate mock data for a user',
			},
			{
				name: 'Name',
				value: 'name',
				description: 'Get random Name',
				action: 'Generate a random name',
			},
			{
				name: 'Number',
				value: 'number',
				description: 'Generate a random Number',
				action: 'Generate a random number',
			},
			{
				name: 'Picture',
				value: 'picture',
				description: 'Generate a random Picture',
				action: 'Generate a random picture',
			},
			{
				name: 'QR Code',
				value: 'qrcode',
				description: 'Encode or decode a QR code',
				action: 'Generate a QR code',
			},
			{
				name: 'Shortened URL',
				value: 'shortenedUrl',
				description: 'Create, delete or update shortened URLs',
				action: 'Generate a shortened url',
			},
			{
				name: 'String',
				value: 'string',
				description: 'Generate a random String',
				action: 'Generate a random string',
			},
		],
		default: 'city',
	},
];

export const generateFields: INodeProperties[] = [
	// generate: city
	// generate: number
	{
		displayName: 'Range Start',
		name: 'rangeStart',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['number'],
				resource: ['generate'],
			},
		},
		default: 1,
		description: 'The number will be bigger than or equal to the range start',
	},
	{
		displayName: 'Range End',
		name: 'rangeEnd',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['number'],
				resource: ['generate'],
			},
		},
		default: 10,
		description: 'The number will be smaller than or equal to the range end',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				operation: ['number'],
				resource: ['generate'],
			},
		},
		options: [
			{
				name: 'Integer',
				value: 'integer',
			},
			{
				name: 'Decimal',
				value: 'decimal',
			},
		],
		default: 'integer',
		description: 'Integer or Decimal',
	},
	// generate: name
	// generate: string
	{
		displayName: 'Length',
		name: 'length',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['string'],
				resource: ['generate'],
			},
		},
		default: 10,
		description: 'Define how many chars your string should have',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['string'],
				resource: ['generate'],
			},
		},
		options: [
			{
				name: 'Only Numbers',
				value: 1,
			},
			{
				name: 'Capital Letters + Lowercase Letters',
				value: 2,
			},
			{
				name: 'Lowercase Letters',
				value: 3,
			},
			{
				name: 'Capital Letters',
				value: 4,
			},
			{
				name: 'Numbers + Lowercase Letters',
				value: 5,
			},
			{
				name: 'Numbers + Capital Letters',
				value: 6,
			},
			{
				name: 'Numbers + Capital Letters + Lowercase Letters + Special Characters',
				value: 7,
			},
		],
		default: 1,
		description: 'Characters to include in your string',
	},
	// generate: qrcode
	{
		displayName: 'Operation',
		name: 'qrcodeop',
		type: 'options',
		options: [
			{
				name: 'Encode Data to Qr Code',
				value: 'encode',
			},
			{
				name: 'Decode a Qr Code',
				value: 'decode',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['qrcode'],
				resource: ['generate'],
			},
		},
		default: 'encode',
	},
	{
		displayName: 'Data You Want to Encode',
		name: 'data',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['qrcode'],
				resource: ['generate'],
				qrcodeop: ['encode'],
			},
		},
		default: '',
	},
	{
		displayName: 'URL to QR Code Image',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['qrcode'],
				resource: ['generate'],
				qrcodeop: ['decode'],
			},
		},
		default: '',
	},
	// generate: shortendurl
	{
		displayName: 'Operation',
		name: 'shortenedurlop',
		type: 'options',
		options: [
			{
				name: 'Add New Shortened Url',
				value: 'add',
			},
			{
				name: 'Delete Shortened Url',
				value: 'del',
			},
			{
				name: 'Update Shortened Url',
				value: 'put',
				description: 'Update the destination of a shortened URL',
			},
			{
				name: 'List All Your Shortened Urls',
				value: 'list',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['shortenedUrl'],
				resource: ['generate'],
			},
		},
		default: 'add',
	},
	// generate: shortendurl: add
	{
		displayName: 'Destination of the Shortened Url',
		name: 'destination',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['schortenedUrl'],
				resource: ['generate'],
				shortenedurlop: ['add', 'put'],
			},
		},
		default: '',
	},
	{
		displayName: 'Optional Custom Identifier',
		name: 'custom',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['shortenedUrl'],
				resource: ['generate'],
				shortenedurlop: ['add'],
			},
		},
		default: '',
	},
	// generate: shortendurl: del
	{
		displayName: 'Delete a Shortened Url',
		name: 'identifier',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['shortenedUrl'],
				resource: ['generate'],
				shortenedurlop: ['del', 'put'],
			},
		},
		default: '',
	},
	// generate: shortendurl: put
	{
		displayName: 'Identifier',
		name: 'identifier',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['shortenedUrl'],
				resource: ['generate'],
				shortenedurlop: ['put'],
			},
		},
		default: '',
		description: 'Identifier of the shortened URL you want ot edit or delete',
	},
	// generate: shortendurl: list

	{
		displayName: 'Hue',
		name: 'hue',
		type: 'string',
		description: 'Hue of the color',
		displayOptions: {
			show: {
				operation: ['color'],
				resource: ['generate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Luminosity',
		name: 'luminosity',
		type: 'string',
		description: 'Luminosity of the color, must be e.g light, bright, or dark',
		displayOptions: {
			show: {
				operation: ['color'],
				resource: ['generate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		description: 'Count of the colors',
		displayOptions: {
			show: {
				operation: ['color'],
				resource: ['generate'],
			},
		},
		default: 1,
	},
	{
		displayName: 'Seed',
		name: 'seed',
		type: 'string',
		description: 'Seed of the color',
		displayOptions: {
			show: {
				operation: ['color'],
				resource: ['generate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Format',
		name: 'format',
		type: 'string',
		description: 'Format of the color, must be e.g rgb, rgba, hsl, hsla, or hex',
		displayOptions: {
			show: {
				operation: ['color'],
				resource: ['generate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Alpha',
		name: 'alpha',
		type: 'number',
		description: 'Alpha of the color',
		displayOptions: {
			show: {
				operation: ['color'],
				resource: ['generate'],
			},
		},
		default: 1,
	},

	{
		displayName: 'Url',
		name: 'url',
		type: 'string',
		required: true,
		description: 'URL to scrape',
		displayOptions: {
			show: {
				operation: ['html-scrape'],
				resource: ['generate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Text Only',
		name: 'textOnly',
		type: 'boolean',
		description: 'Whether to return only the text of the HTML',
		displayOptions: {
			show: {
				operation: ['html-scrape'],
				resource: ['generate'],
			},
		},
		default: false,
	},

	{
		displayName: 'Data',
		name: 'data',
		type: 'string',
		required: true,
		description: 'Data to encode',
		displayOptions: {
			show: {
				operation: ['jsonwebtoken-encode'],
				resource: ['generate'],
			},
		},
		default: '',
	},
	// generate/jsonwebtoken/decode
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		required: true,
		description: 'Token to decode',
		displayOptions: {
			show: {
				operation: ['jsonwebtoken-decode'],
				resource: ['generate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Verify',
		name: 'verify',
		type: 'boolean',
		description: 'Whether to verify the token',
		displayOptions: {
			show: {
				operation: ['jsonwebtoken-decode'],
				resource: ['generate'],
			},
		},
		default: false,
	},
	{
		displayName: 'Secret',
		name: 'secret',
		type: 'string',
		description: 'Secret to verify the token',
		displayOptions: {
			show: {
				operation: ['jsonwebtoken-decode'],
				resource: ['generate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Secret',
		name: 'secret',
		type: 'string',
		required: true,
		description: 'Secret to verify the token',
		displayOptions: {
			show: {
				operation: ['jsonwebtoken-encode'],
				resource: ['generate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'string',
		description: 'Options to the token',
		displayOptions: {
			show: {
				operation: ['jsonwebtoken-decode', 'jsonwebtoken-encode'],
				resource: ['generate'],
			},
		},
		default: '',
	},
	// generate/jsonwebtoken/encode

	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		description: 'Amount of users to generate',
		displayOptions: {
			show: {
				operation: ['mockdata-user'],
				resource: ['generate'],
			},
		},
		default: 1,
	},
	{
		displayName: 'Email Domain',
		name: 'emailRequired',
		type: 'boolean',
		description: 'Whether to generate an email address',
		displayOptions: {
			show: {
				operation: ['mockdata-user'],
				resource: ['generate'],
			},
		},
		default: false,
	},
	{
		displayName: 'Avatar',
		name: 'avatarRequired',
		type: 'boolean',
		description: 'Whether to generate an avatar',
		displayOptions: {
			show: {
				operation: ['mockdata-user'],
				resource: ['generate'],
			},
		},
		default: false,
	},
	{
		displayName: 'Password',
		name: 'passwordRequired',
		type: 'boolean',
		description: 'Whether to generate a password',
		displayOptions: {
			show: {
				operation: ['mockdata-user'],
				resource: ['generate'],
			},
		},
		default: false,
	},
	{
		displayName: 'Birth Date',
		name: 'birthDateRequired',
		type: 'boolean',
		description: 'Whether to generate a birth date',
		displayOptions: {
			show: {
				operation: ['mockdata-user'],
				resource: ['generate'],
			},
		},
		default: false,
	},
	{
		displayName: 'Username',
		name: 'usernameRequired',
		type: 'boolean',
		description: 'Whether to generate a username',
		displayOptions: {
			show: {
				operation: ['mockdata-user'],
				resource: ['generate'],
			},
		},
		default: false,
	},
	{
		displayName: 'Address',
		name: 'addressRequired',
		type: 'boolean',
		description: 'Whether to generate an address',
		displayOptions: {
			show: {
				operation: ['mockdata-user'],
				resource: ['generate'],
			},
		},
		default: false,
	},
	{
		displayName: 'Phone Number',
		name: 'phoneRequired',
		type: 'boolean',
		description: 'Whether to generate an phone number',
		displayOptions: {
			show: {
				operation: ['mockdata-user'],
				resource: ['generate'],
			},
		},
		default: false,
	},
	{
		displayName: 'Created	At',
		name: 'createdAtRequired',
		type: 'boolean',
		description: 'Whether to generate an created at date',
		displayOptions: {
			show: {
				operation: ['mockdata-user'],
				resource: ['generate'],
			},
		},
		default: false,
	},
	{
		displayName: 'Balance',
		name: 'balanceRequired',
		type: 'boolean',
		description: 'Whether to generate a balance',
		displayOptions: {
			show: {
				operation: ['mockdata-user'],
				resource: ['generate'],
			},
		},
		default: false,
	},
	{
		displayName: 'Keyword',
		name: 'keyword',
		type: 'string',
		description: 'Keyword to generate a picture',
		displayOptions: {
			show: {
				operation: ['picture'],
				resource: ['generate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Get File as URL',
		name: 'getAsUrl',
		type: 'boolean',
		description: 'Whether to get the picture as an URL',
		displayOptions: {
			show: {
				operation: ['picture'],
				resource: ['generate'],
			},
		},
		default: true,
	},
];