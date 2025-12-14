import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

function sortArr(sortField, array) {
  const arr = [...array];

  if (sortField === 'alphabetically') {
    return arr.sort();
  }

  if (sortField === 'length') {
    return arr.sort((elem1, elem2) => elem1.length - elem2.length);
  }

  if (sortField === '') {
    return arr;
  }

  return arr;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  let visibleGoods = sortArr(sortField, goodsFromServer);

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => setSortField('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() =>
            isReversed === false ? setIsReversed(true) : setIsReversed(false)
          }
        >
          Reverse
        </button>
        {sortField !== '' || isReversed === true ?
          <button
            type="button"
            className={`button is-danger is-light`}
            onClick={() => {setSortField(''); setIsReversed(false)}}
          >
            Reset
          </button> :
          null
        }
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
