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
    .map((good, index) => ({ good, id: index }));

const SORT_BY_ALPHABET = 'alpha';
const SORT_BY_LENGTH = 'length';
const RESET = 'reset';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(preparedGoods);
  const [sortField, setSortField] = useState('');
  const [isActiveButton, setIsActiveButton] = useState({
    sortByAlpha: true,
    sortByLength: true,
    sortReverse: true,
  });

  function getSortBy(products, sortBy) {
    if (sortBy === SORT_BY_ALPHABET) {
      return () => {
        setSortField(SORT_BY_ALPHABET);
        setVisibleGoods([...products]
          .sort((good1, good2) => good1.good.localeCompare(good2.good)));

        setIsActiveButton({
          sortByAlpha: false,
          sortByLength: true,
          sortReverse: true,
        });
      };
    }

    if (sortBy === SORT_BY_LENGTH) {
      return () => {
        setSortField(SORT_BY_LENGTH);
        setVisibleGoods([...products]
          .sort((good1, good2) => good1.good.length - good2.good.length));

        setIsActiveButton({
          sortByAlpha: true,
          sortByLength: false,
          sortReverse: true,
        });
      };
    }

    return () => {
      setSortField(' ');
      setVisibleGoods([...visibleGoods].reverse());
      setIsActiveButton({
        sortByAlpha: isActiveButton.sortByAlpha,
        sortByLength: isActiveButton.sortByLength,
        sortReverse: !isActiveButton.sortReverse,
      });
    };
  }

  const resetGoods = () => {
    setSortField('');
    setVisibleGoods([...preparedGoods]);
    setIsActiveButton({
      sortByAlpha: true,
      sortByLength: true,
      sortReverse: true,
    });
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
            { 'is-light': isActiveButton.sortByAlpha })
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
            { 'is-light': isActiveButton.sortByLength })
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
            { 'is-light': isActiveButton.sortReverse },
          )}
        >
          Reverse
        </button>

        {sortField && (
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
        {visibleGoods.map(({ good, id }) => (
          <li
            data-cy="Good"
            key={id}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
