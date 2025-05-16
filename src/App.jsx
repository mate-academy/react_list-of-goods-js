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

export const App = () => {
  const [sortedField, setSortedField] = useState('');
  const [reversed, setReversed] = useState(false);

  let goods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortedField) {
      case 'alphabet':
        return good1.localeCompare(good2);

      case 'length':
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reversed) {
    goods = goods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(`button is-info`, {
            'is-light': sortedField !== 'alphabet',
          })}
          onClick={() => setSortedField('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(`button is-success`, {
            'is-light': sortedField !== 'length',
          })}
          onClick={() => setSortedField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(`button is-warning`, {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortedField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
