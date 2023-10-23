import { INodeProperties } from 'n8n-workflow';
import { currencies } from '../ressources/currencies';
import { languages } from '../ressources/languages';

export const convertOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['convert'],
			},
		},
		options: [
			{
				name: 'Convert a CSV to Array',
				value: 'csvtoarray',
				description: 'Takes a CSV string and converts it to an array',
				action: 'Convert a csv to array',
			},
			{
				name: 'Convert a CSV to JSON',
				value: 'csvtojson',
				description: 'Takes a CSV string and converts it to a valid JSON',
				action: 'Convert a CSV to JSON',
			},
			{
				name: 'Convert Currency',
				value: 'currency',
				description: 'Converts a currency into another on specific dates',
				action: 'Convert currencys',
			},
			{
				name: 'IP to Geo',
				value: 'iptogeo',
				description: 'Gets the geolocation of an IP address',
				action: 'Ip to geo converter',
			},
			{
				name: 'Message to JSON',
				value: 'msgtojson',
				description: 'Converts a message to a JSON object',
				action: 'Message to JSON',
			},
			{
				name: 'Nation ISO Switch',
				value: 'nationiso',
				description: 'Get the Nation by Country Code ISO or reverse',
				action: 'Nation ISO switch',
			},
		],
		default: 'iptogeo',
	},
];

export const convertFields: INodeProperties[] = [
	// convert: iptogeo
	{
		displayName: 'IPV4 or IPV6',
		name: 'ip',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['iptogeo'],
				resource: ['convert'],
			},
		},
		default: '',
		description: 'Text you want to analyse',
	},
	// convert: nationiso
	{
		displayName: 'Operation',
		name: 'nationisoop',
		type: 'options',
		options: [
			{
				name: 'Nation to ISO',
				value: 'nation',
			},
			{
				name: 'ISO to Nation',
				value: 'iso',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['nationiso'],
				resource: ['convert'],
			},
		},
		default: 'nation',
	},
	{
		displayName: 'Nation Value',
		name: 'nation',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['nationiso'],
				resource: ['convert'],
				nationisoop: ['nation'],
			},
		},
		default: '',
		description: 'Use the full name of the Nation in English language',
	},
	{
		displayName: 'ISO Value',
		name: 'iso',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['nationiso'],
				resource: ['convert'],
				nationisoop: ['iso'],
			},
		},
		default: '',
		description: 'Use the ISO-Alpha-3166 of the Nation (i.e. DE).',
	},
	// convert: currency
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 0.01,
			numberPrecision: 2,
		},
		displayOptions: {
			show: {
				operation: ['currency'],
				resource: ['convert'],
			},
		},
		default: 10.0,
	},
	{
		displayName: 'Source Currency',
		name: 'sourceCurrency',
		type: 'options',
		options: currencies,
		required: true,
		displayOptions: {
			show: {
				operation: ['currency'],
				resource: ['convert'],
			},
		},
		default: '',
	},
	{
		displayName: 'Target Currency',
		name: 'targetCurrency',
		type: 'options',
		options: currencies,
		required: true,
		displayOptions: {
			show: {
				operation: ['currency'],
				resource: ['convert'],
			},
		},
		default: '',
	},
	{
		displayName: 'Date Format',
		name: 'dateFormat',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['currency'],
				resource: ['convert'],
			},
		},
		default: '',
		description: 'Date format in which the date should be returned e.g. YYYY-MM-DD',
	},
	// convert: csvtojson
	{
		displayName: 'CSV',
		name: 'csv',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				operation: ['csvtojson', 'csvtoarray'],
				resource: ['convert'],
			},
		},
		default: '',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				operation: ['csvtojson'],
				resource: ['convert'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Delimiter',
				name: 'delimiter',
				type: 'string',
				default: 'auto',
				description:
					'Delimiter used for seperating columns. Leave empty if delimiter is unknown in advance, in this case, delimiter will be auto-detected (by best attempt).',
			},
			{
				displayName: 'Trim CSV',
				name: 'trim',
				type: 'boolean',
				default: true,
				description:
					'Whether to trim off spaces surrounding column content. e.g. " content " will be trimmed to "content".',
			},
			{
				displayName: 'CSV Headers',
				name: 'noheader',
				type: 'boolean',
				default: false,
				description:
					'Whether to indicate that the csv data has no header row and first row is data row',
			},
			{
				displayName: 'Ignore Empty Values',
				name: 'ignoreEmpty',
				type: 'boolean',
				default: true,
				description:
					'Whether to ignore the empty value in CSV columns. If a column value is not given, set this to true to skip them.',
			},
		],
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				operation: ['csvtoarray'],
				resource: ['convert'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Delimiter',
				name: 'delimiter',
				type: 'string',
				default: ';',
				description:
					'Delimiter used for seperating columns. Leave empty if delimiter is unknown in advance, in this case, delimiter will be auto-detected (by best attempt).',
			},
			{
				displayName: 'Trim CSV',
				name: 'omitFirstRow',
				type: 'boolean',
				default: false,
				description: 'Whether to omit the first row of the CSV file',
			},
		],
	},
	{
		displayName: 'Type of Message',
		name: 'urlbuffertype',
		type: 'options',
		options: [
			{
				name: 'URL',
				value: 'url',
			},
			{
				name: 'Buffer',
				value: 'buffer',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['msgtojson'],
				resource: ['convert'],
			},
		},
		default: 'url',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['msgtojson'],
				resource: ['convert'],
				urlbuffertype: ['url'],
			},
		},
		default: '',
		description: 'URL of the message you want to convert',
	},
	{
		displayName: 'Buffer',
		name: 'buffer',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['msgtojson'],
				resource: ['convert'],
				urlbuffertype: ['buffer'],
			},
		},
		default: '',
		description: 'Buffer of the message you want to convert',
	},
];
