import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList';

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

const SORT_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState('');
  const [isReversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, isReversed });

  const reverseGoods = () => {
    setReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_ALPHABETICALLY })}
          onClick={() => setsortField(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_BY_LENGTH })}
          onClick={() => setsortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        { sortField || isReversed
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setsortField('');
                setReversed(false);
              }}
            >
              Reset
            </button>
          )
          : null}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
