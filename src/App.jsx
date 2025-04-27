import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortType) {
  let preparedGoods = [...goods];

  if (sortType) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(null); // 'alphabet' | 'length' | null
  const [isReversed, setIsReversed] = useState(false);
  let visibleGoods = getPreparedGoods(goodsFromServer, sortType);

  const handleReverseButton = () => {
    setIsReversed(!isReversed);
    visibleGoods = [...visibleGoods].reverse();

    return visibleGoods;
  };

  const handleReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  const isDefaultOrder = sortType === null && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SORT_FIELD_ALPHABET)}
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortType(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseButton}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
