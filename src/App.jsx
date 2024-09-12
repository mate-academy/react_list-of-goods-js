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

const SORT_FIELD_ALPHABETICAL = 'alphabetical';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
  };

  const sortByLength = () => {
    setVisibleGoods([...visibleGoods].sort((good1, good2) => good1.length - good2.length));
    setSortField(SORT_FIELD_LENGTH);
  };

  const sortAlphabetically = () => {
    setVisibleGoods([...visibleGoods].sort());
    setSortField(SORT_FIELD_ALPHABETICAL);
  };

  const reverseGoods = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setSortField(SORT_FIELD_REVERSE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICAL,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={cn('button is-warning', {
            'is-light': sortField !== SORT_FIELD_REVERSE,
          })}
        >
          Reverse
        </button>

        {sortField && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(n => (
          <li data-cy="Good" key={n}>
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
};
