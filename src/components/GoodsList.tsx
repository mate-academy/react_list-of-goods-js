import React from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { Good } from '../types';

type Props = {
  goods:Good[]
};

export const GoodsList:React.FC<Props> = ({ goods }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <ul>
    {goods.map(good => (
      <li
        key={good.id}
        data-cy="good"
        style={{ color: good.color }}
      >
        {good.name}
      </li>
    ))}
  </ul>
);
