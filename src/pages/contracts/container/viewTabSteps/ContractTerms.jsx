// import React from 'react'
// import { useSelector } from 'react-redux';
// import {Button} from 'primereact/button';
// function ContractTerms() {
//     const {contractSummarySelected} = useSelector((state) => state.contract);
//     console.log(contractSummarySelected,"contractSummarySelected");
//   const selectedCompanyData= contractSummarySelected;
//     return (
//         <>
//              <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
//             <h5 className='fw-bold m-2'>Contract Billing Details</h5>
//             <Button
//               label=""
//               severity="primary"
//               icon="pi pi-plus fs-5"
//             //   onClick={addAddressActionHandler}
//               size="small"
//               className='m-2'
//             />
//           </div>
//                 <div className="formgrid grid col-12">
//                 {/* <div className="col-12 md:col-6">
//                 <p className='fw-bold'>Contract Billing Details</p>
//                 </div> */}
//      {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractBillingDetails"].length >0 && <table className="table m-2">
//                     <thead>
//                         <tr>
//                             <th className="l-width-70">BillPeriod Units</th>
//                             <th className="l-width-70">BillCycle</th>
//                             <th className="l-width-70">Start Date</th>
//                             <th className="l-width-30">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                 {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractBillingDetails"]?.map((contractBillingDetails,index) =>(
//                             <tr
//                              key={index}
//                             >
//                                 <td className="text-start">{contractBillingDetails?.billPeriodUnits}</td>
//                                 <td>{contractBillingDetails?.billCycle || ''}</td>
//                                 <td>{contractBillingDetails?.startDate || ''}</td>
//                                 <td className="text-start">
//                                   <span>
//                                         <i className="pi pi-pencil m-2"></i>
//                                         </span>
//                                         <span>
//                                         <i className="pi pi-trash"></i>
//                                         </span>
//                                 </td>
//                             </tr>
//                          ))} 
//                     </tbody>
//                 </table> 
// }
// {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractBillingDetails"].length === 0 && 
// (
//   <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
// <p className='m-4'>No data is Available</p>
// </div> )}
//                 </div>
//                 <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
//             <h5 className='fw-bold m-2'>Contract Discounts</h5>
//             <Button
//               label=""
//               severity="primary"
//               icon="pi pi-plus fs-5"
//             //   onClick={addAddressActionHandler}
//               size="small"
//               className='m-2'
//             />
//           </div>
//                 <div className="formgrid grid col-12">

//         {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractDiscounts"].length === 0 && <p>No data is Available</p> }        
//         {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractDiscounts"].length > 0  && (
//         <table className="table m-2">
//                     <thead>
//                         <tr>
//                             <th className="l-width-70">DiscountName</th>
//                             <th className="l-width-70">Start Date</th>
//                             <th className="l-width-30">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                 {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractDiscounts"]?.map((contractBillingDetails,index) =>(
//                             <tr
//                              key={index}
//                             >
//                                 <td className="text-start">{contractBillingDetails?.discountName || ''}</td>
//                                 <td>{contractBillingDetails?.startDate || ''}</td>
//                                 <td className="text-start">
//                                   <span>
//                                         <i className="pi pi-pencil m-2"></i>
//                                         </span>
//                                         <span>
//                                         <i className="pi pi-trash"></i>
//                                         </span>
//                                 </td>
//                             </tr>
//                          ))} 
//                     </tbody>
//                 </table>
// )}          
//                 </div>

//             </>
//   )
// }

// export default ContractTerms


//edit - working

// import React, { useState } from 'react';

