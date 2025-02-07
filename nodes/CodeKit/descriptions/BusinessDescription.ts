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
				name: 'Check Free Email',
				value: 'isFreeMail',
				description: 'Checks if an email is a free email',
				action: 'Check free email',
			},
			{
				name: 'Embed Factur-X/Zugferd XML Into a PDF File',
				value: 'facturxEmbed',
				description: 'Embedded existing XML Invoice into a PDF File',
				action: 'Embed factur x zugferd xml into a pdf file',
			},
			{
				name: 'Lookup VAT Rates',
				value: 'lookupvatrates',
				description: 'Lookup VAT Rates of different countries',
				action: 'Lookup VAT rates',
			},
			{
				name: 'Validate Phonenumber',
				value: 'validatePhonenumber',
				description:
					'Validates the phone number if it is either a possible or existing phone number',
				action: 'Validate phone number',
			},
			{
				name: 'Validate Zugferd/Factur-X XML',
				value: 'facturxValidate',
				description:'Validated Factur-X/Zugferd XML invoice according to the specification (level EN16931)',
				action: 'Validate factur x zugferd xml',
			},
			{
				name: 'Verify a Domain',
				value: 'verifyDomain',
				description: 'Verifies a top-level- or subdomain',
				action: 'Verify a domain',
			},
			{
				name: 'Verify BIC',
				value: 'verifyBIC',
				description: 'Verifies a banking BIC',
				action: 'Verify BIC',
			},
			{
				name: 'Verify Geo Location',
				value: 'verifyGeoLocation',
				description: 'Verifies a Geo Location',
				action: 'Verify geo location',
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
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				operation: ['isFreemail'],
				resource: ['business'],
			},
		},
		default: '',
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['verifyGeoLocation'],
				resource: ['business'],
			},
		},
		default: '',
	},
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
	// business: validate/phonenumber
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['validatePhonenumber'],
				resource: ['business'],
			},
		},
		default: '',
		placeholder: '+99 123456789',
	},
	{
		displayName: 'Country Code',
		name: 'countryCode',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['validatePhonenumber'],
				resource: ['business'],
			},
		},
		default: '',
		placeholder: 'GB',
	},
	// business: facturxEmbed
	{
		displayName: 'Url',
		name: 'url',
		type: 'string',
		description: "The URL of the PDF file that shall be embedded with the Factur-X/Zugferd XML invoice",
		displayOptions: {
			show: {
				operation: ['facturxEmbed', 'facturxValidate'],
				resource: ['business'],
			},
		},
		default: '',
	},
	{
		displayName: 'Buffer',
		name: 'buffer',
		type: 'string',
		description: 'The Buffer of the PDF file that shall be embedded with the Factur-X/Zugferd XML invoice',
		displayOptions: {
			show: {
				operation: ['facturxEmbed', , 'facturxValidate'],
				resource: ['business'],
			},
		},
		default: '',
	},
	{
		displayName: 'XML',
		name: 'xml',
		type: 'string',
		required: true,
		description: 'The Factur-X/Zugferd XML invoice that shall be embedded',
		displayOptions: {
			show: {
				operation: ['facturxEmbed'],
				resource: ['business'],
			},
		},
		default: '',
	},
	{
		displayName: 'Get File as URL',
		name: 'getAsUrl',
		type: 'boolean',
		description: 'Whether the file should be returned as URL or as binary data',
		displayOptions: {
			show: {
				operation: ['facturxEmbed'],
				resource: ['business'],
			},
		},
		default: true,
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		description: 'The name of the file',
		displayOptions: {
			show: {
				operation: ['facturxEmbed'],
				resource: ['business'],
			},
		},
		default: '',
	},

] as INodeProperties[];