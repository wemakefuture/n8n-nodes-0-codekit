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
				name: 'Create PDF',
				value: 'create',
				description: 'Create an empty Pdf',
				action: 'Create PDF',
			},
			{
				name: 'Decrypt',
				value: 'decrypt',
				description: 'Decrypt the PDF File',
				action: 'Decrypt PDF file',
			},
			{
				name: 'Docx to PDF',
				value: 'docx-to-pdf',
				description: 'Converts a docx file to a pdf file',
				action: 'Docx to pdf a pdf',
			},
			{
				name: 'Draw',
				value: 'draw',
				description: 'Draw inside the Pdf file. Text or Image.',
				action: 'Pdf draw image or text',
			},
			{
				name: 'Encrypt',
				value: 'encrypt',
				description: 'Ecrypt the PDF File',
				action: 'Encrypt pdf file',
			},
			{
				name: 'HTML to PDF',
				value: 'html',
				description: 'Converts HTML Code or a URL to PDF with options',
				action: 'Html to pdf a pdf',
			},
			{
				name: 'Markdown to Pdf',
				value: 'markdownstringtopdf',
				description: 'Convert Markdown to PDF',
				action: 'Markdown to pdf',
			},
			{
				name: 'Metadata',
				value: 'metadata',
				description: 'Extract or Manipulate Metadata of a PDF file',
				action: 'Metadata extract or edit',
			},

			{
				name: 'PDF Merge',
				value: 'merge',
				description: 'Merge multiple pdf files to a single pdf',
				action: 'PDF Merge a pdf',
			},
			{
				name: 'PDF Pages',
				value: 'pages',
				description: 'Manipulate PDF Pages to rotate, remove, resize and add',
				action: 'Pages editting',
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
			{
				name: 'Watermark PDF',
				value: 'watermark',
				description: 'Edit inside a Pdf in order to create an watermark',
				action: 'Watermark PDF',
			},
		],
		default: 'count',
	},
];

