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

function getListFiltered(sort = '', reverse = false) {
  const filteredList = {
    filterType: sort,
    reversed: reverse,
    listOfGoods: [...goodsFromServer],
  };

  switch (sort) {
    case 'alphabetically':
      if (filteredList.reversed) {
        filteredList.listOfGoods.sort().reverse();
      } else {
        filteredList.listOfGoods.sort();
      }

      break;
    case 'length':
      filteredList.listOfGoods.sort((a, b) => {
        return a.length - b.length;
      });
      if (filteredList.reversed) {
        filteredList.listOfGoods.reverse();
      }

      break;
    case 'reset':
      filteredList.reversed = false;
      filteredList.listOfGoods = [...goodsFromServer];
      filteredList.filterType = '';
      break;
    default:
      if (filteredList.reversed) {
        filteredList.listOfGoods.reverse();
      } else {
        filteredList.listOfGoods = [...goodsFromServer];
      }
  }

  return filteredList;
}

export const App = () => {
  const [filter, setFilter] = useState(getListFiltered());

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            filter.filterType === 'alphabetically'
              ? 'button is-info'
              : 'button is-info  is-light '
          }
          onClick={() => {
            setFilter(getListFiltered('alphabetically', filter.reversed));
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            filter.filterType === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setFilter(getListFiltered('length', filter.reversed));
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            filter.reversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => {
            setFilter(getListFiltered(filter.filterType, !filter.reversed));
          }}
        >
          Reverse
        </button>

        {filter.listOfGoods.join('') !== goodsFromServer.join('') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setFilter(getListFiltered('reset'));
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {filter.listOfGoods.map(good => {
          return <li data-cy="Good">{good}</li>;
        })}
      </ul>
    </div>
  );
};
