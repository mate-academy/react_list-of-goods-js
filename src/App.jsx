import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList/GoodsList';

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

const SORT_FIELD_ALPHABET = 'Alphabet';
const SORT_FIELD_LENGHT = 'Length';

function getPreparedGoods(goods, { sortField }) {
  const visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((word1, word2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return word1.localeCompare(word2);

        case SORT_FIELD_LENGHT:
          return word1.length - word2.length;

        default:
          return sortField;
      }
    });
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField });

  if (reverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_FIELD_ALPHABET
              ? 'button is-info'
              : 'button is-light'
          }
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_FIELD_LENGHT
              ? 'button is-success'
              : 'button is-light'
          }
          onClick={() => setSortField(SORT_FIELD_LENGHT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-warning': reverse,
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(null);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} key={goodsFromServer} />
    </div>
  );
};
