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
];
