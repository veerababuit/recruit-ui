import ContractTerms from '../container/wizardFormSteps/MSA/ContractTerms';
import SelectOrganization from '../container/wizardFormSteps/MSA/SelectOrganization';
import SuccessMsg from '../container/wizardFormSteps/MSA/SuccessMsg';
import UploadMsaAndDocument from '../container/wizardFormSteps/MSA/UploadMsaAndDocument';

const AddMsaSteps = [
    {
        name: '',
        component: SelectOrganization,
        nextStep: ' ContractTerms',
    },
    {
        name: 'Contract Terms',
        component: ContractTerms,
        nextStep: 'UploadMsaAndDocument',
    },

    {
        name: '',
        component: SuccessMsg,
        nextStep: 'Upload Document',
    },
    {
        name: '',
        component: UploadMsaAndDocument,
        nextStep: 'Upload',
    },
];

export default AddMsaSteps;

// {
//     name: '',
//     component: SingleMultipleResourceWo,
//     nextStep: 'SingleResourceWorkorderRates',
// },
// {
//     name: '',
//     component: SingleResourceWorkorderRates,
//     nextStep: 'Rates',
// },
// {
//     name: '',
//     component: SingleResourceRates,
//     nextStep: 'WoUploadWO',
// },
// {
//     name: '',
//     component: SingleResourceWoUploadWOAndSupportingDocuments,
//     nextStep: 'AtEndClient',
// },
// {
//     name: '',
//     component: SingleResourceWoAtEndClient,
//     nextStep: 'AddOrganization',
// },
// {
//     name: '',
//     component: SingleResourceWoAddOrganization,
//     nextStep: 'Address',
// },
// {
//     name: '',
//     component: SingleResourceWoSupplierInfo,
//     nextStep: 'Address',
// },
// {
//     name: '',
//     component: SingleResourceWoSuccessMsg,
//     nextStep: 'SupervisorInfo',
// },
// {
//     name: '',
//     component: SingleResourceWoContractSupervisorInfo,
//     nextStep: 'UploadSuperVisor',
// },
// {
//     name: '',
//     component: SingleResourceUploadSuperVisorInfoClient,
//     nextStep: 'SupervisorInfo',
// },
// {
//     name: '',
//     component: SingleResourceRecruiterInfoParent,
//     nextStep: 'Finish',
// },
