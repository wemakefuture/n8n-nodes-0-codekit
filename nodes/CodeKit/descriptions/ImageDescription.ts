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
				value: 'htmlToImage',
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

export const imageFields: INodeProperties[] = [];
