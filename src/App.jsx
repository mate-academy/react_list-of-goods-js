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

const SORT_FIELD_ALP = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getSortedGoods(goods, sortField, reversed) {
  let sortedGoods = [...goods];

  if (sortField === SORT_FIELD_ALP) {
    sortedGoods = sortedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortField === SORT_FIELD_LENGTH) {
    sortedGoods = sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const sortedGoods = getSortedGoods(goodsFromServer, sortField, reversed);
  const isSorted = sortField !== '' || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames("button is-info", { 'is-light': sortField !== SORT_FIELD_ALP })}
          onClick={() => {
            setSortField(SORT_FIELD_ALP);
            setReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames("button is-success", { 'is-light': sortField !== SORT_FIELD_LENGTH })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
            setReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames("button is-warning", { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger"
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
        {sortedGoods.map((good) => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
