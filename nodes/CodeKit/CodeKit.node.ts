import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

import {
	aiFields,
	aiOperations,
	businessFields,
	businessOperations,
	calculateFields,
	calculateOperations,
	codeFields,
	codeOperations,
	convertFields,
	convertOperations,
	cryptoFields,
	cryptoOperations,
	dateAndTimeFields,
	dateAndTimeOperations,
	generateFields,
	generateOperations,
	operatorFields,
	operatorOperations,
	pdfFields,
	pdfOperations,
	storageFields,
	storageOperations,
} from './descriptions';

import { codeKitRequest, mapArrayOfObjectsToStringArray } from './GenericFunctions';

type MergeFiles = {
	files: {
		filetype: string;
		pages: Array<{
			startPage: number;
			endPage: number;
		}>;
	};
};

export class CodeKit implements INodeType {
	description: INodeTypeDescription = {
		displayName: '0CodeKit',
		name: 'codeKit',
		icon: 'file:codekit.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'A toolbox of no-code utilities',
		defaults: {
			name: '0CodeKit',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'codeKitApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'AI',
						value: 'ai',
					},
					{
						name: 'Business',
						value: 'business',
					},
					{
						name: 'Calculate',
						value: 'calculate',
					},
					{
						name: 'Code',
						value: 'code',
					},
					{
						name: 'Convert',
						value: 'convert',
					},
					{
						name: 'Crypto',
						value: 'crypto',
					},
					{
						name: 'Date & Time',
						value: 'dateandtime',
					},
					{
						name: 'Generate',
						value: 'generate',
					},
					{
						name: 'Operator',
						value: 'operator',
					},
					{
						name: 'PDF',
						value: 'pdf',
					},
					{
						name: 'Storage',
						value: 'storage',
					},
				],
				default: 'ai',
				required: true,
			},
			// AI
			...aiOperations,
			...aiFields,
			// Business
			...businessOperations,
			...businessFields,
			// Calculate
			...calculateOperations,
			...calculateFields,
			// Code
			...codeOperations,
			...codeFields,
			// Convert
			...convertOperations,
			...convertFields,
			// Crypto
			...cryptoOperations,
			...cryptoFields,
			// Generate
			...generateOperations,
			...generateFields,
			// Operator
			...operatorOperations,
			...operatorFields,
			// PDF
			...pdfOperations,
			...pdfFields,
			// Storage
			...storageOperations,
			...storageFields,
			// Date & Time
			...dateAndTimeOperations,
			...dateAndTimeFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const length = items.length;
		const qs: IDataObject = {};
		let responseData;
		for (let i = 0; i < length; i++) {
			try {
				const resource = this.getNodeParameter('resource', 0) as string;
				let operation = this.getNodeParameter('operation', 0) as string;
				const body = {} as IDataObject;

				switch (resource) {
					// AI : https://docs.1saas.co/api-documentation/ai
					case 'ai':
						if (
							operation === 'entityDetection' ||
							operation === 'languageDetection' ||
							operation === 'moodDetection'
						) {
							body.text = this.getNodeParameter('text', i) as string;
						}
						if (
							operation === 'pictureObjectRecognition' ||
							operation === 'pictureTextRecognition'
						) {
							body.imageUrl = this.getNodeParameter('imageUrl', i) as string;
						}
						if (operation === 'translate') {
							body.text = this.getNodeParameter('text', i) as string;
							body.resultLang = this.getNodeParameter('resultLang', i) as string;
						}
						if (operation === 'transcribe') {
							body.url = this.getNodeParameter('url', i) as string;
						}
						if (operation === 'pdfocr') {
							body.pdfUrl = this.getNodeParameter('pdfUrl', i) as string;
						}
						if (operation === 'detectEmailType') {
							body.subject = this.getNodeParameter('subject', i) as string;
							body.body = this.getNodeParameter('body', i) as string;
						}
						if (
							operation === 'detectFace' ||
							operation === 'detectBrand' ||
							operation === 'detectColor' ||
							operation === 'detectAdultContent'
						) {
							body.imageUrl = this.getNodeParameter('imageUrl', i) as string;
						}
						if (operation === 'generateImage') {
							body.prompt = this.getNodeParameter('prompt', i) as string;
							body.n = this.getNodeParameter('n', i) as number;
							body.size = this.getNodeParameter('size', i) as string;
						}
						if (
							operation === 'tooLongToRead' ||
							operation === 'extractContactInformation' ||
							operation === 'checkContentPolicy'
						) {
							body.prompt = this.getNodeParameter('prompt', i) as string;
						}

						break;
					// Code : https://docs.1saas.co/api-documentation/code
					case 'business':
						if (operation === 'isFreeMail') {
							body.email = this.getNodeParameter('email', i) as string;
						}
						if (operation === 'lookupvatrates') {
							body.countryCode = this.getNodeParameter('countryCode', i) as string;
						}
						if (operation === 'verifyVAT') {
							const format = this.getNodeParameter('vatFormat', 0) as string;
							operation = 'validate/vat';

							if (format === 'vatId') {
								body.vatId = this.getNodeParameter('vatId', i) as string;
							}
							if (format === 'ccid') {
								body.countryCode = this.getNodeParameter('countryCode', i) as string;
								body.id = this.getNodeParameter('id', i) as string;
							}
						}
						if (operation === 'verifyDomain') {
							operation = 'verify/domain';
							body.domain = this.getNodeParameter('domain', i) as string;
						}
						if (operation === 'verifyEmail') {
							operation = 'validate/email';
							body.email = this.getNodeParameter('email', i) as string;
						}
						if (operation === 'verifyIBAN') {
							operation = 'validate/iban';
							body.iban = this.getNodeParameter('iban', i) as string;
						}
						if (operation === 'verifyBIC') {
							operation = 'validate/bic';
							body.bic = this.getNodeParameter('bic', i) as string;
						}
						if (operation === 'verifyGeoLocation') {
							operation = 'validate/geolocation';
							body.address = this.getNodeParameter('address', i) as string;
						}
						break;
					case 'calculate':
						if (operation === 'bmi') {
							body.weight = this.getNodeParameter('weight', i) as string;
							body.height = this.getNodeParameter('height', i) as string;
						}
						if (operation === 'geodistance') {
							body.startPoint = this.getNodeParameter('startPoint', i) as string;
							body.endPoint = this.getNodeParameter('endPoint', i) as string;
						}
						if (operation === 'geodistanceV2') {
							operation = 'geodistance-v2';
							body.startPoint = this.getNodeParameter('startPoint', i) as string;
							body.endPoint = this.getNodeParameter('endPoint', i) as string;
						}
						break;
					case 'code':
						body.code = this.getNodeParameter('code', i) as string;
						if (operation === 'async-python') {
							body.sendTo = this.getNodeParameter('sendTo', i) as string;

							const requirementsUI = this.getNodeParameter('requirementsUI', i) as IDataObject;
							const requirementsValues = requirementsUI.requirementsValues as IDataObject[];

							body.requirements = mapArrayOfObjectsToStringArray(requirementsValues);
						}

						break;
					case 'convert':
						if (operation === 'iptogeo') {
							body.ip = this.getNodeParameter('ip', i) as string;
						}
						if (operation === 'nationiso') {
							const op = this.getNodeParameter('nationisoop', 0) as string;

							if (op === 'nation') {
								body.nation = this.getNodeParameter('nation', i) as string;
							}
							if (op === 'iso') {
								body.iso = this.getNodeParameter('iso', i) as string;
							}
						}
						if (operation === 'msgtojson') {
							const op = this.getNodeParameter('urlbuffertype', 0) as string;

							if (op === 'buffer') {
								body.buffer = this.getNodeParameter('buffer', i) as string;
							}
							if (op === 'url') {
								body.url = this.getNodeParameter('url', i) as string;
							}
						}
						if (operation === 'currency') {
							body.amount = this.getNodeParameter('amount', i) as string;
							body.sourceCurrency = this.getNodeParameter('sourceCurrency', i) as string;
							body.targetCurrency = this.getNodeParameter('targetCurrency', i) as string;
							body.date = this.getNodeParameter('date', i);
						}
						if (operation === 'csvtoarray') {
							operation = 'csv/array';
							body.csv = this.getNodeParameter('csv', i) as string;

							const options = this.getNodeParameter('options', i) as IDataObject;
							if (options.delimiter) body.delimiter = options.delimiter;
							if (options.omitFirstRow) body.omitFirstRow = options.omitFirstRow;
						}
						if (operation === 'csvtojson') {
							operation = 'csv/json';
							body.csv = this.getNodeParameter('csv', i) as string;

							const options = this.getNodeParameter('options', i) as IDataObject;
							if (options.delimiter) body.delimiter = options.delimiter;
							if (options.trim) body.trim = options.trim;
							if (options.noheader) body.noheader = options.noheader;
							if (options.ignoreEmpty) body.ignoreEmpty = options.ignoreEmpty;
						}
						break;
					case 'crypto':
						if (operation === 'encrypt' || operation === 'hash') {
							body.message = this.getNodeParameter('message', i) as string;
						}
						if (operation === 'decrypt') {
							body.ciphertext = this.getNodeParameter('ciphertext', i) as string;
						}
						if (operation === 'decrypt' || operation === 'encrypt') {
							body.cryptoType = this.getNodeParameter('cryptoType', i) as string;
						}
						if (operation === 'hash') {
							body.hashType = this.getNodeParameter('hashType', i) as string;
						}
						body.secretKey = this.getNodeParameter('secretKey', i) as string;
						break;
					case 'generate':
						if (operation === 'number') {
							body.type = this.getNodeParameter('type', i) as string;
							body.type = [
								this.getNodeParameter('rangeStart', i) as number,
								this.getNodeParameter('rangeEnd', i) as number,
							];
						}

						if (operation === 'string') {
							body.length = this.getNodeParameter('length', i) as number;
							body.type = this.getNodeParameter('type', i) as number;
						}
						if (operation === 'qrcode') {
							const qrcodeop = this.getNodeParameter('qrcodeop', i) as string;
							operation = `${operation}/${qrcodeop}`;

							if (qrcodeop === 'encode') {
								body.data = this.getNodeParameter('data', i) as string;
							}

							if (qrcodeop === 'decode') {
								body.url = this.getNodeParameter('url', i) as string;
							}
						}
						if (operation === 'shortenedUrl') {
							const shortenedurlop = this.getNodeParameter('shortenedurlop', i) as string;
							operation = `${operation}/${shortenedurlop}`;

							if (shortenedurlop === 'add' || shortenedurlop === 'put') {
								body.destination = this.getNodeParameter('destination', i) as number;
							}
							if (shortenedurlop === 'add') {
								body.custom = this.getNodeParameter('custom', i) as number;
							}
							if (shortenedurlop === 'del' || shortenedurlop === 'put') {
								body.identifier = this.getNodeParameter('identifier', i) as number;
							}
						}
						if (operation === 'color') {
							body.hue = this.getNodeParameter('hue', i) as string;
							body.luminosity = this.getNodeParameter('luminosity', i) as string;
							body.count = this.getNodeParameter('count', i) as number;
							body.seed = this.getNodeParameter('seed', i) as string;
							body.format = this.getNodeParameter('format', i) as string;
							body.alpha = this.getNodeParameter('alpha', i) as number;
						}

						if (operation === 'html-scrape') {
							body.url = this.getNodeParameter('url', i) as string;
							body.textOnly = this.getNodeParameter('textOnly', i) as boolean;
						}

						if (operation === 'jsonwebtoken-decode') {
							operation = 'jsonwebtoken/decode';
							body.token = this.getNodeParameter('token', i) as string;
							body.verify = this.getNodeParameter('verify', i) as boolean;
							body.secret = this.getNodeParameter('secret', i) as string;
							body.options = this.getNodeParameter('options', i) as string;
						}

						if (operation === 'jsonwebtoken-encode') {
							operation = 'jsonwebtoken/encode';
							body.data = this.getNodeParameter('data', i) as string;
							body.secret = this.getNodeParameter('secret', i) as string;
							body.options = this.getNodeParameter('options', i) as string;
						}

						if (operation === 'mockdata-user') {
							operation = 'mockdata/user';
							body.amount = this.getNodeParameter('amount', i) as number;
							body.emailRequired = this.getNodeParameter('emailRequired', i) as boolean;
							body.avatarRequired = this.getNodeParameter('avatarRequired', i) as boolean;
							body.passwordRequired = this.getNodeParameter('passwordRequired', i) as boolean;
							body.birthDateRequired = this.getNodeParameter('birthDateRequired', i) as boolean;
							body.usernameRequired = this.getNodeParameter('usernameRequired', i) as boolean;
							body.addressRequired = this.getNodeParameter('addressRequired', i) as boolean;
							body.phoneRequired = this.getNodeParameter('phoneRequired', i) as boolean;
							body.createdAtRequired = this.getNodeParameter('createdAtRequired', i) as boolean;
							body.balanceRequired = this.getNodeParameter('balanceRequired', i) as boolean;
						}

						if (operation === 'picture') {
							body.keyword = this.getNodeParameter('keyword', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
						}
						break;
					case 'operator':
						if (operation === 'gender') {
							body.firstname = this.getNodeParameter('firstname', i) as string;
						}
						if (operation === 'splitname') {
							body.name = this.getNodeParameter('name', i) as string;
						}
						if (
							operation === 'urlexpander' ||
							operation === 'parseurlquery' ||
							operation === 'logo'
						) {
							body.url = this.getNodeParameter('url', i) as string;
						}
						if (operation === 'advancedswitch') {
							const external = this.getNodeParameter('external', i) as boolean;
							body.external = external;

							if (!external) {
								try {
									const json = JSON.parse(this.getNodeParameter('adsJson', i) as string);
									body.json = json;
								} catch (error) {
									throw error;
								}
							} else {
								body.json = this.getNodeParameter('urlJson', i) as string;
							}
							body.key = (this.getNodeParameter('key', i) as string).split(/\r?\n/);
						}
						if (operation === 'scheduler') {
							body.sendToWebhook = this.getNodeParameter('sendToWebhook', i) as string;
							body.data = this.getNodeParameter('data', i) as string;
							body.intervalType = this.getNodeParameter('intervalType', i) as number;

							if (body.intervalType === 1) {
								body.intervalOptions = this.getNodeParameter('onetime', i) as string;
							}
							if (body.intervalType === 2) {
								body.intervalOptions = this.getNodeParameter('multipletimes', i) as string[];
							}
							if (body.intervalType === 3) {
								body.intervalOptions = this.getNodeParameter('cronjob', i) as string;
							}
							if (body.intervalType === 4) {
								body.intervalOptions = this.getNodeParameter('posthook', i) as string;
							}
						}
						if (operation === 'thumbnail') {
							body.url = this.getNodeParameter('url', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}
						if (operation === 'utm') {
							const utmop = this.getNodeParameter('utmop', i) as string;
							operation = `${operation}/${utmop}`;

							body.url = this.getNodeParameter('url', i) as string;

							if (utmop === 'build') {
								const utm = {
									utm_source: this.getNodeParameter('utm_source', i) as string,
									utm_medium: this.getNodeParameter('utm_medium', i) as string,
									utm_campaign: this.getNodeParameter('utm_campaign', i) as string,
									utm_content: this.getNodeParameter('utm_content', i) as string,
								};
								body.utm = utm;
							}
						}
						break;
					case 'pdf':
						if (operation === 'count' || operation === 'split') {
							const dataType = this.getNodeParameter('datatype', i) as string;

							if (dataType === 'url') {
								body.url = this.getNodeParameter('datatype', i) as string;
							}

							if (dataType === 'buffer') {
								body.buffer = this.getNodeParameter('buffer', i) as string;
							}
						}
						if (operation === 'split') {
							const splitMethod = this.getNodeParameter('splitmethod', i) as string;

							if (splitMethod === 'pageranges') {
								body.type = this.getNodeParameter('type', i) as number;
							}

							if (splitMethod === 'interval') {
								body.interval = this.getNodeParameter('interval', i) as number;
							}
						}
						if (operation === 'merge') {
							const files = this.getNodeParameter('files', i) as MergeFiles[];

							body.files = files.map((element) => {
								const newElement = {} as {
									url?: string;
									buffer?: string;
									pages?: string[];
								};

								if (/\bhttps?:\/\/.*?\.[a-z]{2,4}\b\S*/g.test(element.files.filetype)) {
									newElement.url = element.files.filetype;
								} else {
									newElement.buffer = element.files.filetype;
								}

								if (element.files.pages && Array.isArray(element.files.pages)) {
									newElement.pages = element.files.pages.map(
										(pages) => `${pages.startPage}-${pages.endPage}`,
									);
								}

								return newElement;
							});

							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
						}
						if (operation === 'html') {
							const htmlSource = this.getNodeParameter('htmlSource', i) as string;

							if (htmlSource === 'url') body.url = this.getNodeParameter('htmlUrl', i) as string;
							if (htmlSource === 'html') body.url = this.getNodeParameter('htmlCode', i) as string;
							body.options = this.getNodeParameter('options', i) as IDataObject;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
						}

						if (operation === 'getinfometadata' || operation === 'base64') {
							body.pdf = this.getNodeParameter('pdf', i) as string;
							body.filename = this.getNodeParameter('filename', i) as string;
						}

						if (operation === 'compress') {
							const dataType = this.getNodeParameter('datatype', i) as string;
							if (dataType === 'url') {
								body.url = this.getNodeParameter('datatype', i) as string;
							}
							if (dataType === 'buffer') {
								body.buffer = this.getNodeParameter('buffer', i) as string;
							}
							body.filename = this.getNodeParameter('filename', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
						}
						if (operation === 'docx-to-pdf') {
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.filename = this.getNodeParameter('filename', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
						}
						if (operation === 'pdf-to-image') {
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.filename = this.getNodeParameter('filename', i) as string;
							body.url = this.getNodeParameter('url', i) as string;
						}
						break;
					case 'storage':
						if (operation === 'json') {
							const jsonop = this.getNodeParameter('jsonop', i) as string;
							operation = `${operation}/${jsonop}`;

							if (jsonop === 'add' || jsonop === 'put') {
								body.json = this.getNodeParameter('json', i) as string;
							}

							if (jsonop === 'get' || jsonop === 'del' || jsonop === 'put') {
								body.binId = this.getNodeParameter('buffer', i) as string;
							}
						}
						if (operation === 'globalvariables') {
							const globalvariablesop = this.getNodeParameter('globalvariablesop', i) as string;
							operation = `${operation}/${globalvariablesop}`;

							if (globalvariablesop === 'add' || globalvariablesop === 'get') {
								body.variableName = this.getNodeParameter('variableName', i) as string;
							}

							if (globalvariablesop === 'add') {
								body.variableValue = this.getNodeParameter('variableValue', i) as string;
							}
							if (globalvariablesop === 'del') {
								body.variableId = this.getNodeParameter('variableId', i) as string;
							}
						}
						if (operation === 'temp') {
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}
						if (operation === 'perm') {
							const permfilesop = this.getNodeParameter('permfilesop', i) as string;
							operation = `${operation}/${permfilesop}`;

							if (permfilesop === 'add') {
								body.fileBuffer = this.getNodeParameter('fileBuffer', i) as string;
								body.uploadName = this.getNodeParameter('uploadName', i) as string;
							}

							if (permfilesop === 'get' || permfilesop === 'del') {
								body.fileId = this.getNodeParameter('fileId', i) as string;
							}
							if (permfilesop === 'get') {
								body.getAsUrl = this.getNodeParameter('getAsUrl', i) as string;
							}
						}
						break;

					case 'dateandtime':
						if (operation === 'calendarweek') {
							body.date = this.getNodeParameter('date', i) as string;
							body.unixTimestamp = this.getNodeParameter('unixTimestamp', i) as number;
							body.year = this.getNodeParameter('year', i) as string;
							body.weekNumber = this.getNodeParameter('weekNumber', i) as number;
							body.outputFormat = this.getNodeParameter('outputFormat', i) as string;
						}
						break;
					default:
						break;
				}

				// No Code Helper
				responseData = await codeKitRequest.call(this, 'POST', `${resource}/${operation}`, body);

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.toString() });
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
