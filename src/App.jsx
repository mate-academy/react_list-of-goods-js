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

export const CardList = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'LENGTH';

function getSortGoods(goods, { sortField, reversed }) {
  let pGoods = [...goods];

  if (sortField === SORT_ALPHABET) {
    pGoods = pGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === SORT_LENGTH) {
    pGoods = pGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    return pGoods.toReversed();
  }

  return pGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getSortGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  const isChanged = sortField !== '' || reversed !== false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_ALPHABET);
          }}
          type="button"
          className={
            sortField === SORT_ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_LENGTH);
          }}
          type="button"
          className={
            sortField === SORT_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReversed(prev => !prev);
          }}
          type="button"
          className={
            reversed === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {isChanged && (
          <button
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            type="button"
            className={
              sortField === ''
                ? 'button is-danger'
                : 'button is-danger is-light'
            }
          >
            Reset
          </button>
        )}
      </div>
      <CardList goods={visibleGoods} />
    </div>
  );
};
