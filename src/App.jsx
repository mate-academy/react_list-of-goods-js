import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './components/GoodList/GoodList';
import { Reset } from './components/Reset/Reset';

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

function getSortedGoods(goods, sortField) {
  const sortedGoods = [...goods];

  switch (sortField) {
    case 'alphabetically':
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case 'byLength':
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  return sortedGoods;
}

const SORT_FIELDS = {
  alphabetically: 'alphabetically',
  byLength: 'byLength',
  reverse: 'reverse',
};

export const App = () => {
  const [sortedField, setSortedField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getSortedGoods(goodsFromServer, sortedField);

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortedField(SORT_FIELDS.alphabetically)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortedField !== SORT_FIELDS.alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortedField(SORT_FIELDS.byLength)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortedField !== SORT_FIELDS.byLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReversed(!reversed);
          }}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        <Reset
          sortedField={sortedField}
          reversed={reversed}
          setReversed={setReversed}
          setSortedField={setSortedField}
        />
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
