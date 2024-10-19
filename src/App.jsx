import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_BY_ALPHABET = 'by_alph';
const SORT_BY_LENGTH = 'by_length';

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

function sorteGoods (goods, sortedField, reversed) {
  goods.sort((a, b) => {
    switch (sortedField) {
      case SORT_BY_ALPHABET:
        return a.localeCompare(b);
      case SORT_BY_LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  })

  if (reversed) {
    goods.reverse();
  }

  return goods;
}
export const App = () => {
  const [sortedField,setSortedField] = useState('');
  const [reversed, setReversed] = useState(false);

  let goods = sorteGoods([...goodsFromServer], sortedField, reversed);

  function reset () {
    setSortedField('');
    setReversed(false);
    goods = [...goodsFromServer];
  }
  return (
  <div className="section content">
    <div className="buttons">
      <button
        type="button"
        className={
          cn({
            button: true,
            'is-info': true,
            'is-light': SORT_BY_ALPHABET !== sortedField
          })
        }
        onClick={() => setSortedField(SORT_BY_ALPHABET)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={
          cn({
            button: true,
            'is-success': true,
            'is-light': SORT_BY_LENGTH !== sortedField
          })
        }
        onClick={() => setSortedField(SORT_BY_LENGTH)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={
          cn({
            button: true,
            'is-warning': true,
            'is-light': !reversed
          })
        }
        onClick={() => setReversed(!reversed)}
      >
        Reverse
      </button>

      {(sortedField || reversed) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
      )}
    </div>

    <ul>
      {goods.map((good,i) =>(
        <li key={good} data-cy="Good">{good}</li>
      ))}
    </ul>
  </div>
)};
