/* eslint-disable prettier/prettier */
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { Goods } from './components/Goods/goods';

const SORT_FIELD_ALPH = 'Alphabetically';
const SORT_FIELD_LENGTH = 'Length';

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

export const App = () => {
  let visibleGoods = [...goodsFromServer];

  const [sortAlphbetically, setSortAlphabetically] = useState('');
  const [sortLength, setSortLength] = useState('');
  const [reversed, setReversed] = useState(false);

  if (sortAlphbetically) {
    // eslint-disable-next-line max-len
    visibleGoods = visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortLength) {
    visibleGoods = visibleGoods.sort(
      (good1, good2) => good2.length - good1.length,
    );
  }

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  const sortByName = () => {
    setSortAlphabetically(SORT_FIELD_ALPH);
    setSortLength('');
  };

  const sortByLength = () => {
    setSortLength(SORT_FIELD_LENGTH);
    setSortAlphabetically('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(['button', 'is-info'], {
            'is-light': !sortAlphbetically,
          })}
          onClick={() => sortByName()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(['button', 'is-success'], {
            'is-light': !sortLength,
          })}
          onClick={() => sortByLength()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(['button', 'is-warning'], {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn(['is-danger', 'button', 'is-light'], {
            'is-hidden': !(reversed || sortLength || sortAlphbetically),
          })}
          onClick={() => {
            setSortLength('');
            setSortAlphabetically('');
            setReversed(false);
          }}
        >
          Reset
        </button>
      </div>

      <Goods goods={visibleGoods} />
    </div>
  );
};
