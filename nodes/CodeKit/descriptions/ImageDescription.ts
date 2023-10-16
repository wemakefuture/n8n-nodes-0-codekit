import { INodeProperties } from 'n8n-workflow';

export const imageOperations: INodeProperties[] = [
	{
		displayName: 'Image',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['image'],
			},
		},
		options: [
			{
				name: 'Blur',
				value: 'blur',
				description: 'Blur an image',
				action: 'Blur',
			},
			{
				name: 'Convert',
				value: 'convert',
				description: 'Convert an image',
				action: 'Convert',
			},
			{
				name: 'Crop',
				value: 'crop',
				description: 'Crop an image',
				action: 'Crop',
			},
			{
				name: 'Exif',
				value: 'exif',
				description: 'Get the exif data of an image',
				action: 'Exif',
			},
			{
				name: 'Flip',
				value: 'flip',
				description: 'Flip an image',
				action: 'Flip',
			},
			{
				name: 'HTML to Image',
				value: 'html',
				description: 'Convert HTML to an image',
				action: 'Html to image',
			},
			{
				name: 'Overlay',
				value: 'overlay',
				description: 'Overlay an image',
				action: 'Overlay',
			},
			{
				name: 'Resize',
				value: 'resize',
				description: 'Resize an image',
				action: 'Resize',
			},
			{
				name: 'Rotate',
				value: 'rotate',
				description: 'Rotate an image',
				action: 'Rotate',
			},
			{
				name: 'Sharpen',
				value: 'sharpen',
				description: 'Sharpen an image',
				action: 'Sharpen',
			},
		],
		default: 'blur',
	},
];

