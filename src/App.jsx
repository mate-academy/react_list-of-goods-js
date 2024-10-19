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

const SORT_FILD_ALPHABETICCALY = 'alphabeticcaly';
const SORT_FILD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, rever) {
  let newVisibleGoods = [...goods];

  if (sortField === SORT_FILD_ALPHABETICCALY) {
    newVisibleGoods.sort();
  }

  if (sortField === SORT_FILD_LENGTH) {
    newVisibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (rever) {
    return newVisibleGoods.reverse();
  }

  if (sortField === '') {
    newVisibleGoods = [...goods];
  }

  return newVisibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [rever, setRever] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, rever);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_FILD_ALPHABETICCALY,
          })}
          onClick={() => setSortField(SORT_FILD_ALPHABETICCALY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_FILD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FILD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': rever === false,
          })}
          onClick={() => {
            setRever(!rever);
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || rever === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setRever(false);
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
