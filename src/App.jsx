import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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

function getGoods(goods, { goodsField, isReversed }) {
  let prepareGoods = [...goodsFromServer];

  if (goodsField) {
    prepareGoods.sort((good1, good2) => {
      switch (goodsField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });

    if (isReversed) {
      prepareGoods = prepareGoods.reverse();
    }
  }

  return prepareGoods;
}

export const App = () => {
  const [goodsField, setGoodsField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getGoods(goodsFromServer, { goodsField, isReversed });

  const handleReset = () => {
    setGoodsField('');
    setIsReversed(false);
  };

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn('button is-info', {
              'is-light': goodsField !== SORT_BY_ALPHABET,
            })}
            onClick={() => setGoodsField(SORT_BY_ALPHABET)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn('button is-success', {
              'is-light': goodsField !== SORT_BY_LENGTH,
            })}
            onClick={() => setGoodsField(SORT_BY_LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn('button is-warning', {
              'is-light': !isReversed,
            })}
            onClick={() => setIsReversed(!isReversed)}
          >
            Reverse
          </button>

          {goodsField && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleReset}
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
    </>
  );
};
