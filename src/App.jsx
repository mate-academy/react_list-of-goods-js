import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import clsx from 'clsx';

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

const SORT_FIELD_ALPH = 'alph';
const SORT_FIELD_LENGTH = 'length';

function getSortField(goods, kindSort) {
  const copyGoods = [...goods];

  if (kindSort) {
    copyGoods.sort((good1, good2) => {
      switch (kindSort) {
        case SORT_FIELD_ALPH:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return copyGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  let visibleField = getSortField(goodsFromServer, sortField);

  if (reversed) {
    visibleField = visibleField.toReversed();
  }

  const isUnsorted = () => {
    return visibleField.every((item, i) => item === goodsFromServer[i]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={clsx('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPH,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={clsx('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={clsx('button', 'is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {!isUnsorted() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleField.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
