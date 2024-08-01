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

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);

const SORT_BY_ALPH = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPrepareGoods(goods, { sortField }) {
  const prepareGoods = [...goods];

  switch (sortField) {
    case SORT_BY_ALPH:
      prepareGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_BY_LENGTH:
      prepareGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  let visibleGoods = getPrepareGoods(goodsFromServer, { sortField });
  const [reversedField, setReversedField] = useState(false);

  if (reversedField) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_BY_ALPH ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_BY_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${reversedField === true ? '' : 'is-light'}`}
          onClick={() => setReversedField(!reversedField)}
        >
          Reverse
        </button>
        {(sortField || reversedField) && (
          <button
            onClick={() => {
              setSortField('');
              setReversedField(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
