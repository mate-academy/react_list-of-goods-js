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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const ARRAY_METHOD = 'reverse';

function goodsSorter(goods, { sortType, arrayMethod }) {
  const sortedGoods = [...goods];

  if (sortType) {
    sortedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_BY_ALPHABET:
          return good1.name.localeCompare(good2.name);
        case SORT_BY_LENGTH:
          return good1.name.length - good2.name.length;
        default:
          return 0;
      }
    });
  }

  if (arrayMethod) {
    sortedGoods[arrayMethod]();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [arrayMethod, setArrayMethod] = useState('');

  const goods = goodsSorter(goodsFromServer, { sortType, arrayMethod });

  function toggleArrayMethod(newMethod) {
    setArrayMethod(prevMethod => (prevMethod === newMethod ? '' : newMethod));
  }

  function handleResetClick() {
    setSortType('');
    setArrayMethod('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SORT_BY_ALPHABET)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => toggleArrayMethod(ARRAY_METHOD)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !arrayMethod,
          })}
        >
          Reverse
        </button>

        {(sortType || arrayMethod) && (
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
