import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classnames from 'classnames';

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

const SORT_DEFAULT = 0;
const SORT_ALPHABET = 1;
const SORT_LENGTH = 2;

const IS_NOT_REVERSED = 0;
const IS_REVERSED = 1;

function getGoodsRepresentation(selectedSort, isReverse) {
  let goods = [...goodsFromServer];

  switch (selectedSort) {
    case SORT_ALPHABET:
      goods = goods.sort();
      break;

    case SORT_LENGTH:
      goods = goods.sort(
        (good1, good2) => good1.length - good2.length,
      );
      break;

    default:
      break;
  }

  return isReverse ? goods.reverse() : goods;
}

export const App = () => {
  function handleReverseClick() {
    return selectedReverseOption === IS_REVERSED
      ? setSelectedReverseOption(IS_NOT_REVERSED)
      : setSelectedReverseOption(IS_REVERSED);
  }

  function handResetClick() {
    setSelectedSortOption(SORT_DEFAULT);
    setSelectedReverseOption(IS_NOT_REVERSED);
  }

  const [selectedSortOption, setSelectedSortOption] = useState(SORT_DEFAULT);
  const [selectedReverseOption, setSelectedReverseOption]
    = useState(IS_NOT_REVERSED);
  const goodsRepresentation
    = getGoodsRepresentation(selectedSortOption, selectedReverseOption);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames('button', 'is-info',
            selectedSortOption !== SORT_ALPHABET ? 'is-light' : '')}
          onClick={() => setSelectedSortOption(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames('button', 'is-success',
            selectedSortOption !== SORT_LENGTH ? 'is-light' : '')}
          onClick={() => setSelectedSortOption(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames('button', 'is-warning',
            selectedReverseOption !== IS_REVERSED ? 'is-light' : '')}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {
          (selectedReverseOption !== IS_NOT_REVERSED
            || selectedSortOption !== SORT_DEFAULT)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handResetClick}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {goodsRepresentation.map(good => (
          <li>{good}</li>
        ))}
      </ul>
    </div>
  );
};
