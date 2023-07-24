import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

const sortTypes = {
  SORT_BY_ALPHABET: 'alphabet',
  SORT_BY_LENGTH: 'length',
  REVERSE: 'reverse',
};

function goodsSorter(goods, { sortType, isReversed }) {
  const sortedGoods = [...goods];

  if (sortType) {
    sortedGoods.sort((good1, good2) => {
      switch (sortType) {
        case sortTypes.SORT_BY_ALPHABET:
          return good1.name.localeCompare(good2.name);
        case sortTypes.SORT_BY_LENGTH:
          return good1.name.length - good2.name.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const goods = goodsSorter(goodsFromServer, { sortType, isReversed });

  function toggleArrayMethod() {
    setIsReversed(prevState => !prevState);
  }

  function handleResetClick() {
    setSortType('');
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(sortTypes.SORT_BY_ALPHABET)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== sortTypes.SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(sortTypes.SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== sortTypes.SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => toggleArrayMethod()}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            onClick={() => handleResetClick()}
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li
            key={item.id}
            data-cy="Good"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
