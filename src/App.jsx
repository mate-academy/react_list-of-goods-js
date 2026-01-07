import 'bulma/css/bulma.css';
// import cn from 'classnames';
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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGood(goods, { sortField }) {
  const preparedGoods = [...goods]; // копіюємо початковий масив


  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  let visibleGood = getPreparedGood(goodsFromServer, { sortField, reversed });

  if (reversed) {
    visibleGood = visibleGood.toReversed();
  }

  // const reverse = () => {
  //   setReversed(!reversed);
  //   setVisibleGood([...visibleGood].reverse());
  // };

  // const sortByLength = () => {
  //   setVisibleGood(
  //     [...visibleGood].sort((good1, good2) => good1.length - good2.length),
  //   );
  //   setSortField(SORT_FIELD_LENGTH);
  // };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_NAME ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {JSON.stringify(visibleGood) !== JSON.stringify(goodsFromServer) ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(''); setReversed(!reversed);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGood.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
