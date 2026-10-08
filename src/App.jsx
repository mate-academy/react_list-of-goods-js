import { useState } from 'react';
import classNames from 'classnames';
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

const SORD_FIELD_ALPH = 'alph';
const SORD_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const isChanged = sortField !== '' || reversed;
  let goods = [...goodsFromServer];

  if (sortField !== '') {
    goods.sort((good1, good2) => {
      switch (sortField) {
        case SORD_FIELD_LENGTH:
          return good1.length - good2.length;
        case SORD_FIELD_ALPH:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    goods = goods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORD_FIELD_ALPH,
          })}
          onClick={() => setSortField(SORD_FIELD_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORD_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORD_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isChanged && (
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
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