export const imageFields: INodeProperties[] = [
	{
		displayName: 'Type of Data',
		name: 'urlbuffertype',
		type: 'options',
		options: [
			{
				name: 'URL',
				value: 'url',
			},
			{
				name: 'Buffer',
				value: 'buffer',
			},
		],
		required: true,
		displayOptions: {
			show: {
				// all except html and overlay
				operation: ['blur', 'convert', 'crop', 'flip', 'resize', 'rotate', 'sharpen', 'exif'],
				resource: ['image'],
			},
		},
		default: 'url',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['blur', 'convert', 'crop', 'flip', 'resize', 'rotate', 'sharpen', 'exif'],
				resource: ['image'],
				urlbuffertype: ['url'],
			},
		},
		default: '',
		description: 'This is the URL of the image, must be publicly accessible',
	},
	{
		displayName: 'Buffer',
		name: 'buffer',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['blur', 'convert', 'crop', 'flip', 'resize', 'rotate', 'sharpen', 'exif'],
				resource: ['image'],
				urlbuffertype: ['buffer'],
			},
		},
		default: '',
		description: 'Buffer of the image',
	},
	{
		displayName: 'Type of Data',
		name: 'htmlurltype',
		type: 'options',
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
		required: true,
		displayOptions: {
			show: {
				operation: ['html'],
				resource: ['image'],
			},
		},
		default: 'url',
	},
	{
		displayName: 'HTML',
		name: 'html',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['html'],
				resource: ['image'],
				htmlurltype: ['html'],
			},
		},
		default: '',
		description: 'HTML to convert to an image',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['html'],
				resource: ['image'],
				htmlurltype: ['url'],
			},
		},
		default: '',
		description: 'URL of the HTML page to convert to an image',
	},
	{
		displayName: 'Sigma',
		name: 'sigma',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['blur', 'sharpen'],
				resource: ['image'],
			},
		},
		default: '',
		description: 'Sigma of the image',
	},

	{
		displayName: 'Output Format',
		name: 'outputFormat',
		type: 'options',
		description: 'Output format of the image',
		options: [
			{
				name: 'GIF',
				value: 'gif',
			},
			{
				name: 'JPEG',
				value: 'jpeg',
			},
			{
				name: 'JPG',
				value: 'jpg',
			},
			{
				name: 'PNG',
				value: 'png',
			},
			{
				name: 'TIFF',
				value: 'tiff',
			},
			{
				name: 'WEBP',
				value: 'webp',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['convert'],
				resource: ['image'],
			},
		},
		default: 'jpeg',
	},
	{
		displayName: 'With Metadata',
		name: 'withMetaData',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['convert'],
				resource: ['image'],
			},
		},
		default: false,
		description: 'Whether to include metadata in the converted image',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'json',
		displayOptions: {
			show: {
				operation: ['convert'],
				resource: ['image'],
			},
		},
		default: JSON.stringify({
			quality: 40,
		}),
		description: 'Additional options to pass to the convert operation',
	},

	{
		displayName: 'Options Cropping',
		name: 'options',
		type: 'json',
		displayOptions: {
			show: {
				operation: ['crop'],
				resource: ['image'],
			},
		},
		default: JSON.stringify({
			top: 0,
			left: 0,
			width: 100,
			height: 100,
		}),
		description: 'Top, left, width and height of the crop',
	},
	{
		displayName: 'Axis',
		name: 'axis',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['crop', 'flip'],
				resource: ['image'],
			},
		},
		default: '',
		description: 'Axis to crop on',
	},

	{
		displayName: 'Options HTML to Image',
		name: 'options',
		type: 'json',
		displayOptions: {
			show: {
				operation: ['html'],
				resource: ['image'],
			},
		},
		default: JSON.stringify({
			type: 'png',
			fullPage: false,
			disableAnimations: true,
			emulateDevice: 'iPhone X',
			darkMode: true,
		}),
		description: 'Options to pass to the html to image operation',
	},

	{
		displayName: 'Front Image URL',
		name: 'frontImageUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['overlay'],
				resource: ['image'],
			},
		},
		default: '',
		description: 'URL of the front image',
	},
	{
		displayName: 'Back Image URL',
		name: 'backImageUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['overlay'],
				resource: ['image'],
			},
		},
		default: '',
		description: 'URL of the back image',
	},
	{
		displayName: 'Position',
		name: 'position',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['overlay'],
				resource: ['image'],
			},
		},
		default: 'center',
		description: 'Position of the overlay',
	},
	{
		displayName: 'Options Overlay',
		name: 'options',
		type: 'json',
		displayOptions: {
			show: {
				operation: ['overlay'],
				resource: ['image'],
			},
		},
		default: JSON.stringify({
			opacity: 0.6,
		}),
		description: 'Options to pass to the overlay operation',
	},

	{
		displayName: 'Width',
		name: 'width',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['resize'],
				resource: ['image'],
			},
		},
		default: '',
		description: 'Width of the image',
	},
	{
		displayName: 'Height',
		name: 'height',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['resize'],
				resource: ['image'],
			},
		},
		default: '',
		description: 'Height of the image',
	},
	{
		displayName: 'Fit',
		name: 'fit',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['resize'],
				resource: ['image'],
			},
		},
		default: '',
		description: 'Possible values: "contain", "cover", "fill", "inside", "outside"',
	},
	{
		displayName: 'Kernel',
		name: 'kernel',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['resize'],
				resource: ['image'],
			},
		},
		default: '',
		description: 'Possible values: "nearest", "cubic", "mitchell", "lanczos2", "lanczos3"',
	},

	{
		displayName: 'Angle',
		name: 'angle',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['rotate'],
				resource: ['image'],
			},
		},
		default: '',
		description: 'Angle to rotate the image by',
	},
	{
		displayName: 'Background',
		name: 'background',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['rotate'],
				resource: ['image'],
			},
		},
		default: '',
		description: 'Background to use for the image',
	},

	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		description: 'Filename of the image to operate on',
		displayOptions: {
			show: {
				operation: [
					'blur',
					'convert',
					'crop',
					'flip',
					'overlay',
					'resize',
					'rotate',
					'sharpen',
					'html',
				],
				resource: ['image'],
			},
		},
		default: '',
	},
	{
		displayName: 'Get File as URL',
		name: 'getAsUrl',
		type: 'boolean',
		description: 'Whether to get the image as an URL',
		displayOptions: {
			show: {
				operation: [
					'blur',
					'convert',
					'crop',
					'flip',
					'overlay',
					'resize',
					'rotate',
					'sharpen',
					'html',
				],
				resource: ['image'],
			},
		},
		default: true,
	},
];
