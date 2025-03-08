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

const SORT_FIELD_AFLPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setField] = useState('');
  const [isReverse, setReverse] = useState(false);
  const [sortGoods, setGoods] = useState(goodsFromServer);

  function renderGoods(goods, _sortField, _isReverse) {
    if (_sortField === sortField && _isReverse === isReverse) {
      return;
    }

    let preparedGoods = [...goods];

    setField(_sortField);
    setReverse(_isReverse);

    if (_sortField) {
      preparedGoods.sort((good1, good2) => {
        switch (_sortField) {
          case SORT_FIELD_AFLPHABETICALLY:
            return good1.localeCompare(good2);
          case SORT_FIELD_LENGTH:
            if (good1.length - good2.length === 0) {
              return good1.localeCompare(good2);
            }

            return good1.length - good2.length;
          default:
            return preparedGoods;
        }
      });
    }

    if (_isReverse) {
      preparedGoods = [...preparedGoods.reverse()];
    }

    if (!_sortField && !_isReverse) {
      preparedGoods = [...goodsFromServer];
    }

    setGoods(preparedGoods);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_AFLPHABETICALLY,
          })}
          onClick={() =>
            renderGoods(sortGoods, SORT_FIELD_AFLPHABETICALLY, isReverse)
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', ' is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => renderGoods(sortGoods, SORT_FIELD_LENGTH, isReverse)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', ' is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => renderGoods(sortGoods, sortField, !isReverse)}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className={cn('button', ' is-danger', 'is-light')}
            onClick={() => renderGoods(sortGoods, '', false)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
