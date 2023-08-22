import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
import './App.scss';
import { GoodList } from './components/GoodList/Goodlist';

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

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const setReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            onClick={() => setSortField(SORT_FIELD_ALPHABET)}
            type="button"
            className={cn('button is-info', {
              'is-light': sortField !== 'alphabet',
            })}
          >
            Sort alphabetically
          </button>

          <button
            onClick={() => setSortField(SORT_FIELD_LENGTH)}
            type="button"
            className={cn('button is-success', {
              'is-light': sortField !== SORT_FIELD_LENGTH,
            })}
          >
            Sort by length
          </button>

          <button
            onClick={() => {
              setIsReversed(!isReversed);
            }}
            type="button"
            className={cn('button is-warning', {
              'is-light': isReversed === false,
            })}
          >
            Reverse
          </button>

          {(sortField || isReversed) && (
            <button
              onClick={setReset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
        </div>

        <GoodList goods={visibleGoods} />
      </div>
    </>
  );
};
