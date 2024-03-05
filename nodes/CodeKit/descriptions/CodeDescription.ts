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
			{
				name: 'Run JS Scripts Hosted on 0CodeKit',
				value: 'run-js-scripts-hosted-on-0codekit',
				description: 'This operation executes JavaScript scripts hosted on the 0CodeKit platform',
				action: 'Executes java script scripts hosted on the 0 code kit platform',
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

	// code: Run JS Scripts hosted on 0CodeKit

	{
		displayName: 'Code Name or ID',
		name: 'rowKey',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				operation: ['run-js-scripts-hosted-on-0codekit'],
				resource: ['code'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getRowKey',
			multipleValues: false,
		},
		default: '',
		description: 'Select the name of the function created in 0-codekit account. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},

	{
		displayName: 'Code Variables',
		name: 'codeVariablesUi',
		placeholder: 'Add Code Variable',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		options: [
			{
				name: 'codeVariablesValues',
				displayName: 'Code Variable',
				values: [
					{
						displayName: 'Variable Name or ID',
						name: 'property',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getCodeVariablesArray',
							loadOptionsDependsOn: [
											'rowKey',
										],
						},
						default: '',
						description:
							'Name of the variable defined in code editor for selected function. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						required: true,
						description: 'Value of the variable',
					},
				],
			},
		],
	},
];
