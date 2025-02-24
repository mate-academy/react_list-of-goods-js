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

const SORT_BY_ALPHABET = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortType, isReversed) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);

  const startReset = () => {
    setSortField('');
    setVisibleGoods([...goodsFromServer]);
    setIsReversed(false);
  };

  const sortInitially = styleSort => {
    setSortField(styleSort);

    setVisibleGoods(
      getPreparedGoods([...goodsFromServer], styleSort, isReversed),
    );
  };

  const handleSetReversed = () => {
    setIsReversed(!isReversed);
    setVisibleGoods([...visibleGoods].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => sortInitially(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={() => sortInitially(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleSetReversed}
        >
          Reverse
        </button>

        {(!sortField && !isReversed) || (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={startReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(el => (
          <li data-cy="Good" key={el}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
