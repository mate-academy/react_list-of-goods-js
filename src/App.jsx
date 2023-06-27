import { useState } from 'react';
import { GoodList } from './components/GoodList';
import { Buttons } from './components/Buttons';
import 'bulma/css/bulma.css';
import './App.scss';

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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGood(goods, options) {
  const { sortField, isReversed } = options;

  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGood(goodsFromServer, {
    sortField,
    isReversed,
  });

  const sortOptions = {
    sortField,
    setSortField,
    isReversed,
    setIsReversed,
    SORT_FIELD_ALPHABET,
    SORT_FIELD_LENGTH,
  };

  return (
    <div className="section content">
      <Buttons sortOptions={sortOptions} />

      <GoodList goods={preparedGoods} />
    </div>
  );
};
