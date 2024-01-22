const companiesColumnConfig = [
  {
    header: "Company Name",
    field: "name",
    sortable: true,
    isSelected: true,
    isChecked: false,
    isPermanent: true,
  },
  {
    header: "Executive Name",
    field: "concatenatedName",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
  {
    header: "Phone",
    field: "orgCommunications.0.authSignataryPhone",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
  {
    header: "Fax",
    field: "fax",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
  {
    header: "Email",
    field: "orgCommunications.0.authSignataryEmail",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
  {
    header: "Location",
    field: "location",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
  {
    header: "Country",
    field: "country.countryName",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
  {
    header: "Date",
    field: "status.0.effectiveDate",
    sortable: true,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
  {
    header: "Status",
    field: "status.0.statusCode",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
];

export default companiesColumnConfig;