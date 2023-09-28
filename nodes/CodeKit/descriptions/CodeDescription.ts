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
			{
				name: 'ASYNC Python Script Advanced (Complex Script)',
				value: 'async-python',
				description: 'Run async python via API',
				action: 'Runs async python via api',
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
	// code: python
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

	// code: asyncPython

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
				operation: ['async-python'],
				resource: ['code'],
			},
		},
		default: '',
		description: 'A string of the code which should be executed asynchronously. Please notice that this endpoint unlike the other code execution endpoint does require import statements in the code and does not require a \'result\' variable. In order to visualize data in the response just use a print statement, you can parse the printed JSON output at the receiving webhook.',
	},

	{
		displayName: 'Requirements',
		name: 'requirementsUI',
		placeholder: 'Add Dependency',
		type: 'fixedCollection',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		description: 'An array with the dependencies of the code. Eg. [\'selenium\', \'requests\', \'numpy\'].',
		options: [
			{
				name: 'requirementsValues',
				displayName: 'Requirements',
				values: [
					{
						displayName: 'Dependency Name',
						name: 'name',
						type: 'string',
						default: '',
					},
				],
			},
		],
		displayOptions: {
			show: {
				operation: ['async-python'],
				resource: ['code'],
			},
		},
	},

	{
		displayName: 'Send To',
		name: 'sendTo',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['async-python'],
				resource: ['code'],
			},
		},
		default: '',
		description: 'Webhook URL where the result will be sent to after finishing the execution',
	},
];
