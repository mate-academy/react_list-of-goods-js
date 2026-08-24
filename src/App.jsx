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
  const [reversed, setReversed] = useState(false);
  let visibleGoods = [...goodsFromServer];
  if (sortField === 'alphabetically') {
    visibleGoods = visibleGoods.toSorted((a, b) => a.localeCompare(b));
  }
  if (sortField === 'byLength') {
    visibleGoods = visibleGoods.toSorted((a, b) => a.length - b.length);
  }
  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }
  return (
    <div className="section content">
      <div className="buttons">
        <button
        type="button"
        className= {sortField === 'alphabetically' ? "button is-info" : "button is-info is-light"}
        onClick={() => setSortField('alphabetically')}
        >
          Sort alphabetically
        </button>

      <button
      type="button"
      className={sortField === 'byLength' ? "button is-success" : "button is-success is-light"}
      onClick={() => setSortField('byLength')}
      >
        Sort by length
      </button>

      <button
      type="button"
      className= {reversed ? "button is-warning" : "button is-warning is-light"}
      onClick={() => setReversed(!reversed)}
      >
        Reverse
      </button>

      {(sortField || reversed) && (
      <button
      type="button"
      className="button is-danger is-light"
      onClick={() => {
        setSortField('');
        setReversed(false);
      }}
      >
        Reset
      </button>
      )}
      </div>

    <ul>
      {visibleGoods.map((good) => (
        <li data-cy="Good" key={good}>{good}</li>
      ))}
    </ul>
  </div>
)};
