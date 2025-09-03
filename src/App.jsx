import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
import './App.scss';
import { ProductList } from './components/productList';

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

const SORT_PRODUCT_NAME = 'alphabetically';
const SORT_PRODUCT_LENGTH = 'length';
const PRODUCT_REVERSE = 'reverse';

function getSortedGoods(list, { sortProduct, reverse = '' }) {
  const newGoodList = [...list];

  if (sortProduct) {
    newGoodList.sort((poz1, poz2) => {
      switch (sortProduct) {
        case SORT_PRODUCT_NAME:
          return poz1.localeCompare(poz2);

        case SORT_PRODUCT_LENGTH:
          return poz1.length - poz2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse === PRODUCT_REVERSE) {
    newGoodList.reverse();
  }

  return newGoodList;
}

export const App = () => {
  const [sortProduct, setSortProduct] = useState('');
  const [reverse, setReverse] = useState('');
  const visibleProduct = getSortedGoods(goodsFromServer, {
    sortProduct,
    reverse,
  });

  const coincidence = (
    visibleProduct.length === goodsFromServer.length 
  &&  visibleProduct.every((g, i) => g === goodsFromServer[i]))

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortProduct !== SORT_PRODUCT_NAME,
          })}
          onClick={() => setSortProduct(SORT_PRODUCT_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortProduct !== SORT_PRODUCT_LENGTH,
          })}
          onClick={() => setSortProduct(SORT_PRODUCT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverse !== PRODUCT_REVERSE,
          })}
          onClick={() =>
            setReverse(ch => (ch !== PRODUCT_REVERSE ? PRODUCT_REVERSE : ''))
          }
        >
          Reverse
        </button>

        {!coincidence && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortProduct('');
              setReverse('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ProductList products={visibleProduct} />
    </div>
  );
};
