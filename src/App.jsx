import 'bulma/css/bulma.css';
import classNames from 'classnames';
import { useState } from 'react';
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

// let preparedGoodsList = [...goodsFromServer];

const SORT_TYPE = { length: 'length', alphabet: 'alphabet' };

export const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good}>{good}</li>
    ))}
  </ul>
);

function sortPreparedGoods(arr, sortBy, reverse) {
  let preparedGoodsList = [...arr];

  switch (sortBy) {
    case SORT_TYPE.length:
      preparedGoodsList.sort((a, b) => a.length - b.length);
      break;
    case SORT_TYPE.alphabet:
      preparedGoodsList.sort((a, b) => a.localeCompare(b));
      break;
    default: preparedGoodsList = [...goodsFromServer];
  }

  if (reverse === 'reverse') {
    preparedGoodsList.reverse();
  }

  return preparedGoodsList;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [reverse, setReverse] = useState('');

  const preparedGoodsList = sortPreparedGoods(goodsFromServer, sortBy, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortBy !== SORT_TYPE.alphabet },
          )}
          onClick={() => setSortBy(SORT_TYPE.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortBy !== SORT_TYPE.length },
          )}
          onClick={() => setSortBy(SORT_TYPE.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': reverse === '' },
          )}
          onClick={() => {
            if (reverse === '') {
              setReverse('reverse');
            } else {
              setReverse('');
            }
          }}
        >
          Reverse
        </button>

        {(sortBy !== '' || reverse !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse('');
              setSortBy('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={preparedGoodsList} />
    </div>
  );
};
