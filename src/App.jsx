import React from 'react';
import 'bulma/css/bulma.css';
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

const SortType = {
  NONE: 'NONE',
  ALPHABET: 'ALPHABET',
  LENGTH: 'LENGTH',
};

export const App = () => {
  const [isReversed, setReversed] = React.useState(false);
  const [sortType, setSortType] = React.useState(SortType.NONE);

  // eslint-disable-next-line no-shadow
  function getReorderedGoods(goods, { sortType, isReversed }) {
    const visibleGoods = [...goods];

    switch (sortType) {
      case SortType.ALPHABET:
        visibleGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.LENGTH:
        visibleGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  }

  const resetFunction = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReversed(reverse => !reverse)}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={resetFunction}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, { sortType, isReversed }).map(
          (good, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} data-cy="Good">
              {good}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
