import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
// import classNames from 'classnames';

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

  const SORT_BY_ALFABETI = 'alphabetically';
  const SORT_BY_LENGTH = 'length';

function getGoods (sortField, goodsFromServer){
    let goods = [...goodsFromServer];
    let visibleGoods = goods.toSorted((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALFABETI:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH :
          return good1.length - good2.length;
        default : return 0;
      }
    })
    return visibleGoods;
  }
function reverse (sortReverse,visibleGoods){
  if(sortReverse){
    let result = [...visibleGoods].reverse();
    return result;
  }
  else{
    return visibleGoods;
  }
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setSortReverse] = useState(false)
  let videlGoods = getGoods(sortField, [...goodsFromServer]);
  let finalyGoods = reverse(sortReverse,videlGoods);
  return (

  <div className="section content">
    <div className="buttons">
      <button onClick={() => setSortField(SORT_BY_ALFABETI)} type="button" className={`button is-info ${sortField === SORT_BY_ALFABETI? '' : 'is-light'}`}>
        Sort alphabetically
      </button>

      <button onClick={() => setSortField(SORT_BY_LENGTH)} type="button" className={`button is-success ${sortField === SORT_BY_LENGTH ? '' : 'is-light'}`}>
        Sort by length
      </button>

      <button onClick={() =>  setSortReverse(prev => !prev)} type="button" className={`button is-warning ${sortReverse === true?'':'is-light'}`}>
        Reverse
      </button>

      {sortField !== '' || sortReverse !== false?<button onClick={() =>{setSortField(""); setSortReverse(false)}} type="button" className="button is-danger is-light">
        Reset
      </button>:''}
    </div>

    <ul>
      {finalyGoods.map((object, index) => (
        <li key = {index} data-cy="Good">{object}</li>
      ))}
    </ul>
  </div>)
};
