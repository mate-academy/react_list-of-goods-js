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

export const App = () => {
  const SORT_RULE = {
    NONE: '',
    ALPHABET: 'by alphabet',
    LENGTH: 'by length',
  };
  const SORT_DIRECTION = {
    DEFAULT: 'default',
    REVERSE: 'reverse',
  };

  const [sortDirection, setSortDirection] = useState(SORT_DIRECTION.DEFAULT);
  const [sortRule, setSortRule] = useState(SORT_RULE.NONE);

  const toggleSortDirection = () =>
    setSortDirection(
      sortDirection === SORT_DIRECTION.DEFAULT
        ? SORT_DIRECTION.REVERSE
        : SORT_DIRECTION.DEFAULT,
    );

  const reset = () => {
    setSortRule(SORT_RULE.NONE);
    setSortDirection(SORT_DIRECTION.DEFAULT);
  };

  const getPreparedGoods = () => {
    const goods = [...goodsFromServer];

    // eslint-disable-next-line default-case
    switch (sortRule) {
      case SORT_RULE.ALPHABET:
        goods.sort((a, b) => a.localeCompare(b));
        break;
      case SORT_RULE.LENGTH:
        goods.sort((a, b) => a.length - b.length);
        break;
    }

    if (sortDirection === SORT_DIRECTION.REVERSE) {
      goods.reverse();
    }

    return goods;
  };

  const visibleGoods = getPreparedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            button: true,
            'is-info': true,
            'is-light': sortRule !== SORT_RULE.ALPHABET,
          })}
          onClick={() => setSortRule(SORT_RULE.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-success': true,
            'is-light': sortRule !== SORT_RULE.LENGTH,
          })}
          onClick={() => setSortRule(SORT_RULE.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': sortDirection !== SORT_DIRECTION.REVERSE,
          })}
          onClick={toggleSortDirection}
        >
          Reverse
        </button>

        {(sortRule !== SORT_RULE.NONE ||
          sortDirection !== SORT_DIRECTION.DEFAULT) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
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
