import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, ILoadOptionsFunctions, INodeExecutionData, INodePropertyOptions, INodeType, INodeTypeDescription } from 'n8n-workflow';

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
	imageFields,
	imageOperations,
	operatorFields,
	operatorOperations,
	pdfFields,
	pdfOperations,
	storageFields,
	storageOperations,
	textFields,
	textOperations,
	userFields,
	userOperations,
} from './descriptions';

import { codeKitRequest, codeKitRequestLoadOptions, InputItem, IRowKeyResponseItem, mapArrayOfObjectsToStringArray, OutputObject, transformArrayToObject } from './GenericFunctions';

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
						name: 'Image',
						value: 'image',
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
					{
						name: 'Text',
						value: 'text',
					},
					{
						name: 'User',
						value: 'user',
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
			// Date & Time
			...dateAndTimeOperations,
			...dateAndTimeFields,
			// Generate
			...generateOperations,
			...generateFields,
			// Image
			...imageOperations,
			...imageFields,
			// Operator
			...operatorOperations,
			...operatorFields,
			// PDF
			...pdfOperations,
			...pdfFields,
			// Storage
			...storageOperations,
			...storageFields,
			// Text
			...textOperations,
			...textFields,
			// User
			...userOperations,
			...userFields,
		],

	};

	methods = {
		loadOptions: {
			async getRowKey(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const resource = 'editor/make';
				const response = await codeKitRequestLoadOptions.call(this, 'GET', resource, {}) as IRowKeyResponseItem[];
				if (Array.isArray(response) && response.every(item => typeof item === 'object' && 'label' in item && 'value' in item)) {
					response.forEach((property: IRowKeyResponseItem) => {
						returnData.push({
							name: property.label,
							value: property.value,
						});
					});
				}
				return returnData;
			},
			async getCodeVariablesArray(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const rowKey = this.getCurrentNodeParameter('rowKey') as string;
				const resource = `editor/make-variables?rowKey=${rowKey}`;
				const response = await codeKitRequestLoadOptions.call(this, 'GET', resource, {});
				if (typeof response === 'object' && response !== null) {
					const variablesResponse = response as { variables: string[] };
					if (Array.isArray(variablesResponse.variables)) {
						variablesResponse.variables.forEach((variable) => {
							returnData.push({
								name: variable,
								value: variable,
							});
						});
					}
				}
				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const length = items.length;
		const qs: IDataObject = {};
		let responseData;
		for (let i = 0; i < length; i++) {
			try {
				let resource = this.getNodeParameter('resource', 0) as string;
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
						if (
							operation === 'generateJavascriptCode' ||
							operation === 'generatePythonCode'
						) {
							body.prompt = this.getNodeParameter('prompt', i) as string;
						}
						if (
							operation === 'advancedocr'
						) {
							body.url = this.getNodeParameter('url', i) as string;
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.resultType = this.getNodeParameter('resultType', i) as string;
							body.workflow = this.getNodeParameter('workflow', i) as string;
							body.language = this.getNodeParameter('language', i) as string;
							body.documentType = this.getNodeParameter('documentType', i) as string;
						}
						if (
							operation === 'extract-from-text'
						) {	
							body.text = this.getNodeParameter('text', i) as string;
							body.context = this.getNodeParameter('context', i) as string;

							const fields = this.getNodeParameter('fieldsUI', i) as IDataObject;
							const fieldsValues = fields.fieldsValues as IDataObject[];
							body.fields = fieldsValues;
						}
						if (
							operation === 'fuzzy-match'
						) {	
							body.queryString = this.getNodeParameter('queryString', i) as string;
							body.context = this.getNodeParameter('context', i) as string;

							const targetListUI = this.getNodeParameter('targetListUI', i) as IDataObject;
							const targetList = targetListUI.targetList as IDataObject[] || [];

							const targetListStrings = Array.isArray(targetList) ? targetList.map(item => item.entry) : [];
							
							const optionsList = this.getNodeParameter('optionsListUI', i) as IDataObject;
							const options = optionsList.options as IDataObject;
							
							body.options = options
							body.targetList = targetListStrings;
						}
						if (
							operation === 'redact-pdf'
						) {	
							body.url = this.getNodeParameter('url', i) as string;
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.sensitiveContent = this.getNodeParameter('sensitiveContent', i) as string;
							body.fileName = this.getNodeParameter('fileName', i) as string;
							body.language = this.getNodeParameter('language', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
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
						if (operation === 'validatePhonenumber') {
							operation = 'validate/phonenumber';
							body.phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
							body.countryCode = this.getNodeParameter('countryCode', i) as string;
						}
						if (operation === 'facturxEmbed') {
							operation = 'facturx/embed';
							body.url = this.getNodeParameter('url', i) as string;
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.xml = this.getNodeParameter('xml', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.fileName = this.getNodeParameter('fileName', i) as string;

							console.log("This is the xml", body.xml)
							console.dir(body, {depth: null})
						}
						if (operation === 'facturxValidate') {
							operation = 'facturx/validate';
							body.url = this.getNodeParameter('url', i) as string;
							body.buffer = this.getNodeParameter('buffer', i) as string;
							
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
						if (operation !== 'run-js-scripts-hosted-on-0codekit') {
							body.code = this.getNodeParameter('code', i) as string;
						}
						if (operation === 'async-python') {
							body.sendTo = this.getNodeParameter('sendTo', i) as string;

							const requirementsUI = this.getNodeParameter('requirementsUI', i) as IDataObject;
							const requirementsValues = requirementsUI.requirementsValues as IDataObject[];

							body.requirements = mapArrayOfObjectsToStringArray(requirementsValues);
						}

						if (operation === 'run-js-scripts-hosted-on-0codekit') {

							resource = 'editor';
							operation = 'make';
							const rowKey = this.getNodeParameter('rowKey', i) as string;
							qs.rowKey = rowKey;

							const variablesUI = this.getNodeParameter('codeVariablesUi', i) as IDataObject;
							const codeVariablesValues = variablesUI.codeVariablesValues;
							if (codeVariablesValues) {
								const inputArray = codeVariablesValues as InputItem[];
								const transformedObject: OutputObject = transformArrayToObject(inputArray);
								Object.assign(body, transformedObject);
							}
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
							body.dateFormat = this.getNodeParameter('dateFormat', i);
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
						if (operation === 'htmlparser') {
							operation = operation + '/get';
							body.html = this.getNodeParameter('html', i) as string;
							body.url = this.getNodeParameter('url', i) as string;
							body.all = this.getNodeParameter('all', i) as boolean;
							body.selector = this.getNodeParameter('selector', i) as string;
							body.tagSelector = this.getNodeParameter('tagSelector', i) as string;
							body.idSelector = this.getNodeParameter('idSelector', i) as string;
							body.classSelector = this.getNodeParameter('classSelector', i) as string;
						}
						if (operation === 'trafficlight') {
							body.name = this.getNodeParameter('name', i) as string;
							body.interval = this.getNodeParameter('interval', i) as number;
						}
						break;
					case 'pdf':
						if (operation === 'count' || operation === 'split') {
							const dataType = this.getNodeParameter('datatype', i) as string;

							if (dataType === 'url') {
								body.url = this.getNodeParameter('url', i) as string;
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
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}

						if (operation === 'compress') {
							const dataType = this.getNodeParameter('datatype', i) as string;
							if (dataType === 'url') {
								body.url = this.getNodeParameter('url', i) as string;
							}
							if (dataType === 'buffer') {
								body.buffer = this.getNodeParameter('buffer', i) as string;
							}
							body.fileName = this.getNodeParameter('fileName', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
						}
						if (operation === 'docx-to-pdf') {
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.fileName = this.getNodeParameter('fileName', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
						}
						if (operation === 'pdf-to-image') {
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.fileName = this.getNodeParameter('fileName', i) as string;
							body.url = this.getNodeParameter('url', i) as string;
						}
						//pages
						if (operation === 'pages') {
							const pageOperation = this.getNodeParameter('pagesop', i) as string;
							operation = `${operation}/${pageOperation}`;
							body.url = this.getNodeParameter('url', i) as string;
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.fileName = this.getNodeParameter('fileName', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as string;

							if (pageOperation === 'rotate') {
								body.rotate = this.getNodeParameter('rotate', i) as string;
								body.pages = this.getNodeParameter('pages', i) as string;
							}
							if (pageOperation === 'remove') {
								// Leave empty
								body.pages = this.getNodeParameter('pages', i) as string;
							}
							if (pageOperation === 'resize') {

								body.width = this.getNodeParameter('width', i) as string;
								body.height = this.getNodeParameter('height', i) as string;
								body.pages = this.getNodeParameter('pages', i) as string;
							}
							if (pageOperation === 'add') {
								body.width = this.getNodeParameter('width', i) as string;
								body.height = this.getNodeParameter('height', i) as string;
								const pageIndices = this.getNodeParameter('pages', i) as number[];
								body.pages = pageIndices;
							}
						}
						if (operation === 'draw') {
							const drawOperation = this.getNodeParameter('drawop', i) as string;
							operation = `${operation}/${drawOperation}`;
							body.url = this.getNodeParameter('url', i) as string;
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.fileName = this.getNodeParameter('fileName', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.pages = this.getNodeParameter('pages', i) as string;
							body.anchor = this.getNodeParameter('anchor', i) as string;
							body.anchor = this.getNodeParameter('align', i) as string;
							body.x = this.getNodeParameter('x', i) as number;
							body.y = this.getNodeParameter('y', i) as number;
							body.rotate = this.getNodeParameter('rotate', i) as string;
							body.pages = this.getNodeParameter('pages', i) as string;

							if (drawOperation === 'image') {
								body.imageUrl = this.getNodeParameter('imageUrl', i) as string;
								body.imageBuffer = this.getNodeParameter('imageBuffer', i) as string;
								body.width = this.getNodeParameter('width', i) as string;
								body.height = this.getNodeParameter('height', i) as string;
							}
							if (drawOperation === 'text') {
								body.text = this.getNodeParameter('text', i) as string;
								body.size = this.getNodeParameter('size', i) as string;
								body.color = this.getNodeParameter('color', i) as string;
								body.font = this.getNodeParameter('font', i) as string;
							}

						}
						if (operation === 'watermark') {
							const watermarkOperation = this.getNodeParameter('watermarkop', i) as string;
							operation = `${operation}/${watermarkOperation}`;
							body.url = this.getNodeParameter('url', i) as string;
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.fileName = this.getNodeParameter('fileName', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.pages = this.getNodeParameter('pages', i) as string;
							body.anchor = this.getNodeParameter('anchor', i) as string;
							body.anchor = this.getNodeParameter('align', i) as string;
							body.x = this.getNodeParameter('x', i) as number;
							body.y = this.getNodeParameter('y', i) as number;
							body.rotate = this.getNodeParameter('rotate', i) as number;
							body.spacing = this.getNodeParameter('spacing', i) as number;
							body.opacity = this.getNodeParameter('opacity', i) as number;
							body.pages = this.getNodeParameter('pages', i) as string;
							body.repeat = this.getNodeParameter('repeat', i) as string;

							if (watermarkOperation === 'image') {
								body.imageUrl = this.getNodeParameter('imageUrl', i) as string;
								body.imageBuffer = this.getNodeParameter('imageBuffer', i) as string;
								body.width = this.getNodeParameter('width', i) as string;
								body.height = this.getNodeParameter('height', i) as string;
							}
							if (watermarkOperation === 'text') {
								body.text = this.getNodeParameter('text', i) as string;
								body.size = this.getNodeParameter('size', i) as string;
								body.color = this.getNodeParameter('color', i) as string;
								body.font = this.getNodeParameter('font', i) as string;
							}
						}
						if (operation === 'metadata') {
							const metadataOperation = this.getNodeParameter('metadataop', i) as string;
							operation = `${operation}/${metadataOperation}`;
							body.url = this.getNodeParameter('url', i) as string;
							body.buffer = this.getNodeParameter('buffer', i) as string;

							if (metadataOperation === 'info') {

							}
							if (metadataOperation === 'edit') {
								body.fileName = this.getNodeParameter('fileName', i) as string;
								body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
								body.title = this.getNodeParameter('title', i) as string;
								body.author = this.getNodeParameter('author', i) as string;
								body.subject = this.getNodeParameter('subject', i) as string;
								body.keywords = this.getNodeParameter('keywords', i) as string;
							}
							
						}
						if (operation === 'encrypt') {
							body.url = this.getNodeParameter('url', i) as string;
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.userPassword = this.getNodeParameter('userPassword', i) as string;
							body.ownerPassword = this.getNodeParameter('ownerPassword', i) as string;

						}
						if (operation === 'decrypt') {
							body.url = this.getNodeParameter('url', i) as string;
							body.buffer = this.getNodeParameter('buffer', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.password = this.getNodeParameter('password', i) as string;
						}
						if (operation === 'create') {
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.pages = this.getNodeParameter('pages', i) as number;
							body.width = this.getNodeParameter('width', i) as number;
							body.height = this.getNodeParameter('height', i) as number;
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}
						if (operation === 'markdowntostring') {
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.markdowntostring = this.getNodeParameter('markdownString', i) as string;
							body.css = this.getNodeParameter('css', i) as string;
							body.fileName = this.getNodeParameter('fileName', i) as string;
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
						if (operation === 'detailperiod') {
							body.startDate = this.getNodeParameter('startDate', i) as string;
							body.duration = this.getNodeParameter('duration', i) as number;
						}
						if (operation === 'holidays') {
							body.year = this.getNodeParameter('year', i) as string;
							body.countryCode = this.getNodeParameter('countryCode', i) as string;
							body.state = this.getNodeParameter('state', i) as string;
						}
						if (operation === 'isweekend') {
							body.dayNumber = this.getNodeParameter('dayNumber', i) as number;
							body.weekDay = this.getNodeParameter('weekDay', i) as string;
							body.isWeekend = this.getNodeParameter('isWeekend', i) as boolean;
						}
						if (operation === 'month') {
							const options = {
								timeStamp: false,
								iso: false,
							};
							options.timeStamp = this.getNodeParameter('timeStamp', i) as boolean;
							options.iso = this.getNodeParameter('iso', i) as boolean;
							body.date = this.getNodeParameter('date', i) as string;
							body.dateFormat = this.getNodeParameter('dateFormat', i) as string;
							body.outputFormat = this.getNodeParameter('outputFormat', i) as string;
							body.month = this.getNodeParameter('month', i) as string;
							body.year = this.getNodeParameter('year', i) as string;
							body.options = options;
						}
						if (operation === 'switchtimezone') {
							body.inputTime = this.getNodeParameter('inputTime', i) as string;
							body.inputTimeZone = this.getNodeParameter('inputTimeZone', i) as string;
							body.formatPattern = this.getNodeParameter('formatPattern', i) as string;
							body.destinationTimeZone = this.getNodeParameter('destinationTimeZone', i) as string;
						}
						break;

					case 'image':
						if (operation === 'blur' || operation === 'sharpen') {
							const dataType = this.getNodeParameter('urlbuffertype', i) as string;
							if (dataType === 'url') {
								body.url = this.getNodeParameter('url', i) as string;
							}
							if (dataType === 'buffer') {
								body.buffer = this.getNodeParameter('buffer', i) as string;
							}
							body.sigma = this.getNodeParameter('sigma', i) as number;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}
						if (operation === 'convert') {
							const dataType = this.getNodeParameter('urlbuffertype', i) as string;
							if (dataType === 'url') {
								body.url = this.getNodeParameter('url', i) as string;
							}
							if (dataType === 'buffer') {
								body.buffer = this.getNodeParameter('buffer', i) as string;
							}
							body.outputFormat = this.getNodeParameter('outputFormat', i) as string;
							body.withMetaData = this.getNodeParameter('withMetaData', i) as boolean;
							body.options = this.getNodeParameter('options', i) as IDataObject;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}
						if (operation === 'crop') {
							const dataType = this.getNodeParameter('urlbuffertype', i) as string;
							if (dataType === 'url') {
								body.url = this.getNodeParameter('url', i) as string;
							}
							if (dataType === 'buffer') {
								body.buffer = this.getNodeParameter('buffer', i) as string;
							}
							body.axis = this.getNodeParameter('axis', i) as string;
							body.options = this.getNodeParameter('options', i) as IDataObject;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}
						if (operation === 'exif') {
							const dataType = this.getNodeParameter('urlbuffertype', i) as string;
							if (dataType === 'url') {
								body.url = this.getNodeParameter('url', i) as string;
							}
							if (dataType === 'buffer') {
								body.buffer = this.getNodeParameter('buffer', i) as string;
							}
						}
						if (operation === 'flip') {
							const dataType = this.getNodeParameter('urlbuffertype', i) as string;
							if (dataType === 'url') {
								body.url = this.getNodeParameter('url', i) as string;
							}
							if (dataType === 'buffer') {
								body.buffer = this.getNodeParameter('buffer', i) as string;
							}
							body.axis = this.getNodeParameter('axis', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}
						if (operation === 'html') {
							const dataType = this.getNodeParameter('htmlurltype', i) as string;
							if (dataType === 'url') {
								body.url = this.getNodeParameter('url', i) as string;
							}
							if (dataType === 'html') {
								body.html = this.getNodeParameter('html', i) as string;
							}
							body.options = this.getNodeParameter('options', i) as IDataObject;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}
						if (operation === 'overlay') {
							body.frontImageUrl = this.getNodeParameter('frontImageUrl', i) as string;
							body.backImageUrl = this.getNodeParameter('backImageUrl', i) as string;
							body.position = this.getNodeParameter('position', i) as string;
							body.options = this.getNodeParameter('options', i) as IDataObject;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}
						if (operation === 'resize') {
							const dataType = this.getNodeParameter('urlbuffertype', i) as string;
							if (dataType === 'url') {
								body.url = this.getNodeParameter('url', i) as string;
							}
							if (dataType === 'buffer') {
								body.buffer = this.getNodeParameter('buffer', i) as string;
							}
							body.width = this.getNodeParameter('width', i) as number;
							body.height = this.getNodeParameter('height', i) as number;
							body.options = this.getNodeParameter('options', i) as IDataObject;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}
						if (operation === 'rotate') {
							const dataType = this.getNodeParameter('urlbuffertype', i) as string;
							if (dataType === 'url') {
								body.url = this.getNodeParameter('url', i) as string;
							}
							if (dataType === 'buffer') {
								body.buffer = this.getNodeParameter('buffer', i) as string;
							}
							body.angle = this.getNodeParameter('angle', i) as number;
							body.background = this.getNodeParameter('background', i) as string;
							body.getAsUrl = this.getNodeParameter('getAsUrl', i) as boolean;
							body.fileName = this.getNodeParameter('fileName', i) as string;
						}
						break;
					case 'text':
						if (operation === 'comparestring') {
							body.string1 = this.getNodeParameter('string1', i) as string;
							body.string2 = this.getNodeParameter('string2', i) as string;
							body.algorithm = this.getNodeParameter('algorithm', i) as string;
						}
						if (operation === 'contains') {
							body.text = this.getNodeParameter('text', i) as string;
							body.keyword = this.getNodeParameter('keyword', i) as string;
							// remove space, and then split by comma
							const keywordList = (this.getNodeParameter('keywordList', i) as string)
								.trim()
								.split(',');
							body.keywordList = keywordList;
							const options = {
								caseSensitive: false,
								onlyCompleteWords: false,
							};
							options.caseSensitive = this.getNodeParameter('caseSensitive', i) as boolean;
							options.onlyCompleteWords = this.getNodeParameter('onlyCompleteWords', i) as boolean;
							body.options = options;
						}
						if (operation === 'extractor') {
							body.start = this.getNodeParameter('start', i) as string;
							body.end = this.getNodeParameter('end', i) as string;
							body.body = this.getNodeParameter('body', i) as string;
							body.greedy = this.getNodeParameter('greedy', i) as boolean;
						}
						if (operation === 'regex') {
							body.text = this.getNodeParameter('text', i) as string;
							body.expression = this.getNodeParameter('end', i) as string;
						}
						break;
					case 'user':
						if (operation === 'getipaddress') {
							// no body
						}
						if (operation === 'retrievecredits') {
							// no body
						}
						break;
					default:
						break;
				}

				// No Code Helper
				responseData = await codeKitRequest.call(this, 'POST', `${resource}/${operation}`, body, qs);

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
