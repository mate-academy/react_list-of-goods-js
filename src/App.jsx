import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cl from 'classnames';
import { GoodList } from './components/GoodList';

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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

const getGoods = (
  goods,
  { sortingType = null, filterBy = null, isReversed = false },
) => {
  let prepareGoods = [...goods];

  if (filterBy) {
    prepareGoods = prepareGoods.filter(good => {
      return good.includes(filterBy);
    });
  }

  if (sortingType) {
    prepareGoods = prepareGoods.sort((good1, good2) => {
      switch (sortingType) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App = () => {
  const [sortingType, setSortingType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getGoods(goodsFromServer, { sortingType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cl('button is-info', {
            'is-light': sortingType !== SORT_BY_ALPHABET,
          })}
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            sortingType === SORT_BY_ALPHABET
              ? setSortingType('')
              : setSortingType(SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cl('button is-success', {
            'is-light': sortingType !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            sortingType === SORT_BY_LENGTH
              ? setSortingType('')
              : setSortingType(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cl('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>
        {sortingType !== '' || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortingType('');
            }}
          >
            Reset
          </button>
        ) : null}
      </div>
      <ul>
        <GoodList goods={visibleGoods} />
      </ul>
    </div>
  );
};
