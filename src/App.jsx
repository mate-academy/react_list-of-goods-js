import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
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

const GoodList = ({ goods }) => (
  goods.map(good => (
    <ul>
      <li data-cy="Good">{good}</li>
    </ul>
  ))
);

function getPreperedGoods(goods, { sortField, reverseField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [reverseField, setReverseField] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreperedGoods(
    goodsFromServer,
    { sortField, reverseField },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABETICALLY })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverseField })}
        >
          Reverse
        </button>

        {(sortField !== '' || reverseField) && (
        <button
          onClick={() => {
            setSortField('');
            setReverseField(false);
          }}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
