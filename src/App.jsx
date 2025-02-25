import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cs from 'classnames';

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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_LENGTH = 'length';
const SORT_REVERSE = 'reverse';

export const App = () => {
  const [currentGoods, setCurrentGoods] = useState([...goodsFromServer]);
  const [field, setField] = useState(null);
  const [reversed, setReversed] = useState(false);

  function sortingGoods(fieldValue) {
    const sortedGoods = [...currentGoods];

    if (fieldValue === SORT_ALPHABETICALLY) {
      if (reversed === false) {
        sortedGoods.sort((a, b) => a.localeCompare(b));
      } else {
        sortedGoods.sort((a, b) => b.localeCompare(a));
      }
    }

    if (fieldValue === SORT_LENGTH) {
      if (reversed === false) {
        sortedGoods.sort((a, b) => a.length - b.length);
      } else {
        sortedGoods.sort((a, b) => b.length - a.length);
      }
    }

    if (fieldValue === SORT_REVERSE) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cs('button is-info', {
            'is-light': field !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            setField(SORT_ALPHABETICALLY);
            setCurrentGoods(sortingGoods(SORT_ALPHABETICALLY));
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cs('button is-success', {
            'is-light': field !== SORT_LENGTH,
          })}
          onClick={() => {
            setField(SORT_LENGTH);
            setCurrentGoods(sortingGoods(SORT_LENGTH));
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cs('button is-warning', {
            'is-light': reversed !== true,
          })}
          onClick={() => {
            if (reversed === false) {
              setReversed(true);
            } else {
              setReversed(false);
            }

            setCurrentGoods(sortingGoods(SORT_REVERSE));
          }}
        >
          Reverse
        </button>

        {JSON.stringify(currentGoods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className={cs('button is-danger', 'is-light')}
            onClick={() => {
              setReversed('');
              setCurrentGoods([...goodsFromServer]);
              setField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {currentGoods.map((good, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
