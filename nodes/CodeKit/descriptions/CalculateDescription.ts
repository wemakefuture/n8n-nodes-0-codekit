import { INodeProperties } from 'n8n-workflow';
import { languages } from '../ressources/languages';

export const calculateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['calculate'],
			},
		},
		options: [
			{
				name: 'BMI',
				value: 'bmi',
				description:
					'Calculates the Body Mass Index and outputs recommended nutrients distribution',
				action: 'Bmi calculator',
			},
			{
				name: 'Geodistance',
				value: 'geodistance',
				description: 'Calculates the geodistance between two addresses or geopoints',
				action: 'Geodistance calculator',
			},
			{
				name: 'Geodistance Version 2',
				value: 'geodistance-v2',
				description: 'Calculates the geodistance between two addresses or geopoints',
				action: 'Geodistance calculator',
			},
		],
		default: 'bmi',
	},
];

export const calculateFields: INodeProperties[] = [
	// calculate: bmi
	{
		displayName: 'Height in Cm',
		name: 'height',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['bmi'],
				resource: ['calculate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Weight in Kg',
		name: 'weight',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['bmi'],
				resource: ['calculate'],
			},
		},
		default: '',
	},
	// calculate: geodistance
	{
		displayName: 'Starting Location',
		name: 'startPoint',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['geodistance', 'geodistance-v2'],
				resource: ['calculate'],
			},
		},
		default: 'Berlin',
	},
	{
		displayName: 'Ending Location',
		name: 'endPoint',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['geodistance', 'geodistance-v2'],
				resource: ['calculate'],
			},
		},
		default: 'Flensburg',
	},
];
