import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_METHOD_ALPHABET = 'Alphabet';
const SORT_METHOD_LENGTH = 'length';

function getPrepearedGoods(goods, sortMethod, reverse) {
  const prepearedGoods = [...goods];

  if (sortMethod) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case SORT_METHOD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_METHOD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPrepearedGoods(goodsFromServer, sortMethod, reverse);

  const toggleReverse = () => {
    setReverse(!reverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortMethod !== SORT_METHOD_ALPHABET,
          })}
          onClick={() => {
            setSortMethod(SORT_METHOD_ALPHABET);
            setReverse(false); // Reset reverse when changing sort method
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortMethod !== SORT_METHOD_LENGTH,
          })}
          onClick={() => {
            setSortMethod(SORT_METHOD_LENGTH);
            setReverse(false); // Reset reverse when changing sort method
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortMethod('');
            setReverse(false);
          }}
        >
          Reset
        </button>
      </div>

      {visibleGoods.map(good => (
        <ul>
          <li data-cy="Good">{good}</li>
        </ul>
      ))}
    </div>
  );
};
