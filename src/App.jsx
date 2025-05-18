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
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = goodsFromServer.toSorted((good1, good2) => {
    switch (sortField) {
      case 'alphabet':
        return good1.localeCompare(good2);
      case 'length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  visibleGoods = reversed ? visibleGoods.toReversed() : visibleGoods;

  const handleReset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField('alphabet')}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== 'alphabet',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField('length')}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': reversed !== true,
          })}
        >
          Reverse
        </button>

        {sortField !== '' || reversed ? (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
