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

export const filterDefaults = {
  searchValue: {},
  ucVisibility: true,
  tiVisibility: true,
  dataType: dataTypes.requiredArea.key,
};
