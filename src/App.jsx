import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { Good } from './Good';

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

const SORT_TYPE_ALPHABET = 'alphabet';
const SORT_TYPE_LENGTH = 'length';

function getFinalGoods(goods, { sortType, isReversed }) {
  let finalGoods = [...goods];

  if (sortType) {
    finalGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_TYPE_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_TYPE_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    finalGoods = finalGoods.reverse();
  }

  return finalGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const goods = getFinalGoods(goodsFromServer, { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_TYPE_ALPHABET,
          })}
          onClick={() => setSortType(SORT_TYPE_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_TYPE_LENGTH,
          })}
          onClick={() => setSortType(SORT_TYPE_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortType) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <Good good={good} key={good} />
        ))}
      </ul>
    </div>
  );
};