// const EditForm = ({ initialData, onSubmit }) => {
//   const [formData, setFormData] = useState(initialData);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Bill Frequency:
//         <input
//           type="text"
//           name="billFrequency"
//           value={formData.billFrequency}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Bill Cycle:
//         <input
//           type="number"
//           name="billCycle"
//           value={formData.billCycle}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// const ContractTerms = () => {
//   const [apiPayload, setApiPayload] = useState({
//     "contractID": "211c20b0-41bf-4a07-a066-97f0c1548761",
//     "contractName": "hp-inc",
//     "relatedOrg": {
//         "organizationID": "5676ff50-e16a-4022-abaa-a10547a0d033",
//         "name": "HCL Technologies Limited 0231"
//     },
//     "startDate": "2024-01-30",
//     "endDate": null,
//     "billingCurrCode": null,
//     "notes": null,
//     "contractStatus": "ACTIVE",
//     "terminationDate": null,
//     "terminationReasonCode": null,
//     "terminationReasonNotes": null,
//     "contractAccounts": [
//         {
//             "contractAccountId": "a8fff06f-b21d-43b0-8a02-24f2b24dc259",
//             "contractAccountName": "test4",
//             "notes": null,
//             "startDate": "2024-01-30",
//             "nextBillDate": "2024-02-07",
//             "lastBillDate": null,
//             "accountStatuses": [
//                 {
//                     "accStatusId": "b2a6c47a-1e45-4172-b12e-8408205380d4",
//                     "status": "PENDING",
//                     "effectiveDate": "2024-01-12"
//                 },
//                 {
//                     "accStatusId": "a6a4aac0-5b91-4ec2-a563-8c237f929006",
//                     "status": "ACTIVE",
//                     "effectiveDate": "2024-01-30"
//                 }
//             ],
//             "contractBillingDetails": [
//                 {
//                     "cntrctBillingID": "0f4d8da4-f714-406d-a14b-0a200d216d65",
//                     "startDate": "2024-01-30",
//                     "endDate": null,
//                     "billFrequency": "Weekly",
//                     "billPeriod": 1,
//                     "billPeriodUnits": "WEEKLY",
//                     "billCycle": 4,
//                     "paymentDueDays": 1,
//                     "gracePeriodDays": null,
//                     "expensesBillBoo": true
//                 }
//             ],
//             "contractDiscounts": [],
//             "woCount": null
//         }
//     ],
//     "contractDocuments": []
// });

//   const handleFormSubmit = (updatedData) => {
//     // Clone the payload to avoid modifying the original object directly
//     const updatedPayload = { ...apiPayload };

//     // Update the properties
//     updatedPayload.contractAccounts[0].contractBillingDetails[0].billFrequency = updatedData.billFrequency;
//     updatedPayload.contractAccounts[0].contractBillingDetails[0].billCycle = updatedData.billCycle;

//     // Print the updated value in the console
//     console.log('Updated Payload:', updatedPayload);

//     // You can use updatedPayload for further processing or API calls
//   };

//   return (
//     <div>
//       <h2>Edit Form</h2>
//       <EditForm initialData={apiPayload.contractAccounts[0].contractBillingDetails[0]} onSubmit={handleFormSubmit} />
//     </div>
//   );
// };

// export default ContractTerms;


//delate is working

// import React, { useState } from 'react';

// const EditForm = ({ initialData, onSubmit }) => {
//   const [formData, setFormData] = useState(initialData);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Bill Frequency:
//         <input
//           type="text"
//           name="billFrequency"
//           value={formData.billFrequency}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Bill Cycle:
//         <input
//           type="number"
//           name="billCycle"
//           value={formData.billCycle}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// const ContractTerms = () => {
//   const [apiPayload, setApiPayload] = useState({
//     "contractID": "211c20b0-41bf-4a07-a066-97f0c1548761",
//     "contractName": "hp-inc",
//     "relatedOrg": {
//         "organizationID": "5676ff50-e16a-4022-abaa-a10547a0d033",
//         "name": "HCL Technologies Limited 0231"
//     },
//     "startDate": "2024-01-30",
//     "endDate": null,
//     "billingCurrCode": null,
//     "notes": null,
//     "contractStatus": "ACTIVE",
//     "terminationDate": null,
//     "terminationReasonCode": null,
//     "terminationReasonNotes": null,
//     "contractAccounts": [
//         {
//             "contractAccountId": "a8fff06f-b21d-43b0-8a02-24f2b24dc259",
//             "contractAccountName": "test4",
//             "notes": null,
//             "startDate": "2024-01-30",
//             "nextBillDate": "2024-02-07",
//             "lastBillDate": null,
//             "accountStatuses": [
//                 {
//                     "accStatusId": "b2a6c47a-1e45-4172-b12e-8408205380d4",
//                     "status": "PENDING",
//                     "effectiveDate": "2024-01-12"
//                 },
//                 {
//                     "accStatusId": "a6a4aac0-5b91-4ec2-a563-8c237f929006",
//                     "status": "ACTIVE",
//                     "effectiveDate": "2024-01-30"
//                 }
//             ],
//             "contractBillingDetails": [
//                 {
//                     "cntrctBillingID": "0f4d8da4-f714-406d-a14b-0a200d216d65",
//                     "startDate": "2024-01-30",
//                     "endDate": null,
//                     "billFrequency": "Weekly",
//                     "billPeriod": 1,
//                     "billPeriodUnits": "WEEKLY",
//                     "billCycle": 4,
//                     "paymentDueDays": 1,
//                     "gracePeriodDays": null,
//                     "expensesBillBoo": true
//                 }
//             ],
//             "contractDiscounts": [],
//             "woCount": null
//         }
//     ],
//     "contractDocuments": []
// });

