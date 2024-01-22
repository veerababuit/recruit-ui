import ContractNotes from '../container/viewTabSteps/ContractNotes';
import ContractDocument from '../container/viewTabSteps/ContractDocument';
import ContractHistory from '../container/viewTabSteps/ContractHistory';
import ContractResources from '../container/viewTabSteps/ContractResources';
import ContractProfilesTabIndex from '../container/viewTabSteps/ViewTabContractProfile/ContractProfilesTabIndex';
import ContractTerms from '../container/viewTabSteps/ContractTerms';

const viewContractTabs = [
    {
        id: 'contractProfiles',
        label: 'Profile',
        content: <ContractProfilesTabIndex />,
    },
    {
        id: 'contractNotes',
        label: 'Note',
        content: <ContractNotes />,
    },
    {
        id: 'contractDocuments',
        label: 'Documents',
        content: <ContractDocument />,
    },
    {
        id: 'resources',
        label: 'Resources',
        content: <ContractResources />,
    },
    {
        id: 'contractHistory',
        label: 'History',
        content: <ContractHistory />,
    },
    {
        id: 'ContractTerms',
        label: 'Term',
        content: <ContractTerms />,
       },
];

export default viewContractTabs;