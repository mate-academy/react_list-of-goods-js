import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);

  const handleAlphabeticalSort = () => {
    setSortField(SORT_FIELD_NAME);
    setSortedGoods([...sortedGoods]
      .sort((good1, good2) => {
        const sortFunc = reverse
          ? good2.localeCompare(good1)
          : good1.localeCompare(good2);

        return sortFunc;
      }));
  };

  const handleLengthSort = () => {
    setSortField(SORT_FIELD_LENGTH);
    setSortedGoods([...sortedGoods]
      .sort((good1, good2) => {
        const sortFunc = reverse
          ? good2.length - good1.length
          : good1.length - good2.length;

        return sortFunc;
      }));
  };

  const handleRevers = () => {
    setReverse(!reverse);
    setSortedGoods([...sortedGoods].reverse());
  };

  const handleReset = () => {
    setSortField('');
    setSortedGoods([...goodsFromServer]);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,

          })}
          onClick={() => handleAlphabeticalSort()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => handleLengthSort()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => handleRevers()}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => handleReset()}
        >
          Reset
        </button>
        )}

      </div>

      <ul>
        {sortedGoods.map(good => (
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
