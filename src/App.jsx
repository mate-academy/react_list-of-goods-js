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
  const copyGoods = [...goodsFromServer];
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const resetToDefault = () => {
    setSortField('');
    setReversed(false);
  }

  let visibleGoods = copyGoods;

  if (sortField) {
    visibleGoods = copyGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'alphabetically':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if(reversed){
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // className= "button is-info is-light"
          className={`button is-info ${sortField === 'alphabetically' ? '' : `is-light`}`}
          onClick={() => setSortField('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          // className="button is-success is-light"
          className={`button is-success ${sortField === 'length' ? '' : `is-light`}`}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          // className="button is-warning"
          className={`button is-warning ${reversed ? '' : `is-light`}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetToDefault}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
