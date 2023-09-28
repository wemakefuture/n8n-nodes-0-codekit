import { OptionsWithUri } from 'request';

import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, NodeApiError, NodeOperationError } from 'n8n-workflow';

export async function codeKitRequest(
	this: IExecuteFunctions,
	method: string,
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
) {
	const credentials = await this.getCredentials('codeKitApi');
	if (credentials === undefined) {
		throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
	}

	let options: OptionsWithUri = {
		headers: {},
		method,
		body,
		qs,
		uri: uri || `https://v2.1saas.co/${resource}`,
		json: true,
	};
	options = Object.assign({}, options, option);
	options.headers!['auth'] = `${credentials.apiKey}`;
console.log(options);

	try {
		const responseData = await this.helpers.request(options);
		return responseData;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export function mapArrayOfObjectsToStringArray(objectsArr : IDataObject[]){
			if(!objectsArr){
					return [];
		 }
				const resultArr : string[] = [];

			 objectsArr.forEach(el => {
				resultArr.push(el.name as string);
			 });

			 return resultArr;
}
