import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';
import { ComponentList } from './components/ComponentList/ComponentList';

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

const SORT_FIELD_ABC = 'abc';
const SORT_FIELD_LENGTH = 'length';
const RESET_FIELD = '';

export const App = () => {
  let visibleGoods = [...goodsFromServer];
  const [reverse, setReverse] = useState(false);
  const [sortField, setSortField] = useState('');
  const hasResetButton = reverse || sortField;

  const handleSort = field => () => setSortField(field);
  const handleReverse = reversed => () => setReverse(!reversed);
  const handleReset = (reverseReset, sortReset) => () => {
    setReverse(reverseReset);
    setSortField(sortReset);
  };

  if (reverse) {
    if (sortField) {
      visibleGoods.sort((good1, good2) => {
        switch (sortField) {
          case SORT_FIELD_ABC:
            return good2.localeCompare(good1);

          case SORT_FIELD_LENGTH:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
    }

    if (!sortField) {
      visibleGoods.reverse();
    }
  } else {
    if (sortField) {
      visibleGoods.sort((good1, good2) => {
        switch (sortField) {
          case SORT_FIELD_ABC:
            return good1.localeCompare(good2);

          case SORT_FIELD_LENGTH:
            return good2.length - good1.length;

          default:
            return 0;
        }
      });
    }

    if (!sortField) {
      visibleGoods = [...goodsFromServer];
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ABC,
          })}
          onClick={handleSort(SORT_FIELD_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={handleSort(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={handleReverse(reverse)}
        >
          Reverse
        </button>

        {hasResetButton
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleReset(false, RESET_FIELD)}
            >
              Reset
            </button>
          )
        }

      </div>

      <ComponentList goods={visibleGoods} />
    </div>
  );
};
