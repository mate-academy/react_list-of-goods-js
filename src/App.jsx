import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames'
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

const alphabeticallySort = 'alphabet';
const reversedSort = 'reverse';
const lengthSort = 'length';

function getPreparedItems(goods, sortField, isReversed) {
  let sortedGoods = [...goods];
 
  if(sortField) {
    sortedGoods.sort((good1, good2) => {

      switch(sortField) {

        case alphabeticallySort :
          return good1.localeCompare(good2);

        case lengthSort :
          return good1.length - good2.length;

      }
    })
  }

  if (isReversed) {
    return sortedGoods.reverse()
  }
  
  return sortedGoods;
}



export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedItems(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn("button", "is-info", {
            "is-light" : sortField !== alphabeticallySort
          })}
          onClick={() => setSortField(alphabeticallySort)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn("button", "is-success", {
            "is-light" : sortField !== lengthSort
          })}
          onClick={() => setSortField(lengthSort)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn("button", "is-warning", {
            "is-light" : !isReversed
          })}
          onClick={() => {
            setIsReversed(prev => !prev)
            
          }}
        >
          Reverse
        </button>

        {sortField && (

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => setSortField('')}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          )
        })}
      </ul>
    </div>
  )
};
