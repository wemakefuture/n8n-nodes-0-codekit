import { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'User',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Get Available IP Addresses',
				value: 'getipaddress',
				description: 'Get IP addresses that are available to use',
				action: 'Get available IP addresses',
			},
			{
				name: 'Retrieve User Credits',
				value: 'retrievecredits',
				description: 'Retrieve the credits of a user',
				action: 'Retrieve user credits',
			},
		],
		default: 'retrievecredits',
	},
];

export const userFields: INodeProperties[] = [];
