import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { Button } from './components/Button';
import { Goods } from './components/Goods/Goods';

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

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

const filteringGoods = (goods, { sortField, isReversed }) => {
  const goodsForFiltering = [...goods];

  goodsForFiltering.sort((good1, good2) => {
    switch (sortField) {
      case SORT_BY_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_BY_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    return goodsForFiltering.reverse();
  }

  return goodsForFiltering;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = filteringGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reverseState = () => {
    setIsReversed(!isReversed);
  };

  const resetStates = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          click={() => setSortField(SORT_BY_ALPHABET)}
          mainClass="is-info"
          condition={sortField !== SORT_BY_ALPHABET}
          title="Sort alphabetically"
        />
        <Button
          click={() => setSortField(SORT_BY_LENGTH)}
          mainClass="is-success"
          condition={sortField !== SORT_BY_LENGTH}
          title="Sort by length"
        />
        <Button
          click={reverseState}
          mainClass="is-warning"
          condition={!isReversed}
          title="Reverse"
        />

        {(sortField || isReversed) && (
          <Button
            click={resetStates}
            mainClass="is-danger"
            condition
            title="Reset"
          />
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return <Goods key={good} good={good} />;
        })}
      </ul>
    </div>
  );
};
