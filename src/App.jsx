import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classnames from 'classnames';

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

const SORT_FIELD_NAME = 'Name';
const SORT_FIELD_LENGTH = 'length';

function getPrepearedGoods(goods, { currentSortField, isReversed }) {
  const prepearedGoods = [...goods];

  if (currentSortField !== '') {
    prepearedGoods.sort((good1, good2) => {
      switch (currentSortField) {
        case SORT_FIELD_NAME: {
          return good1.localeCompare(good2);
        }

        case SORT_FIELD_LENGTH: {
          return good1.length - good2.length;
        }

        default:
          return 0;
      }
    });
  }

  return isReversed ? prepearedGoods.reverse() : prepearedGoods;
}

export const App = () => {
  const [currentSortField, setCurrentSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const vissibleGoods = getPrepearedGoods(goodsFromServer,
    { currentSortField, isReversed });

  const isStateNotReversedOrSorted
    = isReversed || currentSortField;

  const sortByName = () => {
    setCurrentSortField(SORT_FIELD_NAME);
  };

  const sortByLength = () => {
    setCurrentSortField(SORT_FIELD_LENGTH);
  };

  const reverse = () => {
    if (isReversed) {
      setIsReversed(false);
    }

    if (!isReversed) {
      setIsReversed(true);
    }
  };

  const reset = () => {
    setIsReversed(false);
    setCurrentSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByName}
          type="button"
          className={classnames(
            'button',
            'is-info',
            { 'is-light': currentSortField !== SORT_FIELD_NAME },
          )
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={classnames(
            'button',
            'is-success',
            { 'is-light': currentSortField !== SORT_FIELD_LENGTH },
          )
          }
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={
            classnames('button is-warning',
              { 'is-light': !isReversed })
          }
        >
          Reverse
        </button>

        {isStateNotReversedOrSorted && (
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
        {vissibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
