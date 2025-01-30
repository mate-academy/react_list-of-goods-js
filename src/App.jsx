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

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortAlphabetClass, setSortAlphabetClass] = useState(
    'button is-info is-light',
  );
  const [sortByLengthClass, setSortByLengthClass] = useState(
    'button is-success is-light',
  );
  const [reverseClass, setReverseClass] = useState(
    'button is-warning is-light',
  );
  const [resetClass, setResetClass] = useState('button is-danger is-light');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortAlphabetClass}
          onClick={() => {
            if (sortAlphabetClass === 'button is-info is-light') {
              setSortAlphabetClass('button is-info');
              setResetClass('button is-danger');
              setSortByLengthClass('button is-success is-light');
              setGoods(
                goods.sort((good1, good2) => good1[0].localeCompare(good2[0])),
              );
            }
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortByLengthClass}
          onClick={() => {
            if (sortByLengthClass === 'button is-success is-light') {
              setSortByLengthClass('button is-success');
              setSortAlphabetClass('button is-info is-light');
              setResetClass('button is-danger');
              setGoods(
                [...goodsFromServer].sort(
                  (good1, good2) => good1.length - good2.length,
                ),
              );
            }
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseClass}
          onClick={() => {
            if (
              reverseClass === 'button is-warning is-light' &&
              sortAlphabetClass === 'button is-info is-light' &&
              sortByLengthClass === 'button is-success is-light'
            ) {
              setReverseClass('button is-warning');
              setResetClass('button is-danger');
              setGoods(goods.reverse());
            } else if (
              reverseClass === 'button is-warning is-light' &&
              sortAlphabetClass === 'button is-info'
            ) {
              setReverseClass('button is-warning');
              setGoods(goods.reverse());
            } else if (
              reverseClass === 'button is-warning' &&
              sortAlphabetClass === 'button is-info'
            ) {
              setReverseClass('button is-warning is-light');
              setGoods(goods.reverse());
            } else if (
              reverseClass === 'button is-warning is-light' &&
              sortByLengthClass === 'button is-success'
            ) {
              setReverseClass('button is-warning');
              setGoods(goods.reverse());
            } else if (
              reverseClass === 'button is-warning' &&
              sortByLengthClass === 'button is-success'
            ) {
              setReverseClass('button is-warning is-light');
              setGoods(goods.reverse());
            } else if (
              reverseClass === 'button is-warning' &&
              sortAlphabetClass === 'button is-info is-light' &&
              sortByLengthClass === 'button is-success is-light'
            ) {
              setReverseClass('button is-warning is-light');
              setResetClass('button is-danger is-light');
              setGoods(goods.reverse());
            }
          }}
        >
          Reverse
        </button>

        {resetClass === 'button is-danger' && (
          <button
            type="button"
            className={resetClass}
            onClick={() => {
              setResetClass('button is-danger is-light');
              setSortAlphabetClass('button is-info is-light');
              setSortByLengthClass('button is-success is-light');
              setReverseClass('button is-warning is-light');
              setGoods([...goodsFromServer]);
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
