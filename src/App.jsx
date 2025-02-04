import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
// import { queries } from '@testing-library/react';

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

const GoodList = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};

export const App = () => {
  function getPreparedGoods(goods, { sortField }, reversed) {
    const preparedGoods = [...goods];

    if (sortField === 'length') {
      preparedGoods.sort((elem1, elem2) => elem1.length - elem2.length);
    }

    if (sortField === 'alfabet') {
      preparedGoods.sort((elem1, elem2) => elem1.localeCompare(elem2));
    }

    if (reversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  }

  const [rev, setRev] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField }, rev);

  const resetGoods = () => {
    setSortField('');
    setRev(false);
  };

  const areArraysEqual = (arr1, arr2) =>
    arr1.length === arr2.length &&
    arr1.every((el, index) => el === arr2[index]);

  const isChanged = !areArraysEqual(visibleGoods, goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-warning ${sortField !== 'alfabet' ? 'is-light' : ''}`}
          onClick={() => {
            setSortField('alfabet');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-warning ${sortField !== 'length' ? 'is-light' : ''}`}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!rev ? 'is-light' : ''}`}
          onClick={() => {
            setRev(prev => !prev);
          }}
        >
          Reverse
        </button>

        {!isChanged ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
