const getEstimate = async () => {
  const payload = {
      CalculationCriteria: {
        applicationNo: "WS_AP/107/2025-26/000074",
        tenantId: "mp.indore",
       waterConnection: {
				"id": "d252ea9d-933f-4562-b06a-4a84c2292fc5",
				"tenantId": "mp.indore",
				"propertyId": "PG-PT-2025-08-15-002387",
				"applicationNo": "WS_AP/107/2025-26/000074",
				"applicationStatus": "PENDING_FOR_DOCUMENT_VERIFICATION",
				"status": "Active",
				"connectionNo": null,
				"oldConnectionNo": null,
				"documents": [
					{
						"id": "c0147d02-6a5b-44d5-99c6-a6cb174a4712",
						"documentType": "OWNER.IDENTITYPROOF.VOTERID",
						"fileStoreId": "259af2cc-5457-45bf-a966-a4b4d44a696a",
						"documentUid": "c0147d02-6a5b-44d5-99c6-a6cb174a4712",
						"auditDetails": null,
						"status": "ACTIVE"
					},
					{
						"id": "49f2029e-25c4-43b5-813e-33509dd9c274",
						"documentType": "OWNER.ADDRESSPROOF.DL",
						"fileStoreId": "79375f59-4056-4c83-bac2-78a5a1eb36c3",
						"documentUid": "49f2029e-25c4-43b5-813e-33509dd9c274",
						"auditDetails": null,
						"status": "ACTIVE"
					},
					{
						"id": "8ce2c06f-90f9-4e28-96ad-95b08b6f8faf",
						"documentType": "ELECTRICITY_BILL",
						"fileStoreId": "5abdd8f1-7c01-4265-882f-464cd2735b03",
						"documentUid": "8ce2c06f-90f9-4e28-96ad-95b08b6f8faf",
						"auditDetails": null,
						"status": "ACTIVE"
					},
					{
						"id": "90668251-6902-491e-a9f7-1aafcf777e19",
						"documentType": "PLUMBER_REPORT_DRAWING",
						"fileStoreId": "2a749f52-d8c8-4c02-b14d-0ce0f21824e9",
						"documentUid": "90668251-6902-491e-a9f7-1aafcf777e19",
						"auditDetails": null,
						"status": "ACTIVE"
					}
				],
				"plumberInfo": null,
				"roadType": null,
				"roadCuttingArea": 0,
				"roadCuttingInfo": null,
				"connectionExecutionDate": 0,
				"connectionCategory": null,
				"connectionType": null,
				"additionalDetails": {
					"locality": "SUN35",
					"ownerName": "Test Test Test",
					"adhocRebate": null,
					"adhocPenalty": null,
					"appCreatedDate": 1758869783760,
					"adhocRebateReason": null,
					"detailsProvidedBy": "",
					"adhocPenaltyReason": null,
					"adhocRebateComment": null,
					"adhocPenaltyComment": null,
					"initialMeterReading": null,
					"sanctionFileStoreId": null,
					"estimationLetterDate": null,
					"estimationFileStoreId": null
				},
				"auditDetails": {
					"createdBy": "566349f1-a4d3-4a66-b7a7-925e3896ff1a",
					"lastModifiedBy": "566349f1-a4d3-4a66-b7a7-925e3896ff1a",
					"createdTime": 1758869783760,
					"lastModifiedTime": 1758869784003
				},
				"processInstance": {
					"id": null,
					"tenantId": null,
					"businessService": "NewWS1",
					"businessId": null,
					"action": "SUBMIT_APPLICATION",
					"moduleName": "ws-services",
					"state": null,
					"comment": null,
					"documents": null,
					"assignes": null
				},
				"applicationType": "NEW_WATER_CONNECTION",
				"dateEffectiveFrom": 0,
				"connectionHolders": null,
				"oldApplication": false,
				"channel": "CFC_COUNTER",
				"disconnectionExecutionDate": 0,
				"waterSource": null,
				"meterId": null,
				"meterInstallationDate": 0,
				"proposedPipeSize": 0.25,
				"proposedTaps": 1,
				"pipeSize": 0,
				"noOfTaps": 0,
				"isDisconnectionTemporary": false,
				"disconnectionReason": null,
				"property": {
					"id": "d39841a2-4b44-430b-a9ff-4a0c54fd956c",
					"propertyId": "PG-PT-2025-08-15-002387",
					"surveyId": null,
					"linkedProperties": null,
					"tenantId": "mp.indore",
					"accountId": "566349f1-a4d3-4a66-b7a7-925e3896ff1a",
					"oldPropertyId": null,
					"status": "ACTIVE",
					"address": {
						"tenantId": "mp.indore",
						"doorNo": "49",
						"plotNo": null,
						"id": "6ed93445-e11f-499f-9003-c7dd0136fe7e",
						"landmark": null,
						"city": "City B",
						"district": null,
						"region": null,
						"state": null,
						"country": null,
						"pincode": "",
						"buildingName": null,
						"street": "Waterfront",
						"locality": {
							"code": "SUN35",
							"name": "Bigharwal Chowk to Railway Station - Area2",
							"label": "Locality",
							"latitude": null,
							"longitude": null,
							"area": "Area2",
							"children": [],
							"materializedPath": null
						},
						"geoLocation": {
							"latitude": 0,
							"longitude": 0
						},
						"additionalDetails": null
					},
					"acknowldgementNumber": "PG-AC-2025-08-15-002460",
					"propertyType": "BUILTUP.INDEPENDENTPROPERTY",
					"ownershipCategory": "INDIVIDUAL.SINGLEOWNER",
					"owners": [
						{
							"id": null,
							"uuid": "d9c9e79b-7599-41a1-8fce-8cc9e6ca9993",
							"userName": "91419f50-600b-4054-b439-ce09b6ea0edc",
							"password": null,
							"salutation": null,
							"name": "Test Test Test",
							"gender": "MALE",
							"mobileNumber": "9999999999",
							"emailId": "abc@abc.com",
							"altContactNumber": null,
							"pan": null,
							"aadhaarNumber": null,
							"permanentAddress": "Bigharwal Chowk to Railway Station - Area2",
							"permanentCity": null,
							"permanentPinCode": null,
							"correspondenceCity": null,
							"correspondencePinCode": null,
							"correspondenceAddress": "49",
							"active": true,
							"dob": null,
							"pwdExpiryDate": 1763012872000,
							"locale": null,
							"type": "CITIZEN",
							"signature": null,
							"accountLocked": false,
							"roles": [
								{
									"id": null,
									"name": "Citizen",
									"code": "CITIZEN",
									"tenantId": "mp"
								}
							],
							"fatherOrHusbandName": "Test",
							"bloodGroup": null,
							"identificationMark": null,
							"photo": null,
							"createdBy": "9871",
							"createdDate": 1755236872000,
							"lastModifiedBy": "9874",
							"lastModifiedDate": 1755237067000,
							"tenantId": "mp",
							"alternatemobilenumber": null,
							"ownerInfoUuid": "fdf38bb3-72de-4d1d-a17c-c14f72308dd0",
							"isPrimaryOwner": null,
							"ownerShipPercentage": null,
							"ownerType": "NONE",
							"institutionId": null,
							"status": "ACTIVE",
							"documents": [
								{
									"id": "609702c2-c84b-4313-9e9b-f6089a651c90",
									"documentType": "OWNER.IDENTITYPROOF.AADHAAR",
									"fileStoreId": "15df7f21-7756-4bec-b62a-ad61e1109f1d",
									"documentUid": "15df7f21-7756-4bec-b62a-ad61e1109f1d",
									"auditDetails": null,
									"status": "ACTIVE"
								}
							],
							"relationship": "FATHER"
						}
					],
					"institution": null,
					"creationReason": "CREATE",
					"usageCategory": "RESIDENTIAL",
					"noOfFloors": 1,
					"landArea": 1200,
					"superBuiltUpArea": 1200,
					"source": "MUNICIPAL_RECORDS",
					"channel": "CFC_COUNTER",
					"documents": [
						{
							"id": "a1bbd110-ac00-4a56-9597-9fc3fbb11ec0",
							"documentType": "OWNER.ADDRESSPROOF.WATERBILL",
							"fileStoreId": "1379e18a-5470-4415-948c-b1f04f3568e4",
							"documentUid": "1379e18a-5470-4415-948c-b1f04f3568e4",
							"auditDetails": null,
							"status": "ACTIVE"
						},
						{
							"id": "e45f4ee4-d060-43d8-bcee-07d7bd2da3c4",
							"documentType": "OWNER.IDENTITYPROOF.AADHAAR",
							"fileStoreId": "15df7f21-7756-4bec-b62a-ad61e1109f1d",
							"documentUid": "15df7f21-7756-4bec-b62a-ad61e1109f1d",
							"auditDetails": null,
							"status": "ACTIVE"
						},
						{
							"id": "448c4308-4b88-44ec-94b1-096ebbb03cac",
							"documentType": "OWNER.REGISTRATIONPROOF.SALEDEED",
							"fileStoreId": "b4ba9f1f-947e-4d35-8c5b-c5e52a5c3b31",
							"documentUid": "b4ba9f1f-947e-4d35-8c5b-c5e52a5c3b31",
							"auditDetails": null,
							"status": "ACTIVE"
						},
						{
							"id": "624b44e4-7042-4aba-9047-326a02f15a67",
							"documentType": "OWNER.USAGEPROOF.ELECTRICITYBILL",
							"fileStoreId": "d6980714-989d-412e-88a1-da462683944e",
							"documentUid": "d6980714-989d-412e-88a1-da462683944e",
							"auditDetails": null,
							"status": "ACTIVE"
						},
						{
							"id": "0e659111-56e7-41bb-9cac-b8f9ba07210c",
							"documentType": "OWNER.CONSTRUCTIONPROOF.BPACERTIFICATE",
							"fileStoreId": "3ef002ae-e064-4784-9567-426dd69562b6",
							"documentUid": "3ef002ae-e064-4784-9567-426dd69562b6",
							"auditDetails": null,
							"status": "ACTIVE"
						}
					],
					"units": [
						{
							"id": "4b62ec68-0060-4283-8e18-2afc10687dd0",
							"tenantId": null,
							"floorNo": 0,
							"unitType": null,
							"usageCategory": "RESIDENTIAL",
							"occupancyType": "SELFOCCUPIED",
							"active": true,
							"occupancyDate": 0,
							"constructionDetail": {
								"carpetArea": null,
								"builtUpArea": 1200,
								"plinthArea": null,
								"superBuiltUpArea": null,
								"constructionType": null,
								"constructionDate": null,
								"dimensions": null
							},
							"additionalDetails": null,
							"auditDetails": null,
							"arv": null
						}
					],
					"additionalDetails": null,
					"auditDetails": {
						"createdBy": "566349f1-a4d3-4a66-b7a7-925e3896ff1a",
						"lastModifiedBy": "c60704fc-031c-4437-9fd1-25c5aadf7671",
						"createdTime": 1755236871203,
						"lastModifiedTime": 1755237067183
					},
					"workflow": null,
					"AlternateUpdated": false,
					"isOldDataEncryptionRequest": false
				}
			}
		},
      }
    
  return{
payload
  }
}
  
  const getWSDefaultpayload = async (endpoint) => {
    let payload = {};
    switch (endpoint) {
      case "_estimate":
       payload =  getEstimate();
        break;
    
      default:
        break;
    }
    return payload;
  };
  
  export default getWSDefaultpayload;