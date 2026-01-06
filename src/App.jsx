import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './Goodlist';

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

function getVisibleGoods(goods, sortField, isReversed) {
  const result = [...goods];

  if (sortField) {
    result.sort((good1, good2) => {
      switch (sortField) {
        case 'length':
          return good1.length - good2.length;
        case 'name':
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReversed);

  return (
  <div className="section content">
    <div className="buttons">
      <button type="button" className={sortField === 'name' ? "button is-info" : "button is-info is-light"}
      onClick={() => setSortField('name')}>
        Sort alphabetically
      </button>

      <button type="button" className={sortField === 'length' ? "button is-success" : "button is-success is-light"}
      onClick={() => setSortField('length')}>
        Sort by length
      </button>

      <button type="button" className={isReversed ? "button is-warning" : "button is-warning is-light"}
      onClick={() => setIsReversed(!isReversed)}>
        Reverse
      </button>

      {(sortField || isReversed) && (
  <button
    type="button"
    className="button is-danger is-light"
    onClick={() => {
      setSortField('')
    setIsReversed(false)
  }}
  >
    Reset
  </button>
)}
    </div>

     <GoodList goods={visibleGoods} />
  </div>
  );
};
