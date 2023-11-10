import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './components/GoodList';

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

const SORT_BY_ALF = 'alphabetically';
const SORT_BY_LEN = 'length';

function getPreparedGoods(sortBy, reversed) {
  const preparedGoods = [...goodsFromServer];

  if (sortBy === SORT_BY_ALF) {
    preparedGoods.sort();
  } else if (sortBy === SORT_BY_LEN) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALF)}
          type="button"
          className={`button is-info ${cn({ 'is-light': sortField !== SORT_BY_ALF })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LEN)}
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SORT_BY_LEN })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={`button is-warning ${cn({ 'is-light': !reversed })}`}
        >
          Reverse
        </button>

        {(sortField !== '' || reversed === true) && (
          <button
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
