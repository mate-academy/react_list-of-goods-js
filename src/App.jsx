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

function getPreparedGoods(goods, sortType) {
  let preparedGoods = [...goods]

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case 'Alphabet':
          return good1.localeCompare(good2)
        case 'Length':
          return good1.length - good2.length
        default:
          return 0
      }
    })
  }

  return preparedGoods
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState(false)
  let visibleGoods = getPreparedGoods(goodsFromServer, sortType);
  if (reversed) {
    visibleGoods = visibleGoods.reverse()
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" className={`button is-info ${sortType === 'Alphabet' ? '' : 'is-light'}`} onClick={() => setSortType('Alphabet')}>
          Sort alphabetically
        </button>

        <button type="button" className={`button is-success ${sortType === 'Length' ? '' : 'is-light'}`} onClick={() => setSortType('Length')} >
          Sort by length
        </button>

        <button type="button" className={`button is-warning ${reversed ? '' : 'is-light'}`} onClick={() => setReversed(!reversed)}>
          Reverse
        </button>

        {(sortType !== '' || reversed) && (
          <button type="button" className="button is-danger is-light" onClick={() => {setSortType(''), setReversed(false)}}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
           <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  )
};
