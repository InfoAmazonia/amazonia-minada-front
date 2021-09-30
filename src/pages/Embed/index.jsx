import React from 'react';

import { EmbeddingProvider } from '../../contexts/embedding';
import { FilteringProvider } from '../../contexts/filtering';
import { MapProvider } from '../../contexts/mapping';
import EmbeddingWrapper from './Wrapper';

/**
 *  This page provides the main wrapper for the embedding aplication.
 */
export default function Embed() {
  return (
    <EmbeddingProvider>
      <FilteringProvider>
        <MapProvider>
          <EmbeddingWrapper />
        </MapProvider>
      </FilteringProvider>
    </EmbeddingProvider>
  );
}
