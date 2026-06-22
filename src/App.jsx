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

export const App = () => {
  const [sortField, setSortField] = useState('');
  let visibleGoods = goodsFromServer;


  if (sortField) {
    visibleGoods = visibleGoods.toSorted(
      (good1, good2) => {
        switch (sortField) {
          case 'alphabet':
            return good1.localeCompare(good2);
          case 'length':
            return good1.length - good2.length;
          default:
            return 0;
        }
      }
    );
  }

  const [reversed, setReversed] = useState(false);
  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortField === 'alphabet' ? "button is-success" : 'button is-success is-light'}
          onClick={() => setSortField('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortField === 'length' ? 'button is-success' : 'button is-success is-light'}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reversed ? 'button is-warning' : "button is-warning is-light"}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField !== '' || reversed) && (
          <button
            type="button"
            className={"button is-danger is-light"}
            onClick={() => {
              setSortField('')
              setReversed(false);
            }}
          >
            Reset
          </button>)}


      </div>

      <ul>
        {visibleGoods.map(field => (
          <li data-cy="Good">{field }</li>
        ))}
      </ul>
    </div>
  );
}
