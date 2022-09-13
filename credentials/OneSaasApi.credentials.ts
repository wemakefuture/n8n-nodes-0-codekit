import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class OneSaasApi implements ICredentialType {
	name = 'oneSaasApi';
	displayName = '1SaaS API';
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
