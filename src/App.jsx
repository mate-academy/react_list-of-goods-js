import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const ALPHABETICALLY = 'alphabetically';
const LENGTH = 'length';

function getPreparedGoods(goods, sortProducts, reversed) {
  const preparedGoods = [...goods];

  if (sortProducts) {
    preparedGoods.sort((good1, good2) => {
      switch (sortProducts) {
        case ALPHABETICALLY:
          return good1.localeCompare(good2);
        case LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortProducts, setSortProducts] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortProducts,
    reversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortProducts !== ALPHABETICALLY,
          })}
          onClick={() => setSortProducts(ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortProducts !== LENGTH,
          })}
          onClick={() => setSortProducts(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortProducts !== '' || reversed !== false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortProducts('');
              setReversed(false);
            }}
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
