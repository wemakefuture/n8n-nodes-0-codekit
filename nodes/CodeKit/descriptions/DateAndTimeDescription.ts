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
			{
				name: 'Detail Period',
				value: 'detailperiod',
				description: 'Get the detail period of a date',
				action: 'Detail period',
			},
			{
				name: 'Holidays',
				value: 'holidays',
				description: 'Get the holidays of a country',
				action: 'Holidays',
			},
			{
				name: 'Is Weekend',
				value: 'isweekend',
				description: 'Check if a date is a weekend',
				action: 'Is weekend',
			},
			{
				name: 'Month',
				value: 'month',
				description: 'Get the month of a date',
				action: 'Month',
			},
			{
				name: 'Switch Time Zone',
				value: 'switchtimezone',
				description: 'Switch the time zone of a date',
				action: 'Switch time zone',
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
		description: 'Date in the calendar',
		displayOptions: {
			show: {
				operation: ['calendarweek', 'month'],
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
		description: 'Year in the calendar',
		displayOptions: {
			show: {
				operation: ['calendarweek', 'month'],
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
				operation: ['calendarweek', 'month'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},

	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'string',
		required: true,
		description: 'Start date to get the detail period from',
		displayOptions: {
			show: {
				operation: ['detailperiod'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'number',
		required: true,
		description: 'Duration to get the detail period from',
		displayOptions: {
			show: {
				operation: ['detailperiod'],
				resource: ['dateandtime'],
			},
		},
		default: 1,
	},

	{
		displayName: 'Year',
		name: 'year',
		type: 'string',
		required: true,
		description: 'Year to get the holidays from',
		displayOptions: {
			show: {
				operation: ['holidays'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Country Code',
		name: 'countryCode',
		type: 'string',
		required: true,
		description: 'Country code to get the holidays from, e.g. DE',
		displayOptions: {
			show: {
				operation: ['holidays'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'State',
		name: 'state',
		type: 'string',
		description: 'State to get the holidays from, e.g. BW',
		displayOptions: {
			show: {
				operation: ['holidays'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},

	{
		displayName: 'Date',
		name: 'date',
		type: 'string',
		required: true,
		description: 'Date to check if it is a weekend',
		displayOptions: {
			show: {
				operation: ['isweekend'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Date Format',
		name: 'dateFormat',
		type: 'string',
		description: 'Format of the date',
		displayOptions: {
			show: {
				operation: ['isweekend', 'month'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Time Zone',
		name: 'timeZone',
		type: 'string',
		description: 'Time zone of the date',
		displayOptions: {
			show: {
				operation: ['isweekend'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},

	{
		displayName: 'Month',
		name: 'month',
		type: 'string',
		description: 'Month in the calendar',
		displayOptions: {
			show: {
				operation: ['month'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Timestamp',
		name: 'timestamp',
		type: 'boolean',
		description: 'Whether to return the timestamp or not',
		displayOptions: {
			show: {
				operation: ['month'],
				resource: ['dateandtime'],
			},
		},
		default: false,
	},
	{
		displayName: 'ISO 8601',
		name: 'iso',
		type: 'boolean',
		description: 'Whether to return the ISO 8601 or not',
		displayOptions: {
			show: {
				operation: ['month'],
				resource: ['dateandtime'],
			},
		},
		default: false,
	},

	{
		displayName: 'Input Time',
		name: 'inputTime',
		type: 'string',
		required: true,
		description: 'Time to switch the time zone from',
		displayOptions: {
			show: {
				operation: ['switchtimezone'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Input Time Zone',
		name: 'inputTimeZone',
		type: 'string',
		required: true,
		description: 'Time zone of the input time',
		displayOptions: {
			show: {
				operation: ['switchtimezone'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Destination Time Zone',
		name: 'destinationTimeZone',
		type: 'string',
		required: true,
		description: 'Time zone of the destination time',
		displayOptions: {
			show: {
				operation: ['switchtimezone'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
	{
		displayName: 'Format Pattern',
		name: 'formatPattern',
		type: 'string',
		description: 'Format pattern of the destination time',
		displayOptions: {
			show: {
				operation: ['switchtimezone'],
				resource: ['dateandtime'],
			},
		},
		default: '',
	},
];
