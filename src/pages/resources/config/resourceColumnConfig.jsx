const resourceColumnConfig = [

    {
        field: 'concatenatedName',
        header: 'Resource Name',
        isSelected: true,
        isChecked: false,
        isPermanent: true,
    },
    {
        field: 'workerCode',
        header: 'Resource Code',
        isSelected: false,
        isChecked: false,
        isPermanent: false,
    },
    {
        field: 'workerType.name',
        header: 'Resource Type',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    // {
    //     field: 'personLegal.primaryContactDetails.0.emailId',
    //     header: 'Email ID',
    //     isSelected: true,
    //     isChecked: true,
    //     isPermanent: false,
    // },
    // {
    //     field: 'dialNumber',
    //     header: 'Dial Number',
    //     isSelected: true,
    //     isChecked: true,
    //     isPermanent: false,
    // },
    {
        field: 'joiningDate',
        header: 'Join Date',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    // {
    //     field: 'birthDate',
    //     header: 'DOB',
    //     isSelected: true,
    //     isChecked: true,
    //     isPermanent: false,
    // },

    {
        header: 'Client',
        field: 'organization',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        header: 'Status',
        field: 'workerStatus.status',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
];

export default resourceColumnConfig;
