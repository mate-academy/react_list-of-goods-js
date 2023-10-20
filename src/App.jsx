import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const defaultValue = [...goodsFromServer];
  const [goods, setGoods] = useState(defaultValue);
  const [sort, setSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  function sortGoods(sortValue) {
    switch (sortValue) {
      case 'alphabetically':
        setGoods([...goods].sort((goodA, goodB) => goodB.localeCompare(goodA)));
        break;
      case 'length':
        setGoods([...goods]
          .sort((goodA, goodB) => goodA.length - goodB.length));
        break;
      default:
        setGoods(defaultValue);
    }

    setSort(sortValue);
  }

  const handleReverse = function reverse() {
    setGoods([...goods].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sort !== 'alphabetically',
          })}
          onClick={() => sortGoods('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sort !== 'length',
          })}
          onClick={() => sortGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
            handleReverse();
          }}
        >
          Reverse
        </button>

        {(sort || isReversed) && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': sort !== defaultValue,
            })}
            onClick={() => {
              sortGoods('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
