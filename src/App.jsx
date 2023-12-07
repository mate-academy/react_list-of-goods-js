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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';

function getPrerapeGoods(goods, sortField, reverseField) {
  let prepareGood = [...goods];

  prepareGood = prepareGood.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1[sortField] - good2[sortField];
      default: return 0;
    }
  });

  if (reverseField) {
    prepareGood = prepareGood.reverse();
  }

  return prepareGood;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPrerapeGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  const reset = () => {
    setReverseField(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !reverseField },
          )}
          onClick={() => setReverseField(reverseField === false)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}

      </ul>
    </div>
  );
};
