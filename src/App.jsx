import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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

const SORT_PARAMETER_ALPHABET = 'alphabet';
const SORT_PARAMETER_LENGTH = 'length';

const REVERSE_PARAMETER_STRAIGHT = 'straight';
const REVERSE_PARAMETER_REVERSE = 'reverse';

function getSortedGoods(goods, sortParameter, reverseParameter) {
  const sortedGoods = [...goods];

  if (sortParameter) {
    sortedGoods.sort((good1, good2) => {
      switch (sortParameter) {
        case SORT_PARAMETER_LENGTH:
          return good1.length - good2.length;

        case SORT_PARAMETER_ALPHABET:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reverseParameter === 'reverse') {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortParameter, setSortParameter] = useState('');
  const [reverseParameter, setReverseParameter] = (
    useState(REVERSE_PARAMETER_STRAIGHT)
  );
  const visibleGoods = (
    getSortedGoods(goodsFromServer, sortParameter, reverseParameter)
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortParameter(SORT_PARAMETER_ALPHABET)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortParameter !== SORT_PARAMETER_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortParameter(SORT_PARAMETER_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortParameter !== SORT_PARAMETER_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            if (reverseParameter === REVERSE_PARAMETER_STRAIGHT) {
              setReverseParameter(REVERSE_PARAMETER_REVERSE);
            } else {
              setReverseParameter(REVERSE_PARAMETER_STRAIGHT);
            }
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseParameter !== REVERSE_PARAMETER_REVERSE,
          })}
        >
          Reverse
        </button>

        {(sortParameter !== ''
            || reverseParameter !== REVERSE_PARAMETER_STRAIGHT) && (
            <button
              onClick={() => {
                setReverseParameter(REVERSE_PARAMETER_STRAIGHT);
                setSortParameter('');
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
        )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
