import { INodeProperties } from 'n8n-workflow';

export const pdfOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['pdf'],
			},
		},
		options: [
			{
				name: 'Compress PDF',
				value: 'compress',
				description: 'Compress a PDF file',
				action: 'Compress pdf a pdf',
			},
			{
				name: 'Count PDF Pages',
				value: 'count',
				description: 'Count number of pages in a PDF file',
				action: 'Count pdf pages a pdf',
			},
			{
				name: 'Docx to PDF',
				value: 'docx-to-pdf',
				description: 'Converts a docx file to a pdf file',
				action: 'Docx to pdf a pdf',
			},
			{
				name: 'Get PDF Info Metadata',
				value: 'getinfometadata',
				description: 'Get Info Metadata of a PDF file',
				action: 'Get pdf info metadata a pdf',
			},
			{
				name: 'HTML to PDF',
				value: 'html',
				description: 'Converts HTML Code or a URL to PDF with options',
				action: 'Html to pdf a pdf',
			},
			{
				name: 'PDF Merge',
				value: 'merge',
				description: 'Merge multiple pdf files to a single pdf',
				action: 'PDF Merge a pdf',
			},
			{
				name: 'PDF to Base64',
				value: 'base64',
				description: 'Converts a PDF file to a base64 string',
				action: 'Pdf to base64 a pdf',
			},
			{
				name: 'PDF to Image',
				value: 'pdf-to-image',
				description: 'Converts a PDF file to an image',
				action: 'Pdf to image a pdf',
			},
			{
				name: 'Split PDF Files',
				value: 'split',
				description: 'Split a PDF file into multiple files',
				action: 'Split pdf files a pdf',
			},
		],
		default: 'count',
	},
];

