import React from 'react';
import { DataItem } from '../DataItem';

export const DataList = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <DataItem key={good} good={good} />
      ))}
    </ul>
  );
};
