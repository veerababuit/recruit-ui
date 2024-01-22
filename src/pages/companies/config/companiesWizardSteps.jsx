import SuccessMsg from "../container/wizardFormSteps/SuccessMsg";
import UploadCompaniesDocument from "../container/wizardFormSteps/UploadCompaniesDocument";
import Address from "./../container/wizardFormSteps/Address"
// import CompaniesAddUsersStep from "./../container/wizardFormSteps/CompaniesAddUsersStep"
// import CompanyContactDetailsStep from "./../container/wizardFormSteps/CompanyContactDetailsStep"
import CompanyProfileStep from "./../container/wizardFormSteps/CompanyProfileStep"
// import Documents from "./../container/wizardFormSteps/Documents"

const companiesWizardSteps = [
    // {
    //     id: 'address',
    //     name: '',
    //     component: Address,
    //     nextStep: "Success",
    // },
    {
        id: 'companyProfile',
        name: '',
        component: CompanyProfileStep,
        nextStep: "Contact Details",
    },
    {
        id: 'address',
        name: '',
        component: Address,
        nextStep: "Success",
    },
    {
        id: 'uploadDocuments',
        name: '',
        component: SuccessMsg,
        nextStep: "Documents",
    },

    {
        id: 'uploadCompaniesDocuments',
        name: '',
        component: UploadCompaniesDocument,
        nextStep: "",
    },
    // {
    //     id: 'addUsers',
    //     name: '',
    //     component: CompaniesAddUsersStep,
    //     nextStep: "End",
    // },
];

export default companiesWizardSteps;
