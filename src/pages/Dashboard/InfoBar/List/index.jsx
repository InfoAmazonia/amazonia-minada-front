import { useTheme } from 'react-jss';
import React from 'react';
import ListItem from '../../../../components/Dashboard/InfoBar/List/ListItem';

export default function List() {
  const theme = useTheme();
  return (
    <>
      <ListItem
        title="EMPRESA DE MINERAÇÃO LTDA"
        circleColor={theme.miningProcesses.availableMiningArea}
        infos={[
          { title: 'Processo', data: '1244214-00' },
          { title: 'Ano de abertura', data: '2019' },
          { title: 'Área declarada', data: '124323.20 ha' },
          { title: 'Tipo de área', data: 'Indígena' },
        ]}
      />
      <ListItem
        title="EMPRESA DE OURO LTDA"
        circleColor={theme.miningProcesses.smallScaleMining}
        infos={[
          { title: 'Processo', data: '1244214-00' },
          { title: 'Ano de abertura', data: '2019' },
          { title: 'Área declarada', data: '124323.20 ha' },
          { title: 'Tipo de área', data: 'Indígena' },
        ]}
      />
      <ListItem
        title="EMPRESA DE PRATA LTDA"
        circleColor={theme.miningProcesses.miningResearchAuthorization}
        infos={[
          { title: 'Processo', data: '1244214-00' },
          { title: 'Ano de abertura', data: '2019' },
          { title: 'Área declarada', data: '124323.20 ha' },
          { title: 'Tipo de área', data: 'Indígena' },
        ]}
      />
      <ListItem
        title="EMPRESA DE DIAMANTE LTDA"
        circleColor={theme.miningProcesses.miningResearchRequest}
        infos={[
          { title: 'Processo', data: '1244214-00' },
          { title: 'Ano de abertura', data: '2019' },
          { title: 'Área declarada', data: '124323.20 ha' },
          { title: 'Tipo de área', data: 'Indígena' },
        ]}
      />
      <ListItem
        title="EMPRESA DE NÍQUEL LTDA"
        circleColor={theme.miningProcesses.smallScaleMiningRequest}
        infos={[
          { title: 'Processo', data: '1244214-00' },
          { title: 'Ano de abertura', data: '2019' },
          { title: 'Área declarada', data: '124323.20 ha' },
          { title: 'Tipo de área', data: 'Indígena' },
        ]}
      />
    </>
  );
}