//   const handleFormSubmit = (updatedData) => {
//     // Clone the payload to avoid modifying the original object directly
//     const updatedPayload = { ...apiPayload };

//     // Update the properties
//     updatedPayload.contractAccounts[0].contractBillingDetails[0].billFrequency = updatedData.billFrequency;
//     updatedPayload.contractAccounts[0].contractBillingDetails[0].billCycle = updatedData.billCycle;

//     // Print the updated value in the console
//     console.log('Updated Payload:', updatedPayload);

//     // You can use updatedPayload for further processing or API calls
//   };
//   const [data, setData] = useState({
//   "contractID": "211c20b0-41bf-4a07-a066-97f0c1548761",
//   "contractName": "hp-inc",
//   "relatedOrg": {
//       "organizationID": "5676ff50-e16a-4022-abaa-a10547a0d033",
//       "name": "HCL Technologies Limited 0231"
//   },
//   "startDate": "2024-01-30",
//   "endDate": null,
//   "billingCurrCode": null,
//   "notes": null,
//   "contractStatus": "ACTIVE",
//   "terminationDate": null,
//   "terminationReasonCode": null,
//   "terminationReasonNotes": null,
//   "contractAccounts": [
//       {
//           "contractAccountId": "a8fff06f-b21d-43b0-8a02-24f2b24dc259",
//           "contractAccountName": "test4",
//           "notes": null,
//           "startDate": "2024-01-30",
//           "nextBillDate": "2024-02-07",
//           "lastBillDate": null,
//           "accountStatuses": [
//               {
//                   "accStatusId": "b2a6c47a-1e45-4172-b12e-8408205380d4",
//                   "status": "PENDING",
//                   "effectiveDate": "2024-01-12"
//               },
//               {
//                   "accStatusId": "a6a4aac0-5b91-4ec2-a563-8c237f929006",
//                   "status": "ACTIVE",
//                   "effectiveDate": "2024-01-30"
//               }
//           ],
//           "contractBillingDetails": [
//               {
//                   "cntrctBillingID": "0f4d8da4-f714-406d-a14b-0a200d216d65",
//                   "startDate": "2024-01-30",
//                   "endDate": null,
//                   "billFrequency": "Weekly",
//                   "billPeriod": 1,
//                   "billPeriodUnits": "WEEKLY",
//                   "billCycle": 4,
//                   "paymentDueDays": 1,
//                   "gracePeriodDays": null,
//                   "expensesBillBoo": true
//               },
//               {
//                 "cntrctBillingID": "0f4d8da4-f714-406d-a14b-0a200d216d67",
//                 "startDate": "2024-01-30",
//                 "endDate": null,
//                 "billFrequency": "Weekly",
//                 "billPeriod": 1,
//                 "billPeriodUnits": "WEEKLY",
//                 "billCycle": 4,
//                 "paymentDueDays": 1,
//                 "gracePeriodDays": null,
//                 "expensesBillBoo": true
//             }
//           ],
//           "contractDiscounts": [],
//           "woCount": null
//       }
//   ],
//   "contractDocuments": []
// });


