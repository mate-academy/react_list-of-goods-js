import {useState} from 'react';
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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';

function getSortedGoods(goods, sortParameter, reverseParameter) {
  const copyGoods = [...goods];

  if (reverseParameter === 1) {
    copyGoods.reverse();
  }

  if (sortParameter) {
    copyGoods.sort((good1, good2) => {
      switch (sortParameter) {
        case SORT_BY_LENGTH:
          if (reverseParameter) {
            return good2.length - good1.length;
          }

          return good1.length - good2.length;

        case SORT_BY_ALPHABET:
          if (reverseParameter) {
            return good2.localeCompare(good1);
          }

          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return copyGoods;
}

export const App = () => {
  const [reverseParameter, setReverseParameter] = useState('');
  const [sortParameter, setSortParameter] = useState('');

  const visibleGoods
    = getSortedGoods(goodsFromServer, sortParameter, reverseParameter);

  const reset = () => {
    setSortParameter('');
    setReverseParameter('');
  };

  const reverse = () => {
    if (reverseParameter) {
      setReverseParameter('');
    }

    if (!reverseParameter) {
      setReverseParameter(1);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortParameter('alphabet')}
          type="button"
          className={cn('button is-info', {
            'is-light': sortParameter !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortParameter('length')}
          type="button"
          className={cn('button is-success', {
            'is-light': sortParameter !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseParameter === '',
          })}
        >
          Reverse
        </button>

        {(sortParameter || reverseParameter) && (
          <>
            <button
              onClick={reset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          </>
        )}
      </div>

      <ul>

        {visibleGoods.map(good => (
          <li
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
