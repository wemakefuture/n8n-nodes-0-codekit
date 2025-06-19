import { OptionsWithUri } from 'request';

import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, IHttpRequestMethods, IHttpRequestOptions, ILoadOptionsFunctions, NodeApiError, NodeOperationError } from 'n8n-workflow';

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
	options.headers!['ipaas']  = 'n8n';
	try {
		const responseData = await this.helpers.request(options);
		return responseData;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);

	}
}

export async function codeKitRequestLoadOptions(
	this: ILoadOptionsFunctions,
	method: IHttpRequestMethods,
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

	let options: IHttpRequestOptions = {
		headers: {},
		method,
		body,
		qs,
		url: uri || `https://v2.1saas.co/${resource}`,
		json: true,
	};
	options = Object.assign({}, options, option);
	options.headers!['auth'] = `${credentials.apiKey}`;
	options.headers!['ipaas']  = 'n8n';

	try {
		const responseData = await this.helpers.httpRequest(options);
		return responseData;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export function mapArrayOfObjectsToStringArray(objectsArr: IDataObject[]) {
	if (!objectsArr) {
		return [];
	}
	const resultArr: string[] = [];

	objectsArr.forEach(el => {
		resultArr.push(el.name as string);
	});

	return resultArr;
}


// Interfaces for transformArrayToObject

export interface InputItem {
	property: string;
	// tslint:disable-next-line:no-any
	value: any;
}

export interface OutputObject {
	variables: {
		[key: string]: string;
	};
}

// Interface for getRowKey
export interface IRowKeyResponseItem {
	label: string;
	value: string;
}

export function transformArrayToObject(inputArray: InputItem[]): OutputObject {
	const initialAccumulator: OutputObject = { variables: {} };
	const output: OutputObject = inputArray.reduce((acc, current) => {
		const stringValue: string = typeof current.value === 'string' ? current.value : JSON.stringify(current.value);
		acc.variables[current.property] = stringValue;
		return acc;
	}, initialAccumulator);
	return output;
}

