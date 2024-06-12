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
    if (isReversed) {
      setVisibleGoods([...visibleGoods].sort().reverse());
    } else {
      setVisibleGoods([...visibleGoods].sort());
    }
  };

  const sortLength = () => {
    setSortField(SORT_FIELD_LENGTH);
    if (isReversed) {
      setVisibleGoods(
        [...visibleGoods]
          .sort((good1, good2) => good1.length - good2.length)
          .reverse(),
      );
    } else {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
      );
    }
  };

  const reverse = () => {
    if (isReversed) {
      setVisibleGoods([...visibleGoods].reverse());
      setIsReversed(false);
    } else {
      setVisibleGoods([...visibleGoods].reverse());
      setIsReversed(true);
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

        <button
          type="button"
          onClick={reset}
          className={cn({
            button: true,
            'is-danger': true,
            'is-light': true,
            'is-hidden': visibleGoods === goodsFromServer,
          })}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => {
          return <li key={good}>{good}</li>;
        })}
      </ul>
    </div>
  );
};
