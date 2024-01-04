import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';
import { GoodsList } from './components/GoodsList';

const SORT_ALPHABET = 'alph';
const SORT_LENGTH = 'len';

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

function formatGoods(goods, sortMethod, isReversed) {
  const goodsCopy = [...goods];

  switch (sortMethod) {
    case SORT_ALPHABET:
      goodsCopy.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_LENGTH:
      goodsCopy.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortMethod, setSortMethod] = useState(null);

  const goods = formatGoods(goodsFromServer, sortMethod, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortMethod(SORT_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortMethod !== SORT_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortMethod(SORT_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortMethod !== SORT_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
          })}
        >
          Reverse
        </button>

        {(sortMethod || isReversed) && (
          <button
            onClick={() => {
              setIsReversed(false);
              setSortMethod(null);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goods} />
    </div>
  );
};
