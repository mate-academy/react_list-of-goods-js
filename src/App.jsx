import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';
import { GoodsList } from './components/GoodsList';

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

const ALPHABET_SORT_METHOD = 'alphabetical';
const LENGTH_SORT_METHOD = 'length';

function getPreparedGoods(goods, { sortMethod, isReversed }) {
  let preparedGoods = [...goods];

  if (sortMethod) {
    preparedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case ALPHABET_SORT_METHOD:
          return good1.localeCompare(good2);
        case LENGTH_SORT_METHOD:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.toReversed();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortMethod,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            button: true,
            'is-info': true,
            'is-light': sortMethod !== ALPHABET_SORT_METHOD,
          })}
          onClick={() => {
            setSortMethod(ALPHABET_SORT_METHOD);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-success': true,
            'is-light': sortMethod !== LENGTH_SORT_METHOD,
          })}
          onClick={() => {
            setSortMethod(LENGTH_SORT_METHOD);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': isReversed === false,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {(sortMethod || isReversed) && (
          <button
            type="button"
            className={cn({
              button: true,
              'is-danger': true,
              'is-light': true,
            })}
            onClick={() => {
              setSortMethod('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
