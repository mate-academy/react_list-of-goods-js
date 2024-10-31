import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import { GoodList } from './components/GoodList/GoodList';

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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [selectedGoods, setSelectedGoods] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((good1, good2) => {
    switch (selectedGoods) {
      case SORT_FIELD_ALPHABETICALLY:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${SORT_FIELD_ALPHABETICALLY === selectedGoods ? '' : 'is-light'} `}
          onClick={() => setSelectedGoods(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${SORT_FIELD_LENGTH === selectedGoods ? '' : 'is-light'}`}
          onClick={() => setSelectedGoods(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(selectedGoods || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSelectedGoods('');
              setReversed(false);
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
