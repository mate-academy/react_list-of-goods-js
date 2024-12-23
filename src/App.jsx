import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useEffect } from 'react';

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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState('');
  const [order, setOrder] = useState('asc');

  const modifyGoods = (array, sortType, order) => {
    let modifiedArray = [...array];

    if (sortType === 'alphabetically') {
      modifiedArray.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'byLength') {
      modifiedArray.sort((a, b) => a.length - b.length);
    }

    if (order === 'desc') {
      modifiedArray.reverse();
    }

    return modifiedArray;
  };

  useEffect(() => {
    setGoods(modifyGoods(goodsFromServer, sortType, order));
  }, [sortType, order]);

  const clickSortAlphabetically = () => setSortType('alphabetically');
  const clickSortByLength = () => setSortType('byLength');
  const clickReverse = () => setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  const clickReset = () => {
    setSortType('');
    setOrder('asc');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? '' : 'is-light'}`}
          onClick={clickSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'byLength' ? '' : 'is-light'}`}
          onClick={clickSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${order === 'desc' ? '' : 'is-light'}`}
          onClick={clickReverse}
        >
          Reverse
        </button>

        {(sortType || order !== 'asc') && (
          <button
            type="button"
            className="button is-danger"
            onClick={clickReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
