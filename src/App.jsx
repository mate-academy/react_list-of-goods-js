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

const SORT_FIELD_TITLE = 'title';
const SORT_FIELD_LENGTH = 'length';

const sortProducts = (products, sortField, reversed) => {
  const sortedProducts = [...products];

  if (sortField) {
    sortedProducts.sort((product1, product2) => {
      switch (sortField) {
        case SORT_FIELD_TITLE:
          return product1.localeCompare(product2);
        case SORT_FIELD_LENGTH:
          return product1.length - product2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    sortedProducts.reverse();
  }

  return sortedProducts;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleProducts = sortProducts(goodsFromServer, sortField, isReversed);

  const resetFields = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_TITLE })}
          onClick={() => setSortField(SORT_FIELD_TITLE)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(reverseField => !reverseField)}
        >
          Reverse
        </button>

        {sortField || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFields}
          >
            Reset
          </button>
        ) : null}

      </div>
      <ul>
        {visibleProducts.map(product => (
          <li data-cy="Good" key={product}>{product}</li>
        ))}
      </ul>
    </div>
  );
};
