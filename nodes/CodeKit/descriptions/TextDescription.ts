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
		],
		default: 'comparestring',
	},
];

export const textFields: INodeProperties[] = [];
