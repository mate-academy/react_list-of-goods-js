import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

const FILTER_TYPE_ALPHABET = 'alphabetically';
const FILTER_TYPE_LENGTH = 'length';

const getPreparedGoods = (goods, sortOptions) => {
  const preparedGoods = [...goods];

  if (sortOptions.filterType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortOptions.filterType) {
        case FILTER_TYPE_ALPHABET:
          return good1.localeCompare(good2);
        case FILTER_TYPE_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (sortOptions.isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [filterInstruction, setFilterInstruction] = useState({
    filterType: '',
    isReversed: false,
  });

  const inAnyFilterApplied =
    filterInstruction.filterType || filterInstruction.isReversed;

  const visibleGoods = getPreparedGoods(goodsFromServer, filterInstruction);

  const handleSetFilterType = filterTypeName => {
    setFilterInstruction(prevState => {
      return {
        ...prevState,
        filterType: filterTypeName,
      };
    });
  };

  const handleReverse = () => {
    setFilterInstruction(prevState => {
      return {
        ...prevState,
        isReversed: !prevState.isReversed,
      };
    });
  };

  const handleClearFilter = () => {
    setFilterInstruction(prevState => {
      return {
        ...prevState,
        filterType: '',
        isReversed: false,
      };
    });
  };

  const isLightOn = filterType => {
    return filterInstruction.filterType !== filterType;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSetFilterType(FILTER_TYPE_ALPHABET)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': isLightOn(FILTER_TYPE_ALPHABET),
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSetFilterType(FILTER_TYPE_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': isLightOn(FILTER_TYPE_LENGTH),
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !filterInstruction.isReversed,
          })}
        >
          Reverse
        </button>

        {inAnyFilterApplied && (
          <button
            onClick={() => handleClearFilter()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
