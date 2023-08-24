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
const preparedGoods
  = [...goodsFromServer]
    .map((good, index) => ({ good, key: index }));

const SORT_BY_ALPHABET = 'alpha';
const SORT_BY_LENGTH = 'length';
const REVERSE = 'reverse';
const RESET = 'reset';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(preparedGoods);
  const [resetButtonHidden, setResetButtonHidden] = useState(false);
  const [sortField, setSortField] = useState('');

  function getSortBy(products, sortBy) {
    if (sortBy === SORT_BY_ALPHABET) {
      // eslint-disable-next-line no-console
      console.log(products)

      return () => {
        setResetButtonHidden(true);
        setSortField(SORT_BY_ALPHABET);
        setVisibleGoods([...products]
          .sort((good1, good2) => good1.good.localeCompare(good2.good)));
      };
    }

    if (sortBy === SORT_BY_LENGTH) {
      return () => {
        setResetButtonHidden(true);
        setSortField(SORT_BY_LENGTH);
        setVisibleGoods([...products]
          .sort((good1, good2) => good1.good.length - good2.good.length));
      };
    }

    return () => {
      setResetButtonHidden(true);
      setSortField(REVERSE);
      setVisibleGoods([...visibleGoods].reverse());
    };
  }

  const resetGoods = () => {
    setSortField(RESET);
    setResetButtonHidden(false);
    setVisibleGoods([...preparedGoods]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={getSortBy(preparedGoods, SORT_BY_ALPHABET)}
          type="button"
          className={
          cn('button',
            'is-info',
            { 'is-light': SORT_BY_ALPHABET !== sortField })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={getSortBy(preparedGoods, SORT_BY_LENGTH)}
          type="button"
          className={
          cn('button',
            'is-success',
            { 'is-light': SORT_BY_LENGTH !== sortField })
          }
        >
          Sort by length
        </button>

        <button
          onClick={getSortBy(preparedGoods)}
          type="button"
          className={
          cn(
            'button',
            'is-warning',
            { 'is-light': REVERSE !== sortField },
          )}
        >
          Reverse
        </button>

        {resetButtonHidden && (
          <button
            onClick={() => resetGoods()}
            type="button"
            className={
            cn(
              'button',
              'is-danger',
              { 'is-light': RESET !== sortField },
            )}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(({ good, key }) => (
          <li
            data-cy="Good"
            key={key}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
