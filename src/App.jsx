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

const alphabet = 'Sort alphabetically';
const length = 'Sort by length';
const reset = 'Reset';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = goodsFromServer.toSorted((good1, good2) => {
    switch (sortField) {
      case alphabet:
        return good1.localeCompare(good2);
      case length:
        return good1.length - good2.length;
      case reset:
        return goodsFromServer;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  function resetClick() {
    setSortField('');
    setReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== alphabet,
          })}
          onClick={() => setSortField(alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== length,
          })}
          onClick={() => setSortField(length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            active: reversed,
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(reversed || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              resetClick();
            }}
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
  );
};