// const handleDelete = (index) => {
//   // Clone the data to avoid modifying the original object directly
//   const updatedData = { ...data };

//   // Remove the specified contractBillingDetails item
//   updatedData.contractAccounts[0].contractBillingDetails.splice(index, 1);

//   // Update the state
//   setData(updatedData);
// };
//   return (
//     <div>
//       <table>
//                 {data?.["contractAccounts"]?.[0]?.["contractBillingDetails"]?.map((contractBillingDetails,index) =>(
//                             <tr
//                              key={index}
//                             >
//                                 <td className="text-start">{contractBillingDetails?.billPeriodUnits}</td>
//                                 <td>{contractBillingDetails?.billCycle || ''}</td>
//                                 <td>{contractBillingDetails?.startDate || ''}</td>
//                                 <td className="text-start">
//                                   <span>
//                                         <i className="pi pi-pencil m-2"></i>
//                                         </span>
//                                         <span>
//                                         <i className="pi pi-trash" onClick={() => handleDelete(index)}></i>
//                                         </span>
//                                 </td>
//                             </tr>
//                          ))} 
                  
//                   </table>        

//       <h2>Edit Form</h2>
//       <EditForm initialData={apiPayload.contractAccounts[0].contractBillingDetails[0]} onSubmit={handleFormSubmit} />
//     </div>
//   );
// };

// export default ContractTerms;

// import React, { useState } from 'react';

// const EditForm = ({ initialData, onSubmit }) => {
//   const [formData, setFormData] = useState(initialData);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Bill Frequency:
//         <input
//           type="text"
//           name="billFrequency"
//           value={formData.billFrequency}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Bill Cycle:
//         <input
//           type="number"
//           name="billCycle"
//           value={formData.billCycle}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// const ContractTerms = () => {
//   const [apiPayload, setApiPayload] = useState({
//     "contractID": "211c20b0-41bf-4a07-a066-97f0c1548761",
//     "contractName": "hp-inc",
//     "relatedOrg": {
//         "organizationID": "5676ff50-e16a-4022-abaa-a10547a0d033",
//         "name": "HCL Technologies Limited 0231"
//     },
//     "startDate": "2024-01-30",
//     "endDate": null,
//     "billingCurrCode": null,
//     "notes": null,
//     "contractStatus": "ACTIVE",
//     "terminationDate": null,
//     "terminationReasonCode": null,
//     "terminationReasonNotes": null,
//     "contractAccounts": [
//         {
//             "contractAccountId": "a8fff06f-b21d-43b0-8a02-24f2b24dc259",
//             "contractAccountName": "test4",
//             "notes": null,
//             "startDate": "2024-01-30",
//             "nextBillDate": "2024-02-07",
//             "lastBillDate": null,
//             "accountStatuses": [
//                 {
//                     "accStatusId": "b2a6c47a-1e45-4172-b12e-8408205380d4",
//                     "status": "PENDING",
//                     "effectiveDate": "2024-01-12"
//                 },
//                 {
//                     "accStatusId": "a6a4aac0-5b91-4ec2-a563-8c237f929006",
//                     "status": "ACTIVE",
//                     "effectiveDate": "2024-01-30"
//                 }
//             ],
//             "contractBillingDetails": [
//                 {
//                     "cntrctBillingID": "0f4d8da4-f714-406d-a14b-0a200d216d65",
//                     "startDate": "2024-01-30",
//                     "endDate": null,
//                     "billFrequency": "Weekly",
//                     "billPeriod": 1,
//                     "billPeriodUnits": "WEEKLY",
//                     "billCycle": 4,
//                     "paymentDueDays": 1,
//                     "gracePeriodDays": null,
//                     "expensesBillBoo": true
//                 }
//             ],
//             "contractDiscounts": [],
//             "woCount": null
//         }
//     ],
//     "contractDocuments": []
// });

//   const handleFormSubmit = (updatedData) => {
//     // Clone the payload to avoid modifying the original object directly
//     const updatedPayload = { ...apiPayload };

