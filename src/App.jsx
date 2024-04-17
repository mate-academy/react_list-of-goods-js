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

const SORT_BY_ALPHABET = {
  id: 1,
  title: 'Sort alphabetically',
  class: 'is-info',
};
const SORT_BY_LENGTH = {
  id: 2,
  title: 'Sort by length',
  class: 'is-success',
};
const REVERSE = {
  id: 3,
  title: 'Reverse',
  class: 'is-warning',
};
const RESET = {
  id: 4,
  title: 'Reset',
  class: 'is-danger',
};

export const App = () => {
  const [sortBtn, setSortBtn] = useState('');
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [onReverse, setOnReverse] = useState('none');
  const sortOnClick = sort => {
    let newSortedGoods = [...sortedGoods];

    switch (sort) {
      case SORT_BY_ALPHABET:
        newSortedGoods = [...goodsFromServer].sort((a, b) =>
          a.localeCompare(b),
        );
        break;
      case SORT_BY_LENGTH:
        newSortedGoods = [...goodsFromServer].sort(
          (a, b) => a.length - b.length,
        );
        break;
      case REVERSE:
        newSortedGoods.reverse();
        break;
      case RESET:
        newSortedGoods = [...goodsFromServer];
        break;
      default:
        break;
    }

    const sortedGoodsString = newSortedGoods.join('');
    const goodsFromServerString = goodsFromServer.join('');

    if (sortedGoodsString !== goodsFromServerString) {
      setOnReverse('block');
    } else {
      setOnReverse('none');
    }

    setSortedGoods(newSortedGoods);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {[SORT_BY_ALPHABET, SORT_BY_LENGTH, REVERSE, RESET].map(type => (
          <button
            key={type.id}
            type="button"
            className={
              sortBtn === type
                ? `button ${type.class}`
                : `button ${type.class} is-light`
            }
            onClick={() => {
              setSortBtn(type);
              sortOnClick(type);
            }}
            style={type === RESET ? { display: onReverse } : {}}
          >
            {type.title}
          </button>
        ))}
      </div>
      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
