import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { SORT_FIELD } from './constants';
import { GoodList } from './components/GoodList';
import { Buttons } from './components/Buttons';

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

function getPreparedGood(goods, options) {
  const { sortField, isReversed } = options;

  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD.ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD.LENGTH:
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

  return (
    <div className="section content">
      <Buttons
        sortField={sortField}
        sortBy={setSortField}
        isReversed={isReversed}
        changeOrder={setIsReversed}
      />

      <GoodList goods={preparedGoods} />
    </div>
  );
};
