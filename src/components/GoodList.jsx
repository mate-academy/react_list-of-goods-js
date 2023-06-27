import React from 'react';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good}>{good}</li>
    ))}
  </ul>
);
