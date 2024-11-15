import { ICredentialType, INodeProperties } from 'n8n-workflow';
export class CodeKitApi implements ICredentialType {
	name = 'codeKitApi';
	displayName = '0CodeKit API';
	documentationUrl = 'https://documenter.getpostman.com/view/18297710/UVkntwBv';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
}
