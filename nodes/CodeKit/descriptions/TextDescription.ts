import { INodeProperties } from 'n8n-workflow';

export const textOperations: INodeProperties[] = [
	{
		displayName: 'Text',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['text'],
			},
		},
		options: [
			{
				name: 'Compare String',
				value: 'comparestring',
				description: 'Compare two strings',
				action: 'Compare string',
			},
			{
				name: 'Contains',
				value: 'contains',
				description: 'Check if a string contains another string',
				action: 'Contains',
			},
			{
				name: 'Extractor',
				value: 'extractor',
				description: 'Extract data from a string',
				action: 'Extractor',
			},
			{
				name: 'Regex',
				value: 'regex',
				description: 'Evaluate text against a regex',
				action: 'Regex',
			},
		],
		default: 'comparestring',
	},
];

export const textFields: INodeProperties[] = [
	{
		displayName: 'First String',
		name: 'string1',
		type: 'string',
		description: 'First string to compare',
		required: true,
		displayOptions: {
			show: {
				operation: ['comparestring'],
				resource: ['text'],
			},
		},
		default: '',
	},
	{
		displayName: 'Second String',
		name: 'string2',
		type: 'string',
		description: 'Second string to compare',
		required: true,
		displayOptions: {
			show: {
				operation: ['comparestring'],
				resource: ['text'],
			},
		},
		default: '',
	},
	{
		displayName: 'Algorithm',
		name: 'algorithm',
		type: 'string',
		description: 'Algorithm to use to compare the strings',
		displayOptions: {
			show: {
				operation: ['comparestring'],
				resource: ['text'],
			},
		},
		default: '',
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		description: 'Text to check if it contains another text',
		required: true,
		displayOptions: {
			show: {
				operation: ['contains'],
				resource: ['text'],
			},
		},
		default: '',
	},
	{
		displayName: 'Keyword',
		name: 'text',
		type: 'string',
		description: 'Keyword to check if it is contained in the text',
		displayOptions: {
			show: {
				operation: ['contains'],
				resource: ['text'],
			},
		},
		default: '',
	},
	{
		displayName: 'Keyword List',
		name: 'text',
		type: 'string',
		description:
			'List of keywords to check, separated by commas. e.g. "keyword1,keyword2,keyword3".',
		displayOptions: {
			show: {
				operation: ['contains'],
				resource: ['text'],
			},
		},
		default: '',
	},
	{
		displayName: 'Case Sensitive',
		name: 'caseSensitive',
		type: 'boolean',
		description: 'Whether to check case sensitive or not',
		displayOptions: {
			show: {
				operation: ['contains'],
				resource: ['text'],
			},
		},
		default: false,
	},
	{
		displayName: 'Only Complete Words',
		name: 'onlyCompleteWords',
		type: 'boolean',
		description: 'Whether to check only complete words or not',
		displayOptions: {
			show: {
				operation: ['contains'],
				resource: ['text'],
			},
		},
		default: false,
	},

	{
		displayName: 'Start String',
		name: 'start',
		type: 'string',
		required: true,
		description: 'String to start the extraction',
		displayOptions: {
			show: {
				operation: ['extractor'],
				resource: ['text'],
			},
		},
		default: '',
	},
	{
		displayName: 'End String',
		name: 'end',
		type: 'string',
		required: true,
		description: 'String to end the extraction',
		displayOptions: {
			show: {
				operation: ['extractor'],
				resource: ['text'],
			},
		},
		default: '',
	},
	{
		displayName: 'Base String',
		name: 'body',
		type: 'string',
		required: true,
		description: 'String to extract from',
		displayOptions: {
			show: {
				operation: ['extractor'],
				resource: ['text'],
			},
		},
		default: '',
	},
	{
		displayName: 'Greedy',
		name: 'greedy',
		type: 'boolean',
		description: 'Whether to extract the first or last match',
		displayOptions: {
			show: {
				operation: ['extractor'],
				resource: ['text'],
			},
		},
		default: false,
	},
	// regex
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		description: 'The text to be evaluated',
		displayOptions: {
			show: {
				operation: ['extractor'],
				resource: ['text'],
			},
		},
		default: '',
	},
	{
		displayName: 'Expression',
		name: 'expression',
		type: 'string',
		description: 'The regular expression to evaluate against the text',
		displayOptions: {
			show: {
				operation: ['extractor'],
				resource: ['text'],
			},
		},
		default: '',
	},
];
