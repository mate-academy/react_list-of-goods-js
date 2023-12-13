import React from 'react';
import { GoodItem } from '../GoodItem';

export const GoodList = ({ goods }) => (
  <ul>
    {
      goods.map(good => (
        <GoodItem
          key={good}
          good={good}
        />
      ))
    }
  </ul>
);
