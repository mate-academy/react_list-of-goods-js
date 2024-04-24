import React from 'react';

import { GoodsItem } from '../GoodsItem/GoodsItem';

export const GoodsList = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <GoodsItem good={good} key={good} />
      ))}
    </ul>
  );
};