export const pdfFields: INodeProperties[] = [
	{
		displayName: 'Pdf',
		name: 'pdf',
		type: 'string',
		description: 'PDF can be public URL or Buffer String',
		required: true,
		displayOptions: {
			show: {
				operation: ['getinfometadata', 'base64'],
				resource: ['pdf'],
			},
		},
		default: '',
	},
	{
		displayName: 'Buffer',
		name: 'buffer',
		type: 'string',
		description: 'Buffer of the PDF',
		required: true,
		displayOptions: {
			show: {
				operation: ['docx-to-pdf'],
				resource: ['pdf'],
			},
		},
		default: '',
	},
	{
		displayName: 'Filename',
		name: 'filename',
		type: 'string',
		description: 'Filename of the PDF',
		displayOptions: {
			show: {
				operation: ['getinfometadata', 'base64', 'compress', 'docx-to-pdf', 'pdf-to-image'],
				resource: ['pdf'],
			},
		},
		default: '',
	},
	// pdf: count
	{
		displayName: 'URL or Binary Data',
		name: 'datatype',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				operation: ['count', 'split', 'compress', 'pdf-to-image'],
				resource: ['pdf'],
			},
		},
		options: [
			{
				name: 'URL',
				value: 'url',
			},
			{
				name: 'Binary Data',
				value: 'buffer',
			},
		],
		default: 'url',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		description: 'Public URL of the PDF file',
		displayOptions: {
			show: {
				operation: ['count', 'split', 'compress', 'pdf-to-image'],
				resource: ['pdf'],
				datatype: ['url'],
			},
		},
		default: '',
	},
	{
		displayName: 'Binary Data',
		name: 'buffer',
		type: 'string',
		required: true,
		description: 'Buffer of the PDF',
		displayOptions: {
			show: {
				operation: ['count', 'split', 'compress', 'pdf-to-image'],
				resource: ['pdf'],
				datatype: ['buffer'],
			},
		},
		default: '',
	},
	// pdf: split
	{
		displayName: 'How Do You Want to Split the PDF?',
		name: 'splitmethod',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				operation: ['split'],
				resource: ['pdf'],
			},
		},
		options: [
			{
				name: 'Page Ranges',
				value: 'pageranges',
			},
			{
				name: 'Interval',
				value: 'interval',
			},
		],
		default: 'pageranges',
		description: 'Either split by page ranges or interval',
	},
	{
		displayName: 'Page Ranges',
		name: 'pages',
		type: 'fixedCollection',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['split'],
				resource: ['pdf'],
				splitmethod: ['pageranges'],
			},
		},
		description: 'Specify the page ranges to split the pdf into',
		options: [
			{
				displayName: 'Page Range',
				name: 'range',
				values: [
					{
						displayName: 'Start Page',
						name: 'startPage',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'End Page',
						name: 'endPage',
						type: 'number',
						default: 0,
					},
				],
			},
		],
	},
	{
		displayName: 'Interval',
		name: 'interval',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['split'],
				resource: ['pdf'],
				splitmethod: ['interval'],
			},
		},
		default: 1,
	},
	// pdf: merge
	{
		displayName: 'Files to Merge',
		name: 'files',
		type: 'collection',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['merge'],
				resource: ['pdf'],
			},
		},
		options: [
			{
				displayName: 'Files',
				name: 'files',
				values: [
					{
						displayName: 'File Url or Binary Data',
						name: 'filetype',
						type: 'string',
						default: '',
						description: 'URL of the PDF file or the raw binary data',
					},
					{
						displayName: 'Page Ranges',
						name: 'pages',
						type: 'fixedCollection',
						default: {},
						typeOptions: {
							multipleValues: true,
						},
						description: 'Specify the page ranges to split the pdf into',
						options: [
							{
								displayName: 'Page Ranges',
								name: 'range',
								values: [
									{
										displayName: 'Start Page',
										name: 'startPage',
										type: 'number',
										default: 0,
									},
									{
										displayName: 'End Page',
										name: 'endPage',
										type: 'number',
										default: 0,
									},
								],
							},
						],
					},
				],
			},
		],
	},
	// pdf: html
	{
		displayName: 'URL or HTML Code',
		name: 'htmlSource',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				operation: ['html'],
				resource: ['pdf'],
			},
		},
		options: [
			{
				name: 'URL',
				value: 'url',
			},
			{
				name: 'HTML',
				value: 'html',
			},
		],
		default: 'url',
	},
	{
		displayName: 'URL',
		name: 'htmlUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['html'],
				resource: ['pdf'],
				htmlSource: ['url'],
			},
		},
		default: '',
	},
	{
		displayName: 'HTML Code',
		name: 'htmlCode',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				operation: ['html'],
				resource: ['pdf'],
				htmlSource: ['html'],
			},
		},
		default: '',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				operation: ['html'],
				resource: ['pdf'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'PDF Format',
				name: 'format ',
				type: 'options',
				options: [
					{
						name: 'A0',
						value: 'A0',
					},
					{
						name: 'A1',
						value: 'A1',
					},
					{
						name: 'A2',
						value: 'A2',
					},
					{
						name: 'A3',
						value: 'A3',
					},
					{
						name: 'A4',
						value: 'A4',
					},
					{
						name: 'A5',
						value: 'A5',
					},
					{
						name: 'A6',
						value: 'A6',
					},
					{
						name: 'Ledger',
						value: 'Ledger',
					},
					{
						name: 'Legal',
						value: 'Legal',
					},
					{
						name: 'Letter',
						value: 'Letter',
					},
					{
						name: 'Tabloid',
						value: 'Tabloid',
					},
				],
				default: 'Letter',
				description: 'Paper format. Defaults to Letter.',
			},
			{
				displayName: 'Scale',
				name: 'scale',
				type: 'number',
				default: 1,
				description:
					'Scale of the webpage rendering. Defaults to 1. Scale amount must be between 0.1 and 2.',
			},
			{
				displayName: 'Landscape',
				name: 'landscape',
				type: 'boolean',
				default: false,
				description: 'Whether the pdf should use landscape mode',
			},
			{
				displayName: 'Print Background Graphics',
				name: 'printBackground',
				type: 'boolean',
				default: false,
			},
		],
	},
	{
		displayName: 'Get File as URL',
		name: 'getAsUrl',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				operation: ['html', 'merge', 'compress', 'docx-to-pdf'],
				resource: ['pdf'],
			},
		},
		default: false,
		description: 'Whether you want the PDF as an URL',
	},
];
