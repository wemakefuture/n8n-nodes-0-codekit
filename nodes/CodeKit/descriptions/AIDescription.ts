import { INodeProperties } from 'n8n-workflow';
import { languages } from '../ressources/languages';

export const aiOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ai'],
			},
		},
		options: [
			{
				name: 'Check Content Policy',
				value: 'checkContentPolicy',
				description: 'Check content policy of text',
				action: 'Check content policy',
			},
			{
				name: 'Detect Adult Content',
				value: 'detectAdultContent',
				description: 'Detects adult content in image',
				action: 'Detect adult content',
			},
			{
				name: 'Detect Brand',
				value: 'detectBrand',
				description: 'Detects brand in image',
				action: 'Detect brand',
			},
			{
				name: 'Detect Color',
				value: 'detectColor',
				description: 'Detects color in image',
				action: 'Detect color',
			},
			{
				name: 'Detect Email Type',
				value: 'detectEmailType',
				description: 'Detects the sender (type) of email',
				action: 'Detect email type',
			},
			{
				name: 'Detect Faces',
				value: 'detectFace',
				description: 'Detects faces in image',
				action: 'Detect faces',
			},
			{
				name: 'Enitity Detection',
				value: 'entityDetection',
				description: 'Detects entities in a text with natural language processing AI',
				action: 'Enitity detection',
			},
			{
				name: 'Extract Contact Information',
				value: 'extractContactInformation',
				description: 'Extract contact information from text',
				action: 'Extract contact information',
			},
			{
				name: 'Generate Image',
				value: 'generateImage',
				description: 'Generates a image from text',
				action: 'Generate image',
			},
			{
				name: 'Generate Javascript Code',
				value: 'generateJavascriptCode',
				description: 'Generate javascript code based on provided prompt',
				action: 'Generate javascript code',
			},
			{
				name: 'Generate Python Code',
				value: 'generatePythonCode',
				description: 'Generate python code based on provided prompt',
				action: 'Generate python code',
			},
			{
				name: 'Language Detection',
				value: 'languageDetection',
				action: 'Language detection',
			},
			{
				name: 'Mood Detection',
				value: 'moodDetection',
				description: 'Detect the mood from text',
				action: 'Mood detection',
			},
			{
				name: 'PDF OCR',
				value: 'pdfocr',
				description: 'Extract text from PDF with AI',
				action: 'Extracts text from PDF with AI',
			},
			{
				name: 'Picture Object Recognition',
				value: 'pictureObjectRecognition',
				description: 'Detects content and objects on a picture',
				action: 'Picture object recognition',
			},
			{
				name: 'Picture Text Recognition',
				value: 'pictureTextRecognition',
				description: 'Detects the text in a picture using Optical Character Recognition AI',
				action: 'Picture text recognition',
			},
			{
				name: 'Too Long To Read',
				value: 'tooLongToRead',
				description: 'Create a summary of a text',
				action: 'Too long to read',
			},
			{
				name: 'Transcribe',
				value: 'transcribe',
				description: 'Transcribe audio',
				action: 'Transcribe',
			},
			{
				name: 'Translation',
				value: 'translate',
				description: 'Translate text',
				action: 'Translation',
			},
	
	
		],
		default: 'entityDetection',
	},
];

export const aiFields: INodeProperties[] = [
	// ai: transcribe
	{
		displayName: 'Audio URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['transcribe'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'URL of the audio file you want to transcribe',
	},
	// ai: detectEmailType
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['detectEmailType'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'Subject of the email',
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['detectEmailType'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'Body of the email',
	},
	// ai: entityDetection
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['entityDetection'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'Text you want to analyse',
	},
	// ai: languageValidation
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['languageDetection'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'Text to detect language of',
	},
	// ai: moodDetection
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['moodDetection'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'Text you want to analyse',
	},
	// ai: pictureTextRecognition
	// ai: pictureobjectrecognition
	// ai: detectadultcontent
	// ai: detectbrand
	// ai: detectcolor
	// ai: detectface
	{
		displayName: 'Image URL',
		name: 'imageUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'pictureTextRecognition',
					'pictureObjectRecognition',
					'detectFace',
					'detectBrand',
					'detectColor',
					'detectAdultContent',
				],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'URL of the image you want to analyse',
	},
	// ai: pdfocr
	{
		displayName: 'PDF URL',
		name: 'pdfUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['pdfocr'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'PDF to extract text with AI',
	},
	// ai: translate
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['translate'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'The text you want to translate',
	},
	{
		displayName: 'Result Language',
		name: 'resultLang',
		type: 'options',
		options: languages,
		required: true,
		displayOptions: {
			show: {
				operation: ['translate'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'The language to translate to',
	},
	{
		displayName: 'Text',
		name: 'prompt',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['tooLongToRead', 'extractContactInformation', 'checkContentPolicy'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'The text you want to analyse',
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['generateImage'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'The prompt to generate',
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['generateJavascriptCode', 'generatePythonCode'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'The prompt to generate the Code',
	},
	{
		displayName: 'Number of Results',
		name: 'n',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['generateImage'],
				resource: ['ai'],
			},
		},
		default: '',
		description: 'The number of results to generate',
	},
	{
		displayName: 'Resolution',
		name: 'size',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['generateImage'],
				resource: ['ai'],
			},
		},
		default: '',
		description:
			'The resolution of the image, only works for "256x256", "512x512", and "1024x1024"',
	},
	
];
