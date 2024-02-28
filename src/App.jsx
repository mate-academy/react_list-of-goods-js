import 'bulma/css/bulma.css';

import './App.scss';
import { useState } from 'react';
import { Buttons } from './components/Buttons/Buttons';

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
const SORT_FIELD_RESET = 'reset';
const SORT_FIELD_NAME = 'name';
const REVERSE_FIELD = 'reverse';

function getPreparedGoods(goods, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_RESET:
          return 0;

        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

function checkField(newField, oldField, setFunction) {
  const newSortField = oldField !== newField ? newField : '';

  setFunction(newSortField);
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');
  let visibleGoods = getPreparedGoods(goodsFromServer, { sortField });

  if (reverseField === REVERSE_FIELD) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <Buttons
        checkField={checkField}
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
