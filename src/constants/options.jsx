/**
 * This file defines options definitions to be used on application.
 */

export const mapDefaults = {
  viewport: {
    latitude: -6.536764,
    longitude: -58.837697,
    zoom: 4.4,
  },
};

export const dataTypes = {
  requiredArea: {
    key: 'requiredArea',
    translation: 'dashboard.dataType.requiredArea',
  },
  requirementsIncidence: {
    key: 'requirementsIncidence',
    translation: 'dashboard.dataType.requirementsIncidence',
  },
};

export const searchDataTypes = {
  company: {
    key: 'company',
    translation: 'dashboard.search.grouping.company',
  },
  state: {
    key: 'state',
    translation: 'dashboard.search.grouping.state',
  },
  reserve: {
    key: 'reserve',
    translation: 'dashboard.search.grouping.reserve',
  },
  unity: {
    key: 'unity',
    translation: 'dashboard.search.grouping.unity',
  },
  substance: {
    key: 'substance',
    translation: 'dashboard.search.grouping.substance',
  },
};

export const filterDefaults = {
  searchValue: {},
  ucVisibility: true,
  tiVisibility: true,
  dataType: dataTypes.requiredArea.key,
  searchDataType: searchDataTypes.company.key,
};