//     // Update the properties
//     updatedPayload.contractAccounts[0].contractBillingDetails[0].billFrequency = updatedData.billFrequency;
//     updatedPayload.contractAccounts[0].contractBillingDetails[0].billCycle = updatedData.billCycle;

//     // Print the updated value in the console
//     console.log('Updated Payload:', updatedPayload);

//     // You can use updatedPayload for further processing or API calls
//   };
//   const [data, setData] = useState({
//   "contractID": "211c20b0-41bf-4a07-a066-97f0c1548761",
//   "contractName": "hp-inc",
//   "relatedOrg": {
//       "organizationID": "5676ff50-e16a-4022-abaa-a10547a0d033",
//       "name": "HCL Technologies Limited 0231"
//   },
//   "startDate": "2024-01-30",
//   "endDate": null,
//   "billingCurrCode": null,
//   "notes": null,
//   "contractStatus": "ACTIVE",
//   "terminationDate": null,
//   "terminationReasonCode": null,
//   "terminationReasonNotes": null,
//   "contractAccounts": [
//       {
//           "contractAccountId": "a8fff06f-b21d-43b0-8a02-24f2b24dc259",
//           "contractAccountName": "test4",
//           "notes": null,
//           "startDate": "2024-01-30",
//           "nextBillDate": "2024-02-07",
//           "lastBillDate": null,
//           "accountStatuses": [
//               {
//                   "accStatusId": "b2a6c47a-1e45-4172-b12e-8408205380d4",
//                   "status": "PENDING",
//                   "effectiveDate": "2024-01-12"
//               },
//               {
//                   "accStatusId": "a6a4aac0-5b91-4ec2-a563-8c237f929006",
//                   "status": "ACTIVE",
//                   "effectiveDate": "2024-01-30"
//               }
//           ],
//           "contractBillingDetails": [
//               {
//                   "cntrctBillingID": "0f4d8da4-f714-406d-a14b-0a200d216d65",
//                   "startDate": "2024-01-30",
//                   "endDate": null,
//                   "billFrequency": "Weekly",
//                   "billPeriod": 1,
//                   "billPeriodUnits": "WEEKLY",
//                   "billCycle": 4,
//                   "paymentDueDays": 1,
//                   "gracePeriodDays": null,
//                   "expensesBillBoo": true
//               },
//               {
//                 "cntrctBillingID": "0f4d8da4-f714-406d-a14b-0a200d216d67",
//                 "startDate": "2024-01-30",
//                 "endDate": null,
//                 "billFrequency": "Weekly",
//                 "billPeriod": 1,
//                 "billPeriodUnits": "WEEKLY",
//                 "billCycle": 4,
//                 "paymentDueDays": 1,
//                 "gracePeriodDays": null,
//                 "expensesBillBoo": true
//             }
//           ],
//           "contractDiscounts": [],
//           "woCount": null
//       }
//   ],
//   "contractDocuments": []
// });


// const handleDelete = (index) => {
//   // Clone the data to avoid modifying the original object directly
//   const updatedData = { ...data };

//   // Remove the specified contractBillingDetails item
//   updatedData.contractAccounts[0].contractBillingDetails.splice(index, 1);

//   // Update the state
//   setData(updatedData);
// };
//   return (
//     <div>
//       <table>
//                 {data?.["contractAccounts"]?.[0]?.["contractBillingDetails"]?.map((contractBillingDetails,index) =>(
//                             <tr
//                              key={index}
//                             >
//                                 <td className="text-start">{contractBillingDetails?.billPeriodUnits}</td>
//                                 <td>{contractBillingDetails?.billCycle || ''}</td>
//                                 <td>{contractBillingDetails?.startDate || ''}</td>
//                                 <td className="text-start">
//                                   <span>
//                                         <i className="pi pi-pencil m-2"></i>
//                                         </span>
//                                         <span>
//                                         <i className="pi pi-trash" onClick={() => handleDelete(index)}></i>
//                                         </span>
//                                 </td>
//                             </tr>
//                          ))} 
                  
//                   </table>        

//       <h2>Edit Form</h2>
//       <EditForm initialData={apiPayload.contractAccounts[0].contractBillingDetails[0]} onSubmit={handleFormSubmit} />
//     </div>
//   );
// };

