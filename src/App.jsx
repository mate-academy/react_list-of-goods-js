import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './components/GoodList';

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

const SetById = 'id';
const SetByAlphabet = 'alphabet';
const SetByLength = 'length';
const SetByReverse = true;
const SetByDanger = 'danger';

function getSortedGoods(goods, { sortField, reversed }) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SetById:
      case SetByAlphabet:
        return good1.localeCompare(good2);
      case SetByLength:
        return good1.length - good2.length;
      default: return 0;
    }
  });

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState(SetByDanger);
  const [reversed, setReversed] = useState(false);

  const sortedGoods
    = getSortedGoods(goodsFromServer,
      { sortField, reversed });

  const onReset = () => {
    setReversed(false);
    setsortField(SetByDanger);
  };

  const onReverse = () => {
    setReversed(!reversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortField(SetByAlphabet)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SetByAlphabet })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setsortField(SetByLength)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SetByLength })}
        >
          Sort by length
        </button>

        <button
          onClick={onReverse}
          type="button"
          className={cn('button is-warning',
            { 'is-light': reversed !== SetByReverse })}
        >
          Reverse
        </button>

        {(reversed || sortField !== SetByDanger) && (
          <button
            onClick={onReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={sortedGoods} />
    </div>
  );
};
