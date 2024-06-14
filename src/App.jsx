import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { useState } from 'react';
import { GoodList } from './components/GoodList';
import { goods } from './api/goodsFromServer';

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [sortProperty, setSortProperty] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goods];

  if (sortProperty) {
    visibleGoods = visibleGoods.sort((good1, good2) => {
      switch (sortProperty) {
        case SORT_BY_ALPHABET:
          return good1.name.localeCompare(good2.name);
        case SORT_BY_LENGTH:
          return good1.name.length - good2.name.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const reset = () => {
    setSortProperty('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortProperty !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortProperty(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortProperty !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortProperty(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {(sortProperty || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
