import React from 'react';
import { Good } from '../Good/Good';

export const GoodList = ({ goods }) => (
  <ul>
    {
      goods.map(good => (
        <Good good={good} key={good} />
      ))
    }
  </ul>
);

export default GoodList;