// export default ContractTerms;


// add is working

// import React, { useState } from 'react';

// const BillingDetailsTable = ({ data }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Bill Frequency</th>
//           <th>Bill Cycle</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data?.contractAccounts?.[0]?.contractBillingDetails?.map((billingDetail, index) => (
//           <tr key={index}>
//             <td>{billingDetail?.billFrequency || ''}</td>
//             <td>{billingDetail?.billCycle || ''}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const AddBillingDetailsForm = ({ onAdd }) => {
//   const [formData, setFormData] = useState({
//     billFrequency: '',
//     billCycle: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleAdd = () => {
//     onAdd(formData);
//     setFormData({
//       billFrequency: '',
//       billCycle: '',
//     });
//   };

//   return (
//     <div>
//       <label>
//         Bill Frequency:
//         <input
//           type="text"
//           name="billFrequency"
//           value={formData.billFrequency}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Bill Cycle:
//         <input
//           type="number"
//           name="billCycle"
//           value={formData.billCycle}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <button type="button" onClick={handleAdd}>
//         Add
//       </button>
//     </div>
//   );
// };

// const ContractTerms = () => {
//   const [data, setData] = useState({
//     "contractID": "211c20b0-41bf-4a07-a066-97f0c1548761",
//     "contractName": "hp-inc",
//     "relatedOrg": {
//         "organizationID": "5676ff50-e16a-4022-abaa-a10547a0d033",
//         "name": "HCL Technologies Limited 0231"
//     },
//     "startDate": "2024-01-30",
//     "endDate": null,
//     "billingCurrCode": null,
//     "notes": null,
//     "contractStatus": "ACTIVE",
//     "terminationDate": null,
//     "terminationReasonCode": null,
//     "terminationReasonNotes": null,
//     "contractAccounts": [
//         {
//             "contractAccountId": "a8fff06f-b21d-43b0-8a02-24f2b24dc259",
//             "contractAccountName": "test4",
//             "notes": null,
//             "startDate": "2024-01-30",
//             "nextBillDate": "2024-02-07",
//             "lastBillDate": null,
//             "accountStatuses": [
//                 {
//                     "accStatusId": "b2a6c47a-1e45-4172-b12e-8408205380d4",
//                     "status": "PENDING",
//                     "effectiveDate": "2024-01-12"
//                 },
//                 {
//                     "accStatusId": "a6a4aac0-5b91-4ec2-a563-8c237f929006",
//                     "status": "ACTIVE",
//                     "effectiveDate": "2024-01-30"
//                 }
//             ],
//             "contractBillingDetails": [
//                 {
//                     "cntrctBillingID": "0f4d8da4-f714-406d-a14b-0a200d216d65",
//                     "startDate": "2024-01-30",
//                     "endDate": null,
//                     "billFrequency": "Weekly",
//                     "billPeriod": 1,
//                     "billPeriodUnits": "WEEKLY",
//                     "billCycle": 4,
//                     "paymentDueDays": 1,
//                     "gracePeriodDays": null,
//                     "expensesBillBoo": true
//                 }
//             ],
//             "contractDiscounts": [],
//             "woCount": null
//         }
//     ],
//     "contractDocuments": []
// });

//   const handleAddBillingDetails = (newBillingDetails) => {
//     // Clone the data to avoid modifying the original object directly
//     const updatedData = { ...data };

//     // Add the new billing details to the array
//     updatedData.contractAccounts[0].contractBillingDetails.push(newBillingDetails);

//     // Update the state
//     setData(updatedData);
//   };

//   return (
//     <div>
//       <h2>Billing Details Table</h2>
//       <BillingDetailsTable data={data} />

//       <h2>Add Billing Details</h2>
//       <AddBillingDetailsForm onAdd={handleAddBillingDetails} />
//     </div>
//   );
// };

// export default ContractTerms;


// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import CustomInputText from '../../../../components/controls/CustomInputText';


// const EditForm = ({ initialData, onSubmit }) => {
//   const { control,errors, handleSubmit, setValue } = useForm();

