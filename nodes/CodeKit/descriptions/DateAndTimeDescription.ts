import { INodeProperties } from 'n8n-workflow';

export const dateAndTimeOperations: INodeProperties[] = [
	{
		displayName: 'Date and Time',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dateandtime'],
			},
		},
		options: [
			{
				name: 'Calender Week',
				value: 'calendarweek',
				description: 'Get the calender week of a date',
				action: 'Calender week',
			},
		],
		default: 'calendarweek',
	},
];

export const dateAndTimeFields: INodeProperties[] = [
	{
		displayName: 'Date',
		name: 'date',
		type: 'string',
		description: 'Date to get the calender week from',
		displayOptions: {
			show: {
				operation: ['calendarweek'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Unix Timestamp',
		name: 'unixTimestamp',
		type: 'number',
		description: 'Unix timestamp to get the calender week from',
		displayOptions: {
			show: {
				operation: ['calendarweek'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Year',
		name: 'year',
		type: 'string',
		description: 'Year to get the calender week from',
		displayOptions: {
			show: {
				operation: ['calendarweek'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Week Number',
		name: 'weekNumber',
		type: 'number',
		description: 'Week number to get the calender week from',
		displayOptions: {
			show: {
				operation: ['calendarweek'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Output Format',
		name: 'outputFormat',
		type: 'string',
		description: 'How the data should be returned',
		displayOptions: {
			show: {
				operation: ['calendarweek'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
];
