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
