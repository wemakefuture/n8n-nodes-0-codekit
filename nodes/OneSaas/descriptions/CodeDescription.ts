import { INodeProperties } from 'n8n-workflow';

export const codeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['code'],
			},
		},
		options: [
			{
				name: 'Javascript',
				value: 'javascript',
				description: 'Run Javascript via API',
				action: 'Run javascript code',
			},
			{
				name: 'Python',
				value: 'python',
				description: 'Run Python via API',
				action: 'Run python code',
			},
		],
		default: 'javascript',
	},
];

export const codeFields: INodeProperties[] = [
	// code: javascript
	{
		displayName: 'Code',
		name: 'code',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['javascript'],
				resource: ['code'],
			},
		},
		default: '',
		description: 'Your javascript code',
	},
	// code: javascript
	{
		displayName: 'Code',
		name: 'code',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				operation: ['python'],
				resource: ['code'],
			},
		},
		default: '',
		description: 'Your python code',
	},
];
