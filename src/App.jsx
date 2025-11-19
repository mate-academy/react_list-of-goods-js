import { useState } from 'react';
import 'bulma/css/bulma.css';
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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

export const GoodList = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);

function getPreparedGoods(goods, { sortField , reverse, query}) {
  let preparedGoods = [...goods];
  
  if (query) {
    preparedGoods = preparedGoods.filter(good => good.includes(query));
  }

  if(sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY:
        preparedGoods.sort();
        break;
      case SORT_FIELD_LENGTH:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;

}


export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);


  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField, reverse });



  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={
            () => setSortField(SORT_FIELD_ALPHABETICALLY)
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`
            button 
            is-success 
            ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}
          `}
          
          onClick={
            () => setSortField(SORT_FIELD_LENGTH)
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`
            button 
            is-warning 
            ${reverse === true ? '' : 'is-light'}
          `}
          onClick={
            () => setReverse(!reverse)
          }
        >
          Reverse
        </button>

        <button
          type="button"
          className={`
            button 
            is-danger 
            ${sortField === '' ? 'is-light' : ''}
          `}
          style={sortField === '' ? { display: 'none' } : {}}
          onClick={
            () => setSortField('')
          }
        >
          Reset
        </button>
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};