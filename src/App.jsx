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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
    setIsReversed(false);
  };

  const sortBy = parameter => {
    if (!parameter) {
      setVisibleGoods([...visibleGoods].reverse());

      return false;
    }

    if (isReversed) {
      setVisibleGoods(
        [...goodsFromServer]
          .sort((good1, good2) => {
            switch (parameter) {
              case SORT_FIELD_ALPHABET:
                setSortField(parameter);

                return good1.localeCompare(good2);
              case SORT_FIELD_LENGTH:
                setSortField(parameter);

                return good1.length - good2.length;
              default:
                return false;
            }
          })
          .reverse(),
      );
    } else {
      setVisibleGoods(
        [...goodsFromServer].sort((good1, good2) => {
          switch (parameter) {
            case SORT_FIELD_ALPHABET:
              setSortField(parameter);

              return good1.localeCompare(good2);
            case SORT_FIELD_LENGTH:
              setSortField(parameter);

              return good1.length - good2.length;
            default:
              return false;
          }
        }),
      );
    }

    return false;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            sortBy(SORT_FIELD_ALPHABET);
          }}
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            sortBy(SORT_FIELD_LENGTH);
          }}
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setIsReversed(!isReversed);
            sortBy();
          }}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isReversed || sortField !== '' ? (
          <button
            type="button"
            onClick={reset}
            className={cn('button is-danger is-light')}
          >
            Reset
          </button>
        ) : (
          false
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
