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
				name: 'AI Advanced OCR',
				value: 'advancedocr',
				description:'Extracts text and specific data from documents with OCR support, streamlining specialized workflows',
				action: 'AI Advanced OCR',
			},
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
	// ai/
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['advancedocr'],
				resource: ['ai'],
			},
		},
		default: '',
		placeholder: 'https://example.com/document.pdf',
		description: 'The URL to the document',
	},
	{
		displayName: 'Buffer',
		name: 'buffer',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['advancedocr'],
				resource: ['ai'],
			},
		},
		default: '',
		placeholder: 'https://example.com/document.pdf',
		description: 'The URL to the document',
	},
	{
		displayName: 'Result Type',
		name: 'resultType',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['advancedocr'],
				resource: ['ai'],
			},
		},
		options: [
			{ name: 'OCR', value: 'ocr' },
			{ name: 'Extractions', value: 'extractions' },
		],
		default: 'ocr',
		description: 'Specifies the output type',
	},
	{
		displayName: 'Workflow',
		name: 'workflow',
		description:
			'A workflow outlines steps for processing documents, including analysis, extraction, and transformation. It uses unique identifiers to track and retrieve results for each document. For workflows: (OCR, OCR With Handwriting) you can only use result type OCR. For other workflows, you can use both Extractions and OCR',
		required: true,
		type: 'options',
		displayOptions: {
			show: {
				operation: ['advancedocr'],
				resource: ['ai'],
			},
		},
		options: [
			{
				name: 'Delivery Note Extraction',
				value: 'delivery_note_extraction',
			},
			{
				name: 'Invoice Extraction',
				value: 'invoice_extraction',
			},
			{
				name: 'OCR',
				value: 'ocr',
			},
			{
				name: 'OCR with Handwriting',
				value: 'ocr_with_handwriting',
			},
			{
				name: 'Receipt Extraction',
				value: 'receipt_extraction',
			},
			{
				name: 'Vehicle Registration Extraction',
				value: 'vehicle_registration_extraction',
			},
		],
		default: 'ocr',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['advancedocr'],
				resource: ['ai'],
			},
		},
		options: [
			{
				name: 'Dutch',
				value: 'nl',
			},
			{
				name: 'English',
				value: 'en',
			},
			{
				name: 'French',
				value: 'fr',
			},
			{
				name: 'German',
				value: 'de',
			},
			{
				name: 'Polish',
				value: 'pl',
			},
			{
				name: 'Spanish',
				value: 'es',
			},
			{
				name: 'Unknown',
				value: 'xx',
			},
		],
		default: 'xx',
		description: 'Language of the document',
	},
	{
		displayName: 'Document Type',
		name: 'documentType',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['advancedocr'],
				resource: ['ai'],
			},
		},
		options: [
			{
				value: 'address_change',
				name: 'Address Change',
			},
			{
				value: 'anonymization',
				name: 'Anonymization',
			},
			{
				value: 'approval_of_cost_coverage',
				name: 'Approval of Cost Coverage',
			},
			{
				value: 'arrete',
				name: 'Arrete',
			},
			{
				value: 'bailiff_notifications',
				name: 'Bailiff Notifications',
			},
			{
				value: 'bank_statement',
				name: 'Bank Statement',
			},
			{
				value: 'billing_letter',
				name: 'Billing Letter',
			},
			{
				value: 'cmr_doc',
				name: 'CMR Doc',
			},
			{
				value: 'construction_file',
				name: 'Construction File',
			},
			{
				value: 'correspondence',
				name: 'Correspondence',
			},
			{
				value: 'crane',
				name: 'Crane',
			},
			{
				value: 'credit_note',
				name: 'Credit Note',
			},
			{
				value: 'damage_notice',
				name: 'Damage Notice',
			},
			{
				value: 'death_certificate',
				name: 'Death Certificate',
			},
			{
				value: 'delivery_note',
				name: 'Delivery Note',
			},
			{
				value: 'delivery_note_construction',
				name: 'Delivery Note Construction',
			},
			{
				value: 'docuworld_form',
				name: 'Docuworld Form',
			},
			{
				value: 'dummy_text_ner',
				name: 'Dummy Text NER',
			},
			{
				value: 'enforcement_order',
				name: 'Enforcement Order',
			},
			{
				value: 'enrollment_certificate',
				name: 'Enrollment Certificate',
			},
			{
				value: 'envelope',
				name: 'Envelope',
			},
			{
				value: 'export_accompanying_document',
				name: 'Export Accompanying Document',
			},
			{
				value: 'extended_accounting_information',
				name: 'Extended Accounting Information',
			},
			{
				value: 'extended_identity_doc',
				name: 'Extended Identity Doc',
			},
			{
				value: 'hotel_invoice',
				name: 'Hotel Invoice',
			},
			{
				value: 'identity_doc',
				name: 'Identity Doc',
			},
			{
				value: 'identity_doc_with_supplementary_remarks',
				name: 'Identity Doc with Supplementary Remarks',
			},
			{
				value: 'income_tax_statement',
				name: 'Income Tax Statement',
			},
			{
				value: 'insurance_business_transaction',
				name: 'Insurance Business Transaction',
			},
			{
				value: 'insurance_doc',
				name: 'Insurance Doc',
			},
			{
				value: 'insurance_ff',
				name: 'Insurance FF',
			},
			{
				value: 'insurance_policy',
				name: 'Insurance Policy',
			},
			{
				value: 'insurance_resignation',
				name: 'Insurance Resignation',
			},
			{
				value: 'invoice',
				name: 'Invoice',
			},
			{
				value: 'invoice_construction',
				name: 'Invoice Construction',
			},
			{
				value: 'invoice_craftsperson',
				name: 'Invoice Craftsperson',
			},
			{
				value: 'invoice_czech',
				name: 'Invoice Czech',
			},
			{
				value: 'invoice_dmg',
				name: 'Invoice DMG',
			},
			{
				value: 'invoice_ner_groupings_migration',
				name: 'Invoice NER Groupings Migration',
			},
			{
				value: 'invoice_slovak',
				name: 'Invoice Slovak',
			},
			{
				value: 'invoice_with_subject',
				name: 'Invoice with Subject',
			},
			{
				value: 'invoice_w_vehicle_info',
				name: 'Invoice with Vehicle Info',
			},
			{
				value: 'legal_doc',
				name: 'Legal Doc',
			},
			{
				value: 'letter',
				name: 'Letter',
			},
			{
				value: 'loan_agreement',
				name: 'Loan Agreement',
			},
			{
				value: 'order_confirmation',
				name: 'Order Confirmation',
			},
			{
				value: 'other',
				name: 'Other',
			},
			{
				value: 'pension_information',
				name: 'Pension Information',
			},
			{
				value: 'physician_training_event',
				name: 'Physician Training Event',
			},
			{
				value: 'prepaid_credits_payout_form',
				name: 'Prepaid Credits Payout Form',
			},
			{
				value: 'private_health_insurance',
				name: 'Private Health Insurance',
			},
			{
				value: 'purchase_order',
				name: 'Purchase Order',
			},
			{
				value: 'receipt',
				name: 'Receipt',
			},
			{
				value: 'receipt_czech',
				name: 'Receipt Czech',
			},
			{
				value: 'receipt_reworked',
				name: 'Receipt Reworked',
			},
			{
				value: 'receipt_with_subject',
				name: 'Receipt with Subject',
			},
			{
				value: 'salary_statement',
				name: 'Salary Statement',
			},
			{
				value: 'sales_order',
				name: 'Sales Order',
			},
			{
				value: 'speeding_fine',
				name: 'Speeding Fine',
			},
			{
				value: 'tax_statement',
				name: 'Tax Statement',
			},
			{
				value: 'time_sheet',
				name: 'Time Sheet',
			},
			{
				value: 'vehicle_expert_report',
				name: 'Vehicle Expert Report',
			},
			{
				value: 'vehicle_purchase_contract',
				name: 'Vehicle Purchase Contract',
			},
			{
				value: 'vehicle_registration',
				name: 'Vehicle Registration',
			},
			{
				value: 'veterinarian_invoice',
				name: 'Veterinarian Invoice',
			},
			{
				value: 'wage_tax_certificate',
				name: 'Wage Tax Certificate',
			},
		],
		default: 'receipt',
		description: 'The type of the uploaded document',
	},
];