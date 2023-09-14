import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './components/GoodList';

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

const SetById = 'id';
const SetByAlphabet = 'alphabet';
const SetByLength = 'length';
const SetByReverse = true;
const SetByDanger = 'danger';

function getSortedGoods(goods, { sortField, query, reversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SetById:
        case SetByAlphabet:
          return good1.localeCompare(good2);
        case SetByLength:
          return good1.length - good2.length;
        default: return 0;
      }
    });
  }

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState(SetByDanger);
  const [reversed, setReversed] = useState(false);
  const SortedOptions
    = getSortedGoods(goodsFromServer,
      { sortField, query: 'o', reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortField(SetByAlphabet)}
          type="button"
          className={`button is-info ${sortField === SetByAlphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setsortField(SetByLength)}
          type="button"
          className={`button is-success ${sortField === SetByLength ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReversed(!reversed);
          }
          }
          type="button"
          className={`button is-warning ${reversed === SetByReverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(reversed || sortField !== SetByDanger) && (
          <button
            onClick={() => {
              setReversed(false);
              setsortField(SetByDanger);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={SortedOptions} />
    </div>
  );
};
