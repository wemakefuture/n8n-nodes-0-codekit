import { INodeProperties } from 'n8n-workflow';
import { languages } from '../ressources/languages';

export const storageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['storage'],
			},
		},
		options: [
			{
				name: 'JSON Bin Storage',
				value: 'json',
				description: 'Store JSONs online and access them on different szenarios through our api',
				action: 'Json bin storage',
			},
			{
				name: 'Global Variables',
				value: 'globalvariables',
				description:
					'Store global variables online and access them on different szenarios through our api',
				action: 'Store global variables',
			},
			{
				name: 'Temporary Storage',
				value: 'temp',
				description: 'Store files temporary for 24 hours',
				action: 'Temporary file storage',
			},
			{
				name: 'Permanent Storage for Simple Files',
				value: 'perm',
				description: 'Store files up to 50MB online and access them through our api',
				action: 'Permanent storage for simple files',
			},
		],
		default: 'json',
	},
];

export const storageFields: INodeProperties[] = [
	// storage: json
	{
		displayName: 'Choose a JSON Bin Operation',
		name: 'jsonop',
		type: 'options',
		options: [
			{
				name: 'Add a New JSON Bin',
				value: 'add',
			},
			{
				name: 'Delete a Stored JSON Bin',
				value: 'del',
			},
			{
				name: 'Get a JSON',
				value: 'get',
			},
			{
				name: 'List All Your JSON Bins',
				value: 'list',
			},
			{
				name: 'Update a JSON Bin',
				value: 'put',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['json'],
				resource: ['storage'],
			},
		},
		default: 'add',
	},
	{
		displayName: 'JSON or JSON String',
		name: 'json',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				operation: ['json'],
				resource: ['storage'],
				jsonop: ['add', 'put'],
			},
		},
		default: '',
	},
	{
		displayName: 'Bin ID of the JSON',
		name: 'binId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['json'],
				resource: ['storage'],
				jsonop: ['get', 'del', 'put'],
			},
		},
		default: '',
	},
	// storage: globalvariables
	{
		displayName: 'Choose a JSON Bin Operation',
		name: 'globalvariablesop',
		type: 'options',
		options: [
			{
				name: 'Add a New Global Variable',
				value: 'add',
			},
			{
				name: 'Get a Global Variable',
				value: 'get',
			},
			{
				name: 'Delete a Global Variable',
				value: 'del',
			},
			{
				name: 'List All Your Global Variables',
				value: 'list',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['globalvariables'],
				resource: ['storage'],
			},
		},
		default: 'add',
	},
	// storage: globalvariables: add
	{
		displayName: 'Variable Name',
		name: 'variableName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['globalvariables'],
				resource: ['storage'],
				globalvariablesop: ['add', 'get'],
			},
		},
		default: '',
	},
	{
		displayName: 'Variable Value',
		name: 'variableValue',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['globalvariables'],
				resource: ['storage'],
				globalvariablesop: ['add'],
			},
		},
		default: '',
	},
	// storage: globalvariables: del
	{
		displayName: 'Variable ID',
		name: 'variableId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['globalvariables'],
				resource: ['storage'],
				globalvariablesop: ['del'],
			},
		},
		default: '',
		description:
			'Global variables can only be deleted with the matching variableId. You can list them with the "list" operation.',
	},
	// storage: tempfiles
	{
		displayName: 'Binary File Data',
		name: 'buffer',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['temp'],
				resource: ['storage'],
			},
		},
		default: '',
		description: 'Binary file data in base64 format',
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['temp'],
				resource: ['storage'],
			},
		},
		default: 'Test.txt',
		description: 'Important: If you want to keep the filetype. Add the extension to the filename.',
	},
	// storage: permfiles
	{
		displayName: 'Choose a File Storage Operation',
		name: 'permfilesop',
		type: 'options',
		options: [
			{
				name: 'Add a New File',
				value: 'add',
			},
			{
				name: 'Get a Gstored File',
				value: 'get',
			},
			{
				name: 'Delete a Stored File',
				value: 'del',
			},
			{
				name: 'List All Your Files',
				value: 'list',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: ['perm'],
				resource: ['storage'],
			},
		},
		default: 'add',
	},
	// ai: permfiles: add
	{
		displayName: 'Binary File Data',
		name: 'fileBuffer',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['perm'],
				resource: ['storage'],
				permfilesop: ['add'],
			},
		},
		default: '',
		description: 'Binary file data in base64 format',
	},
	{
		displayName: 'File Name',
		name: 'uploadName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['temp'],
				resource: ['storage'],
				permfilesop: ['add'],
			},
		},
		default: 'Test.txt',
		description: 'Important: If you want to keep the filetype. Add the extension to the filename.',
	},
	// ai: permfiles: del
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['perm'],
				resource: ['storage'],
				permfilesop: ['del', 'get'],
			},
		},
		default: '',
		description: 'You can list your files and file IDs with the "list" operation',
	},
	// ai: permfiles: get
	{
		displayName: 'URL',
		name: 'getAsUrl',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				operation: ['perm'],
				resource: ['storage'],
				permfilesop: ['get'],
			},
		},
		default: false,
		description: 'Whether you want the PDF as an URL',
	},
];