//   // Set initial values for the form inputs
//   React.useEffect(() => {
//     setValue('billFrequency', initialData.billFrequency);
//     setValue('billCycle', initialData.billCycle);
//   }, [initialData, setValue]);

//   const handleFormSubmit = async (formData) => {
//     // Perform any additional validation or processing if needed
//     console.log('Form Data:', formData);

//     // Call your API to update the data
//     try {
//       const contractID = "cd5c0ebf-9051-4236-805a-a4a3182083e7";
//       const response = await axios.patch(`http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/${contractID}`, {
//         contractBillingDetails: [
//           {
//             cntrctBillingID: initialData.contractID, // Include ID for identification
//             billFrequency: formData.billFrequency,
//             billCycle: formData.billCycle,
//           },
//         ],
//       });

//       // Call the onSubmit callback with the updated data
//       onSubmit(response.data.contractBillingDetails[0]);
//     } catch (error) {
//       console.error('Error updating data:', error);
//     }
//   };
// const required = true;
//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)}>
//       <CustomInputText
//         control={control}
//         errors={errors}
//         name="billFrequency"
//         labelId="Bill Frequency"
//         // defaultValue={initialData.billFrequency}
//         requiredMsg="countryOfIncorporation.required"
//         required={required}
//       />
//       <CustomInputText
//         control={control}
//         errors={errors}
//         name="billCycle"
//         labelId="Bill Cycle"
//         // defaultValue={initialData.billCycle}
//         requiredMsg="countryOfIncorporation.required"
//         required={required}
//       />
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default EditForm;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditForm = ({ api, payload }) => {
//   const [formData, setFormData] = useState(payload);

//   useEffect(() => {
//     // Update form data when the payload changes
//     setFormData(payload);
//   }, [payload]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.patch(`${api}/raves/v1/contract/${payload.contractID}`, {
//         // Assuming you want to update the entire payload
//         ...payload,
//         ...formData,
//       });

//       console.log('Updated Payload:', response.data);

//       // Handle further actions after a successful update, if needed

//     } catch (error) {
//       console.error('Error updating data:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Bill Frequency:
//         <input
//           type="text"
//           name="contractAccounts[0].contractBillingDetails[0].billFrequency"
//           value={formData.contractAccounts[0].contractBillingDetails[0].billFrequency}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Bill Cycle:
//         <input
//           type="number"
//           name="contractAccounts[0].contractBillingDetails[0].billCycle"
//           value={formData.contractAccounts[0].contractBillingDetails[0].billCycle}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       {/* Add your other input fields here */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// const ContractTerms = () => {
//   const api = `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/${"cd5c0ebf-9051-4236-805a-a4a3182083e7"}`;
//   const payload = {
//     "contractID": "211c20b0-41bf-4a07-a066-97f0c1548761",
//     "contractName": "hp-inc",
//     "relatedOrg": {
//         "organizationID": "5676ff50-e16a-4022-abaa-a10547a0d033",
//         "name": "HCL Technologies Limited 0231"
//     },
//     "startDate": "2024-01-30",
//     "endDate": null,
//     "billingCurrCode": null,
//     "notes": null,
//     "contractStatus": "ACTIVE",
//     "terminationDate": null,
//     "terminationReasonCode": null,
//     "terminationReasonNotes": null,
//     "contractAccounts": [
//         {
//             "contractAccountId": "a8fff06f-b21d-43b0-8a02-24f2b24dc259",
//             "contractAccountName": "test4",
//             "notes": null,
//             "startDate": "2024-01-30",
//             "nextBillDate": "2024-02-07",
//             "lastBillDate": null,
//             "accountStatuses": [
//                 {
//                     "accStatusId": "b2a6c47a-1e45-4172-b12e-8408205380d4",
//                     "status": "PENDING",
//                     "effectiveDate": "2024-01-12"
//                 },
//                 {
//                     "accStatusId": "a6a4aac0-5b91-4ec2-a563-8c237f929006",
//                     "status": "ACTIVE",
//                     "effectiveDate": "2024-01-30"
//                 }
//             ],
//             "contractBillingDetails": [
//                 {
//                     "cntrctBillingID": "0f4d8da4-f714-406d-a14b-0a200d216d65",
//                     "startDate": "2024-01-30",
//                     "endDate": null,
//                     "billFrequency": "Weekly",
//                     "billPeriod": 1,
//                     "billPeriodUnits": "WEEKLY",
//                     "billCycle": 4,
//                     "paymentDueDays": 1,
//                     "gracePeriodDays": null,
//                     "expensesBillBoo": true
//                 }
//             ],
//             "contractDiscounts": [],
//             "woCount": null
//         }
//     ],
//     "contractDocuments": []
//   };

//   return (
//     <div>
//       <h2>Edit Form</h2>
//       <EditForm api={api} payload={payload} />
//     </div>
//   );
// };

// export default ContractTerms;

import React from 'react'
import { useSelector } from 'react-redux';
import {Button} from 'primereact/button';
function ContractTerms() {
    const {contractSummarySelected} = useSelector((state) => state.contract);
    console.log(contractSummarySelected,"contractSummarySelected");
  const selectedCompanyData= contractSummarySelected;
  // const [AddSidebarVisible,setAddSidebarVisible] = useState(false);
    return (
        <>
             <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
            <h5 className='fw-bold m-2'>Contract Profile Details</h5>
            <Button
              label=""
              severity="primary"
              icon="pi pi-plus fs-5"
              // onClick={() => setAddSidebarVisible(true)}
              size="small"
              className='m-2'
            />
          </div>
                <div className="formgrid grid col-12">
                {/* <div className="col-12 md:col-6">
                <p className='fw-bold'>Contract Billing Details</p>
                </div> */}
     {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractBillingDetails"].length >0 && <table className="table m-2">
                    <thead>
                        <tr>
                            <th className="l-width-70">BillPeriod Units</th>
                            <th className="l-width-70">BillCycle</th>
                            <th className="l-width-70">Start Date</th>
                            <th className="l-width-30">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractBillingDetails"]?.map((contractBillingDetails,index) =>(
                            <tr
                             key={index}
                            >
                                <td className="text-start">{contractBillingDetails?.billPeriodUnits}</td>
                                <td>{contractBillingDetails?.billCycle || ''}</td>
                                <td>{contractBillingDetails?.startDate || ''}</td>
                                <td className="text-start">
                                  <span>
                                        <i className="pi pi-pencil m-2"></i>
                                        </span>
                                        <span>
                                        <i className="pi pi-trash"></i>
                                        </span>
                                </td>
                            </tr>
                         ))} 
                    </tbody>
                </table> 
}
{selectedCompanyData?.["contractAccounts"]?.[0]?.["contractBillingDetails"].length === 0 && 
(
  <div class="formgrid grid m-2">
  <h6 className='p-3'> No Data Available...</h6>
</div> )}
                </div>
                <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
            <h5 className='fw-bold m-2'>Contract Discounts</h5>
            <Button
              label=""
              severity="primary"
              icon="pi pi-plus fs-5"
            //   onClick={addAddressActionHandler}
              size="small"
              className='m-2'
            />
          </div>
                <div className="formgrid grid col-12">

        {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractDiscounts"].length === 0 && (<div class="formgrid grid m-2">
                <h6 className='p-3'> No Data Available...</h6>
            </div>)}        
        {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractDiscounts"].length > 0  && (
        <table className="table m-2">
                    <thead>
                        <tr>
                            <th className="l-width-70">DiscountName</th>
                            <th className="l-width-70">Start Date</th>
                            <th className="l-width-30">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractDiscounts"]?.map((contractBillingDetails,index) =>(
                            <tr
                             key={index}
                            >
                                <td className="text-start">{contractBillingDetails?.discountName || ''}</td>
                                <td>{contractBillingDetails?.startDate || ''}</td>
                                <td className="text-start">
                                  <span>
                                        <i className="pi pi-pencil m-2"></i>
                                        </span>
                                        <span>
                                        <i className="pi pi-trash"></i>
                                        </span>
                                </td>
                            </tr>
                         ))} 
                    </tbody>
                </table>
)}          
                </div>

            </>
  )
}

export default ContractTerms