import React from 'react';

function GoodsList({ goods }) {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
}

export default GoodsList;
