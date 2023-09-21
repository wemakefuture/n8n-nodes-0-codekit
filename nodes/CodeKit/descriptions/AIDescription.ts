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
				name: 'Enitity Detection',
				value: 'entityDetection',
				description: 'Detects entities in a text with natural language processing AI',
				action: 'Enitity detection',
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
	{
		displayName: 'URL',
		name: 'imageUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['pictureTextRecognition', 'pictureObjectRecognition'],
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
		description: 'The langauge to translate to',
	},
];
