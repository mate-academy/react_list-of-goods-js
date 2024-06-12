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

  const sortAlphabetically = () => {
    setSortField(SORT_FIELD_ALPHABET);
    setVisibleGoods([...visibleGoods].sort());
    if (isReversed) {
      setVisibleGoods([...visibleGoods].reverse());
    }
  };

  const sortLength = () => {
    setSortField(SORT_FIELD_LENGTH);
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
    );
    if (isReversed) {
      setVisibleGoods([...visibleGoods].reverse());
    }
  };

  const reverse = () => {
    setIsReversed(!isReversed);
    if (isReversed) {
      setVisibleGoods([...visibleGoods].reverse());
    }
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortAlphabetically}
          className={cn({
            button: true,
            'is-info': true,
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortLength}
          className={cn({
            button: true,
            'is-success': true,
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {visibleGoods !== goodsFromServer ? (
          <>
            <button
              type="button"
              onClick={reset}
              className={cn({
                button: true,
                'is-danger': true,
                'is-light': true,
                'is-invisible': visibleGoods === goodsFromServer,
              })}
            >
              Reset
            </button>
          </>
        ) : (
          false
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
