import 'bulma/css/bulma.css';
import classNames from 'classnames';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './Components/GoodList/GoodList';

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

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

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_NAME:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const prevIsReversed = !isReversed;
  const visibleGoods
  = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          id="name"
          className={classNames('button is-info',
            { 'is-light': !(sortField === SORT_FIELD_NAME) })}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          id="length"
          className={classNames('button is-success',
            { 'is-light': !(sortField === SORT_FIELD_LENGTH) })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          id="reverse"
          className={classNames('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prevIsReversed)}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed)
        && (
        <button
          type="button"
          id="reset"
          className="button is-danger is-light"
          onClick={() => {
            setSortField(''); setIsReversed(false);
          }}
        >
          Reset
        </button>
        )}

      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
