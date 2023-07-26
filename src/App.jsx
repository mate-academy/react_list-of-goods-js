import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

function getOrderedGoods(goods, orderedMethod, isReversed) {
  const finalGoods = [...goods];

  switch (orderedMethod) {
    case SORT_ALPHABET:
      finalGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_LENGTH:
      finalGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    finalGoods.reverse();
  }

  return finalGoods;
}

export const App = () => {
  const [orderMethod, setOrderMethod] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const orderedGoods = getOrderedGoods(
    goodsFromServer,
    orderMethod,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': orderMethod !== SORT_ALPHABET,
          })}
          onClick={() => setOrderMethod(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': orderMethod !== SORT_LENGTH,
          })}
          onClick={() => setOrderMethod(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(orderMethod || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setOrderMethod(''); setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {orderedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