export const pdfFields: INodeProperties[] = [

	// pdf/pages
	{
		displayName: 'PDF Pages',
		name: 'pagesop',
		type: 'options',
		options: [
			{
				name: 'Add',
				value: 'add',
			},
			{
				name: 'Rotate',
				value: 'rotate',
			},
			{
				name: 'Remove',
				value: 'remove',
			},
			{
				name: 'Resize',
				value: 'resize',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['pages'],
				resource: ['pdf'],
			},
		},
		default: 'add',
	},


	// pdf/draw
	{
		displayName: 'Draw Pdf',
		name: 'drawop',
		type: 'options',
		options: [
			{
				name: 'Text',
				value: 'text',
			},
			{
				name: 'Image',
				value: 'image',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['draw'],
				resource: ['pdf'],
			},
		},
		default: 'text',
	},

	// pdf/watermark/options
	{
		displayName: 'Watermark PDF',
		name: 'watermarkop',
		type: 'options',
		options: [
			{
				name: 'Text',
				value: 'text',
			},
			{
				name: 'Image',
				value: 'image',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
			},
		},
		default: 'text',
	},

	// pdf/metadata/general
	{
		displayName: 'Metadata',
		name: 'metadataop',
		type: 'options',
		options: [
			{
				name: 'Edit Metadata',
				value: 'edit',
			},
			{
				name: 'Get Pdf Metadata',
				value: 'info',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['metadata'],
				resource: ['pdf'],
			},
		},
		default: 'edit',
	},

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
		displayName: 'URL',
		name: 'url',
		type: 'string',
		description: 'Public URL of the PDF file Test',
		displayOptions: {
			show: {
				operation: [
					'watermark',
					'pages',
					'draw',
					'encrypt',
					'decrypt',
					'metadata',
				],
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
		displayOptions: {
			show: {
				operation: ['docx-to-pdf', 'encrypt', 'decrypt', 'watermark', 'draw', 'pages', 'metadata'],
				resource: ['pdf'],
			},
		},
		default: '',
	},
	{
		displayName: 'Get File as URL',
		name: 'getAsUrl',
		type: 'boolean',
		required: true,
		description: 'Whether you want the PDF as an URL',
		displayOptions: {
			show: {
				operation: [
					'html',
					'merge',
					'compress',
					'docx-to-pdf',
					'create',
					'watermark',
					'encrypt',
					'decrypt',
					'draw',
					'pages',
					'markdownstringtopdf',
				],
				resource: ['pdf'],
			},
		},
		default: false,
	},
	{
		displayName: 'Filename',
		name: 'fileName',
		type: 'string',
		description: 'Filename of the PDF',
		displayOptions: {
			show: {
				operation: [
					'getinfometadata',
					'base64',
					'compress',
					'docx-to-pdf',
					'pdf-to-image',
					'create',
					'watermark',
					'pages',
					'draw',
					'encrypt',
					'decrypt',
				],
				resource: ['pdf'],
			},
		},
		default: '',
	},
	{
		displayName: 'Rotation of the Image/Text',
		name: 'rotate',
		type: 'number',
		description: 'The counter-clockwise Rotation of the Image or Text in Degress',
		displayOptions: {
			show: {
				operation: ['watermark', 'draw'],
				resource: ['pdf'],
			},
		},
		default: 0,
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
	{
		displayName: 'Pages',
		name: 'pages',
		type: 'string',
		description: 'Pages inside the PDF file',
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

	// pages/add
	{
		displayName: 'Pages',
		name: 'pages',
		type: 'number',
		typeOptions: {
			multipleValues: true,
		},
		description: 'Enter the page indices where to add additional pages',
		displayOptions: {
			show: {
				operation: ['pages'],
				resource: ['pdf'],
				pagesop: ['add'],
			},
		},
		default: 0,
		required: true,
	},
	{
		displayName: 'Pages',
		name: 'pages',
		type: 'string',
		description: 'The pages that should me manipluated. You can specify the range with 1 or 3-5 or ^3-^1.',
		displayOptions: {
			show: {
				operation: ['pages'],
				resource: ['pdf'],
				pagesop: ['remove', 'resize', 'rotate'],
			},
		},
		default: '0',
		placeholder: '1,3-5,^3-^1',
		required: true,
	},
	// pages/resize
	{
		displayName: 'Width of Page',
		name: 'width',
		type: 'number',
		description: 'The Width of the Page in Points',
		displayOptions: {
			show: {
				operation: ['pages'],
				resource: ['pdf'],
				pagesop: ['add', 'resize'],
			},
		},
		default: 0,
	},
	{
		displayName: 'Height of Page',
		name: 'height',
		type: 'number',
		description: 'The Height of the Page in Points',
		displayOptions: {
			show: {
				operation: ['pages'],
				resource: ['pdf'],
				pagesop: ['add', 'resize'],
			},
		},
		default: 0,
	},
	// pdf/pages/rotate
	{
		displayName: 'Rotation of Page',
		name: 'rotate',
		type: 'number',
		description: 'The Rotation of the Page',
		displayOptions: {
			show: {
				operation: ['pages'],
				resource: ['pdf'],
				pagesop: ['rotate'],
			},
		},
		default: 0,
		required: true,
	},
	// pdf/draw/general

	{
		displayName: 'Anchor of the Image',
		name: 'anchor',
		type: 'options',
		options: [
			{
				name: 'Bottom',
				value: 'bottom',
			},
			{
				name: 'Bottom Left',
				value: 'bottom-left',
			},
			{
				name: 'Bottom Right',
				value: 'bottom-right',
			},
			{
				name: 'Center',
				value: 'center',
			},
			{
				name: 'Left',
				value: 'left',
			},
			{
				name: 'Right',
				value: 'right',
			},
			{
				name: 'Top',
				value: 'top',
			},
			{
				name: 'Top Left',
				value: 'top-left',
			},
			{
				name: 'Top Right',
				value: 'top-right',
			},
		],
		description: 'The positioning of the Image relative to the Page',
		displayOptions: {
			show: {
				operation: ['watermark', 'draw'],
				resource: ['pdf'],
			},
		},
		default: 'bottom-left',
	},
	{
		displayName: 'Align of the Image',
		name: 'align',
		type: 'options',
		options: [
			{
				name: 'Bottom',
				value: 'bottom',
			},
			{
				name: 'Bottom Left',
				value: 'bottom-left',
			},
			{
				name: 'Bottom Right',
				value: 'bottom-right',
			},
			{
				name: 'Center',
				value: 'center',
			},
			{
				name: 'Left',
				value: 'left',
			},
			{
				name: 'Right',
				value: 'right',
			},
			{
				name: 'Top',
				value: 'top',
			},
			{
				name: 'Top Left',
				value: 'top-left',
			},
			{
				name: 'Top Right',
				value: 'top-right',
			},
		],
		description: 'The part of the image that should be aligned with the specified position',
		displayOptions: {
			show: {
				operation: ['watermark', 'draw'],
				resource: ['pdf'],
			},
		},
		default: 'bottom-left',
	},

	{
		displayName: 'X-Offset',
		name: 'x',
		type: 'number',
		description: 'The X-Axis-Offset in points of the Image realtive to the Anchor',
		displayOptions: {
			show: {
				operation: ['watermark', 'draw'],
				resource: ['pdf'],
			},
		},
		default: 0,
	},
	{
		displayName: 'Y-Offset',
		name: 'y',
		type: 'number',
		description: 'The Y-Axis-Offset in points of the Image realtive to the Anchor',
		displayOptions: {
			show: {
				operation: ['watermark', 'draw'],
				resource: ['pdf'],
			},
		},
		default: 0,
	},
	{
		displayName: 'Pages',
		name: 'pages',
		type: 'string',
		description: 'The pages that should me manipluated. You can specify the range with 1 or 3-5 or ^3-^1.',
		displayOptions: {
			show: {
				operation: ['watermark', 'draw'],
				resource: ['pdf'],
			},
		},
		default: '0',
		placeholder: '1,3-5,^3-^1',
		required: true,
	},
	// pdf/draw/text
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		description: 'The Text to draw',
		displayOptions: {
			show: {
				operation: ['draw'],
				resource: ['pdf'],
				drawop: ['text'],

			},
		},
		placeholder: 'Text',
		required: true,
		default: '',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		description: 'The font color as a six-digit hexcode. Remove # at the beginning if you make a request.',
		displayOptions: {
			show: {
				operation: ['draw'],
				resource: ['pdf'],
				drawop: ['text'],
			},
		},
		placeholder: 'FFFF00',
		default: '000000',
	},
	{
		displayName: 'Size',
		name: 'size',
		type: 'number',
		description: 'The size of the Text in points',
		displayOptions: {
			show: {
				operation: ['draw'],
				resource: ['pdf'],
				// Zwei separate Bedingungen für jede Operation und den entsprechenden "text" Wert
				drawop: ['text'],
			},
		},
		placeholder: '32',
		default: 32,
	},

	{
		displayName: 'Font',
		name: 'font',
		type: 'options',
		options: [
			{
				name: 'Times Roman',
				value: 'TimesRoman',
			},
			{
				name: 'Courier',
				value: 'Courier',
			},
			{
				name: 'Helvetica',
				value: 'Helvetica',
			},
		],
		description: 'The font to use for the text',
		displayOptions: {
			show: {
				operation: ['draw'],
				resource: ['pdf'],
				drawop: ['text'],
			},
		},
		default: 'TimesRoman',
		placeholder: 'TimesRoman',
	},
	// pdf/draw/image
	{
		displayName: 'URL of the Image',
		name: 'imageUrl',
		type: 'string',
		description: 'The public URL of the Image',
		displayOptions: {
			show: {
				operation: ['draw'],
				resource: ['pdf'],
				drawop: ['image'],
			},
		},
		default: '',
		required: true,
		placeholder: "URL IMG",
	},
	{
		displayName: 'Imagebuffer of the Image',
		name: 'imageBuffer',
		type: 'string',
		description: 'The Image as a Base64-Encodded Buffer',
		displayOptions: {
			show: {
				operation: ['draw'],
				resource: ['pdf'],
				drawop: ['image'],
			},
		},
		default: '',
		placeholder: "Img Buffer",
	},
	{
		displayName: 'Width of Image',
		name: 'width',
		type: 'number',
		description: 'The Width of the to be added Image',
		displayOptions: {
			show: {
				operation: ['draw'],
				resource: ['pdf'],
				drawop: ['image'],
			},
		},
		default: 0,
		placeholder: "0",
	},
	{
		displayName: 'Height of Image',
		name: 'height',
		type: 'number',
		description: 'The Height of the to be added Image',
		displayOptions: {
			show: {
				operation: ['draw'],
				resource: ['pdf'],
				drawop: ['image'],
			},
		},
		default: 0,
		placeholder: "0",
	},


	// pdf/watermark/text
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		description: 'The text to draw',
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
				watermarkop: ['text'],

			},
		},
		placeholder: 'The Text',
		default: '',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		description: 'The font color as a six-digit hexcode',
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
				watermarkop: ['text'],

			},
		},
		placeholder: 'FFFF00',
		default: '',
	},
	{
		displayName: 'Size',
		name: 'size',
		type: 'number',
		description: 'The size of the Text in points',
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
				watermarkop: ['text'],
			},
		},
		placeholder: '32',
		default: 32,
	},

	{
		displayName: 'Font',
		name: 'font',
		type: 'options',
		options: [
			{
				name: 'Times Roman',
				value: 'TimesRoman',
			},
			{
				name: 'Courier',
				value: 'Courier',
			},
			{
				name: 'Helvetica',
				value: 'Helvetica',
			},
		],
		description: 'The font to use for the text',
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
				watermarkop: ['text'],
			},
		},
		default: 'TimesRoman',
		placeholder: 'TimesRoman',
	},

	{
		displayName: 'Repeat Watermark',
		name: 'repeat',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
			},
		},
		description: 'Whether to repeat the watermark across the page',
	},

	{
		displayName: 'Opacity',
		name: 'opacity',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
			},
		},
		description: 'The opacity of the text/image. The value should be between 0-1, e.g 0.4.',
		placeholder: '0.4',

	},
	{
		displayName: 'Spacing',
		name: 'spacing',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
			},
		},
		description: 'The space between each instance. Only applies if repeat is true.',
		placeholder: '0.4',

	},

	// pdf/watermark/image
	{
		displayName: 'URL of the Image',
		name: 'imageUrl',
		type: 'string',
		description: 'The public URL of the Image',
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
				watermarkop: ['image'],
			},
		},
		default: '',
		placeholder: "URL IMG",
	},
	{
		displayName: 'Imagebuffer of the Image',
		name: 'imageBuffer',
		type: 'string',
		description: 'The Image as a Base64-Encodded Buffer',
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
				watermarkop: ['image'],
			},
		},
		default: '',
		placeholder: "Img Buffer",
	},
	{
		displayName: 'Width of Image',
		name: 'width',
		type: 'number',
		description: 'The Width of the to be added Image',
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
				watermarkop: ['image'],
			},
		},
		default: 0,
		placeholder: "0",
	},
	{
		displayName: 'Height of Image',
		name: 'height',
		type: 'number',
		description: 'The Height of the to be added Image',
		displayOptions: {
			show: {
				operation: ['watermark'],
				resource: ['pdf'],
				watermarkop: ['image'],
			},
		},
		default: 0,
		placeholder: "0",
	},
	//pdf/metadata

	//pdf/metadata/edit
	{
		displayName: 'Get File as URL',
		name: 'getAsUrl',
		type: 'boolean',
		description: 'Whether you want the PDF as an URL',
		displayOptions: {
			show: {
				operation: ['metadata'],
				resource: ['pdf'],
				metadataop: ['edit'],
			},
		},
		default: false,
	},
	{
		displayName: 'Filename',
		name: 'filename',
		type: 'string',
		description: 'Filename of the PDF',
		displayOptions: {
			show: {
				operation: ['metadata'],
				resource: ['pdf'],
				metadataop: ['edit'],
			},
		},
		default: '',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		description: 'The new Title of the Pdf',
		displayOptions: {
			show: {
				operation: ['metadata'],
				resource: ['pdf'],
				metadataop: ['edit'],
			},
		},
		default: '',
	},
	{
		displayName: 'Author',
		name: 'author',
		type: 'string',
		description: 'The new Author of the Pdf',
		displayOptions: {
			show: {
				operation: ['metadata'],
				resource: ['pdf'],
				metadataop: ['edit'],
			},
		},
		default: '',
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		description: 'The new Subject of the Pdf',
		displayOptions: {
			show: {
				operation: ['metadata'],
				resource: ['pdf'],
				metadataop: ['edit'],
			},
		},
		default: '',
	},
	{
		displayName: 'Keywords',
		name: 'keywords',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		description: 'The new keywords of the Pdf',
		displayOptions: {
			show: {
				operation: ['metadata'],
				resource: ['pdf'],
				metadataop: ['edit'], // Optional: Nur anzeigen wenn bestimmte Operation gewählt
			},
		},
		default: [],
	},

	//pdf/encrypt
	{
		displayName: 'User Password',
		name: 'userPassword',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['encrypt'],
				resource: ['pdf'],
			},
		},
	},
	{
		displayName: 'Owner Password',
		name: 'ownerPassword',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['encrypt'],
				resource: ['pdf'],
			},
		},
		description: 'The Owner Password. Default is the user Password.',
	},
	//pdf/decrypt
	{
		displayName: 'The Password',
		name: 'password',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		displayOptions: {
			show: {
				operation: ['decrypt'],
				resource: ['pdf'],
			},
		},
	},

	// pdf/create
	{
		displayName: 'Pages',
		name: 'pages',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['pdf'],
			},
		},
		description: "The number of pages to create",
	},
	// pdf/markdowntostring

	{
		displayName: 'Markdown String',
		name: 'markdownString',
		type: 'string',
		description: 'The Markdown source that will be converted to a PDF',
		displayOptions: {
			show: {
				operation: ['markdownstringtopdf'],
				resource: ['pdf'],
			},
		},
		default: '',
	},
	{
		displayName: 'CSS',
		name: 'css',
		type: 'string',
		description: 'The Custom CSS to change the Markdown look',
		displayOptions: {
			show: {
				operation: ['markdownstringtopdf'],
				resource: ['pdf'],
			},
		},
		default: '',
	},

	// pdf/create
	{
		displayName: 'Width of Page',
		name: 'width',
		type: 'number',
		description: 'The Width of the Page in Points',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['pdf'],
			},
		},
		default: 0,
		required: true,
	},
	{
		displayName: 'Height of Page',
		name: 'height',
		type: 'number',
		description: 'The Height of the Page in Points',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['pdf'],
			},
		},
		default: 0,
		required: true,
	},


];