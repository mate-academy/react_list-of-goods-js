import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { ListGoods } from './components/ListGoods/ListGoods';
import { Buttons } from './components/Buttons/Buttons';

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

export const App = () => {
  const [listProduct, setListProduct] = useState(goodsFromServer); // стан для масива продуктів
  const [sort, setSort] = useState(null); // тип сортування
  const [isResetVisible, setIsResetVisible] = useState(false); // видимість кнопке ресет
  const [isReverseActive, setIsReverseActive] = useState(false); // флаг для кнопки реверс

  const sortAlphabetically = () => {
    const sortArr = listProduct.toSorted((a, b) => a.localeCompare(b));

    setListProduct(sortArr);
    setSort('alphabet');
    setIsResetVisible(true);
  };

  const sortLength = () => {
    const sortArr = listProduct.toSorted((a, b) => a.length - b.length);

    setListProduct(sortArr);
    setSort('length');
    setIsResetVisible(true);
  };

  const reset = () => {
    setListProduct(goodsFromServer);
    setIsResetVisible(false);
  };

  const reverse = () => {
    setIsReverseActive(prev => !prev);
    setIsResetVisible(true);
  };

  return (
    <div className="section content">
      <Buttons
        sortAlph={sortAlphabetically}
        sortLeng={sortLength}
        resetArr={reset}
        activeSort={sort}
        onReverse={reverse}
        isResetVisible={isResetVisible}
        isReverseActive={isReverseActive}
      />
      <ListGoods goods={listProduct} />
    </div>
  );
};

// const reversArr = [...listProduct].reverse();

// setListProduct(reversArr);
