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

export const App = () => {
  const [sortField, setSortfield] = useState('');

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case 'Sort alphabetically':
        return good1.localeCompare(good2);
      case 'Sort by length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });
  const [reversed, setReversed] = useState(false);

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== 'Sort alphabetically',
          })}
          onClick={() => setSortfield('Sort alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== 'Sort by length',
          })}
          onClick={() => setSortfield('Sort by length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField !== '' || reversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortfield('');
              setReversed(false);
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
