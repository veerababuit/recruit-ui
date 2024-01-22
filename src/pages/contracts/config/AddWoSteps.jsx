// import ContractsWoCreateFirstStep from '../container/wizardFormSteps/WO/ContractsWoCreateFirstStep';
// import WorkOderModuleSingleMultipleResource from "../container/wizardFormSteps/WO/WorkOderModuleSingleMultipleResource";
import SingleResourceRates from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceRates';
import SingleResourceRecruiterInfoParent from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceRecruiterInfoParent';
import SingleResourceUploadSuperVisorInfoClient from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceUploadSuperVisorInfoClient';
import SingleResourceWoAddOrganization from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAddOrganization';
// import SingleResourceWoAddress from "../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAddress";
import SingleResourceWoAtEndClient from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoAtEndClient';
import SingleResourceWoSupplierInfo from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoSupplierInfo';
import SingleResourceWoContractSupervisorInfo from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoContractSupervisorInfo';
import SingleResourceWoUploadWOAndSupportingDocuments from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoUploadWOAndSupportingDocuments';
import SingleResourceWorkorderRates from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWorkorderRates';
// import SuccessMsg from "../container/wizardFormSteps/MSA/SuccessMsg";
import SingleResourceWoSuccessMsg from '../container/wizardFormSteps/WO/SingleResourceWo/SingleResourceWoSuccessMsg';
import WorkOderModuleSingleMultipleResource from '../container/wizardFormSteps/WorkOderModuleSingleMultipleResource';
// import ChargeCode from '../container/wizardFormSteps/WO/ChargeCode';
// import ContractResource from '../container/wizardFormSteps/WO/ContractResource';
import SelectClient from '../container/wizardFormSteps/WO/workOrder/selectClient';
import SelectWorkOrder from '../container/wizardFormSteps/WO/workOrder/SelectWorkOrder';
import AddResource from '../container/wizardFormSteps/WO/workOrder/AddResource';
import ChargeCodesExpences from '../container/wizardFormSteps/WO/workOrder/ChargeCodes-Expences';
import WorkLocations from '../container/wizardFormSteps/WO/workOrder/WorkLocation';
import WorkOrderConfirmation from '../container/wizardFormSteps/WO/workOrder/WorkOrderConfirmation';
import Supervisor from '../container/wizardFormSteps/WO/workOrder/Supervisor';

const AddWoSteps = [
    {
        name: 'Client',
        component: SelectClient,
        nextStep: 'Work Order',
    },
    {
        name: 'Work Order',
        component: SelectWorkOrder,
        nextStep: 'Resource',
    },
    {
        name: 'Resource',
        component: AddResource,
        nextStep: 'Charge Codes',
    },
    {
        name: '',
        component: ChargeCodesExpences,
        nextStep: 'Work Locations',
    },
    {
        name: '',
        component: WorkLocations,
        nextStep: 'Supervisor',
    },
    {
        name: '',
        component: Supervisor,
        nextStep: 'Create Work Order',
    },
    {
        name: '',
        component: WorkOrderConfirmation,
        nextStep: '',
    },
    // {
    //     name: 'Charge Codes',
    //     component: ChargeCode,
    //     nextStep: '',
    // },
    // {
    //     name: 'Resource',
    //     component: ContractResource,
    //     nextStep: '',
    // },
    {
        name: '',
        component: WorkOderModuleSingleMultipleResource,
        nextStep: 'SingleResourceWorkorderRates',
    },
    {
        name: '',
        component: SingleResourceWorkorderRates,
        nextStep: 'Rates',
    },
    {
        name: '',
        component: SingleResourceRates,
        nextStep: 'WoUploadWO',
    },
    {
        name: '',
        component: SingleResourceWoUploadWOAndSupportingDocuments,
        nextStep: 'AtEndClient',
    },
    {
        name: '',
        component: SingleResourceWoAtEndClient,
        nextStep: 'AddOrganization',
    },
    {
        name: '',
        component: SingleResourceWoAddOrganization,
        nextStep: 'SupplierInfo',
    },
    {
        name: '',
        component: SingleResourceWoSupplierInfo,
        nextStep: 'SupervisorInfo',
    },
    {
        name: '',
        component: SingleResourceWoSuccessMsg,
        nextStep: 'RecruiterInfoParent',
    },
    {
        name: '',
        component: SingleResourceWoContractSupervisorInfo,
        nextStep: 'UploadSuperVisor',
    },
    {
        name: '',
        component: SingleResourceUploadSuperVisorInfoClient,
        nextStep: 'RecruiterInfo',
    },
    {
        name: '',
        component: SingleResourceRecruiterInfoParent,
        nextStep: 'Finish',
    },
    // {
    //     name:'',
    //     component: SingleResourceWoContractSupervisorInfo,
    //     nextStep:'UploadSuperVisor',
    // },
    // {
    //     name:'',
    //     component: SingleResourceUploadSuperVisorInfoClient,
    //     nextStep:'Finish',
    // }
];
export default AddWoSteps;
