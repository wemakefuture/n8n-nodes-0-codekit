import { INodeProperties } from 'n8n-workflow';

export const businessOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['business'],
			},
		},
		options: [
			{
				name: 'Lookup VAT Rates',
				value: 'lookupvatrates',
				description: 'Lookup VAT Rates of different countries',
				action: 'Lookup VAT rates',
			},
			{
				name: 'Verify a Domain',
				value: 'verifyDomain',
				description: 'Verifies a top-level- or subdomain',
				action: 'Verify a domain',
			},
			{
				name: 'Verify an Email and Correct It',
				value: 'verifyEmail',
				description:
					'Validates an email address matching it with standards and eventually corrects it',
				action: 'Verify an email and correct it',
			},
			{
				name: 'Verify BIC',
				value: 'verifyBIC',
				description: 'Verifies a banking BIC',
				action: 'Verify BIC',
			},
			{
				name: 'Verify IBAN',
				value: 'verifyIBAN',
				description: 'Verifies a European banking-IBAN',
				action: 'Verify IBAN',
			},
			{
				name: 'Verify VAT ID',
				value: 'verifyVAT',
				description: 'Checks if VAT number and its ID is valid',
				action: 'Verify VAT ID',
			},
		],
		default: 'lookupvatrates',
	},
];

export const businessFields = [
	// business: lookupVat
	{
		displayName: 'Country Code',
		name: 'countryCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['lookupVat'],
				resource: ['business'],
			},
		},
		default: '',
	},
	// business: verifyVAT
	{
		name: 'vatFormat',
		type: 'options',
		options: [
			{
				name: 'Via VAT ID',
				value: 'vatId',
			},
			{
				name: 'Via Country Code and ID',
				value: 'ccid',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['verifyVAT'],
				resource: ['business'],
			},
		},
		default: 'vatId',
	},
	{
		displayName: 'VAT ID',
		name: 'vatId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['verifyVAT'],
				resource: ['business'],
				vatFormat: ['vatId'],
			},
		},
		default: '',
	},
	{
		displayName: 'Country Code',
		name: 'countryCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['verifyVAT'],
				resource: ['business'],
				vatFormat: ['ccid'],
			},
		},
		default: '',
	},
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['verifyVAT'],
				resource: ['business'],
				vatFormat: ['ccid'],
			},
		},
		default: '',
	},
	// business: verifyDomain
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['verifyDomain'],
				resource: ['business'],
			},
		},
		default: '',
	},
	// business: verifyEmail
	{
		displayName: 'Domain',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				operation: ['verifyEmail'],
				resource: ['business'],
			},
		},
		default: '',
	},
	// business: verifyIBAN
	{
		displayName: 'IBAN',
		name: 'iban',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['verifyIBAN'],
				resource: ['business'],
			},
		},
		default: '',
	},
	// business: verifyBIC
	{
		displayName: 'BIC',
		name: 'bic',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['verifyBIC'],
				resource: ['business'],
			},
		},
		default: '',
	},
] as INodeProperties[];
