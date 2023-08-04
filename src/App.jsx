import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/goodList';

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

const SORT_FIELD_ALPHABETICALLY = 'name';
const SORT_FIELD_LENGTH = 'length';
const modifiedGoods = goodsFromServer.map((good, index) => ({
  name: good,
  id: index + 1,
}));

function getPreparedGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.name.localeCompare(good2.name);

        case SORT_FIELD_LENGTH:
          if (isReversed) {
            return good1.name.length - good2.name.length;
          }

          return good2.name.length - good1.name.length;

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
  const visibleGoods = getPreparedGoods(modifiedGoods, sortField, isReversed);
  const isResetButtonVisible = sortField || isReversed;
  const onReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info',
              { 'is-light': sortField !== SORT_FIELD_ALPHABETICALLY })
          }
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-success',
              { 'is-light': sortField !== SORT_FIELD_LENGTH })
          }
          onClick={() => setSortField(SORT_FIELD_LENGTH)}

        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-warning', { 'is-light': !isReversed })
          }
          onClick={() => setIsReversed(!isReversed)}

        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodList
          goods={visibleGoods}
        />
      </ul>
    </div>
  );
};
