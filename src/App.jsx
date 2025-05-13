import 'bulma/css/bulma.css';
import { useState } from 'react';

import './App.scss';
import classNames from 'classnames';

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

const SORT_FIELDS = {
  DEFAULT: '',
  ALPHABETICALLY: 'alphabetically',
  LENGTH: 'length',
};

function sortGoods(goods, { sortField, isReversed }) {
  let sortedGoods = [...goods];

  if (sortField === SORT_FIELDS.DEFAULT && isReversed) {
    sortedGoods = [...goods].reverse();
  } else if (sortField === SORT_FIELDS.ALPHABETICALLY && !isReversed) {
    sortedGoods = [...goods].sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === SORT_FIELDS.ALPHABETICALLY && isReversed) {
    sortedGoods = [...goods].sort((good1, good2) => good2.localeCompare(good1));
  } else if (sortField === SORT_FIELDS.LENGTH && !isReversed) {
    sortedGoods = [...goods].sort((good1, good2) => {
      if (good1.length === good2.length) {
        return good1.localeCompare(good2);
      }

      return good1.length - good2.length;
    });
  } else if (sortField === SORT_FIELDS.LENGTH && isReversed) {
    sortedGoods = [...goods].sort((good1, good2) => {
      if (good1.length === good2.length) {
        return good2.localeCompare(good1);
      }

      return good2.length - good1.length;
    });
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELDS.DEFAULT);
  const [isReversed, setReversed] = useState(false);

  const sortedGoods = sortGoods(goodsFromServer, { sortField, isReversed });

  const alphabeticallyBtnCN = classNames('button', 'is-info', {
    'is-light': sortField !== SORT_FIELDS.ALPHABETICALLY,
  });

  const lengthBtnCN = classNames('button', 'is-success', {
    'is-light': sortField !== SORT_FIELDS.LENGTH,
  });

  const reverseBtnCN = classNames('button', 'is-warning', {
    'is-light': !isReversed,
  });

  const onSortAlphabeticallyClick = () => {
    setSortField(SORT_FIELDS.ALPHABETICALLY);
  };

  const onSortByLengthClick = () => {
    setSortField(SORT_FIELDS.LENGTH);
  };

  const onReverseSortClick = () => {
    setReversed(!isReversed);
  };

  const onResetClick = () => {
    setSortField(SORT_FIELDS.DEFAULT);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphabeticallyBtnCN}
          onClick={onSortAlphabeticallyClick}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={lengthBtnCN}
          onClick={onSortByLengthClick}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseBtnCN}
          onClick={onReverseSortClick}
        >
          Reverse
        </button>

        {(sortField !== SORT_FIELDS.DEFAULT || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
