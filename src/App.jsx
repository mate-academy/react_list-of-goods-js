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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getReadyGoods(goods, sortField, reverse) {
  let readyGoods = [...goods];

  if (sortField) {
    readyGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    readyGoods = readyGoods.reverse();
  }

  return readyGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getReadyGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABETICALLY },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={classNames(
            'button',
            'is-sucess',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !reverse },
          )}
        >
          Reverse
        </button>

        {(sortField.length > 0 || reverse) && (
        <button
          type="button"
          className={classNames(
            'button',
            'is-danger',
            'is-light',
          )}
          onClick={() => {
            setSortField('');
            setReverse(false);
          }}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
