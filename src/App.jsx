import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { Buttons } from './components/Buttons/Buttons';
import { CONST } from './components/const';
import { FUNCTIONS } from './components/functions';

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
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');
  let visibleGoods = FUNCTIONS.getPreparedGoods(goodsFromServer, { sortField });

  if (reverseField === CONST.REVERSE_FIELD) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <Buttons
        checkField={FUNCTIONS.checkField}
        sortField={sortField}
        setSortField={setSortField}
        reverseField={reverseField}
        setReverseField={setReverseField}
      />

      <ul>
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
