/**
 * This file defines options definitions to be used on application.
 */

import { easeCubic } from 'd3-ease';
import { FlyToInterpolator } from 'react-map-gl';

export const mapDefaults = {
  viewport: {
    latitude: -6.536764,
    longitude: -58.837697,
    zoom: 3.5, // 4.4,
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic,
  },
  bounds: {
    southwestern: [-80.384363, -16.207272],
    northeastern: [-36.616675, 3.978085],
  },
  transition: {
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic,
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
  reserveEthnicity: {
    key: 'reserveEthnicity',
    translation: 'dashboard.search.grouping.reserveEthnicity',
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

export const propertyTypes = {
  state: { key: 'state' },
  company: { key: 'company' },
  reserve: { key: 'reserve' },
  unit: { key: 'unit' },
  year: { key: 'year' },
  substance: { key: 'substance' },
  reservePhase: { key: 'reservePhase' },
  reserveEthnicity: { key: 'reserveEthnicity' },
  requirementPhase: { key: 'requirementPhase' },
};
