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

const SORT_FORMAT_ALPHABETICALLY = 'alphabetically';
const SORT_FORMAT_LENGTH = 'length';

const getPreparedGoods = (goods = [], { sortFormat, reversed } = {}) => {
  const preparedGoods = [...goods];

  if (sortFormat) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFormat) {
        case SORT_FORMAT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FORMAT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [reversed, setReversed] = useState(false);
  const [sortFormat, setSortFormat] = useState('');

  const visiableGoods = getPreparedGoods(goodsFromServer, {
    sortFormat,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortFormat !== SORT_FORMAT_ALPHABETICALLY,
          })}
          onClick={() => setSortFormat(SORT_FORMAT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortFormat !== SORT_FORMAT_LENGTH,
          })}
          onClick={() => setSortFormat(SORT_FORMAT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortFormat || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortFormat('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visiableGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
