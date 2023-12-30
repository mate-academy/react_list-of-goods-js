import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

const classNames = require('classnames');

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

const goodsWithId = goodsFromServer.map(good => (
  {
    name: good,
    // eslint-disable-next-line
    id: self.crypto.randomUUID(),
  }
));

const SORT_VALUE_NAME = 'name';
const SORT_VALUE_LENGTH = 'length';
const SORT_VALUE_REVERSE = 'reverse';
const SORT_VALUE_REREVERSE = 'reReverse';
const SORT_VALUE_RESET = 'reset';

const activeFields = {
  name: false,
  length: false,
  reverse: false,
  reset: false,
  initial: true,
};

let canChangeState = false;
let previousActivField = '';

function getPreperedGoods(goods, sortField, reverse) {
  previousActivField = sortField;

  // eslint-disable-next-line
  switch (true) {
    case sortField === SORT_VALUE_REREVERSE:
      activeFields.reverse = !activeFields.reverse;
      break;

    case sortField === SORT_VALUE_NAME && !activeFields.name:
      activeFields.length = false;
      canChangeState = true;
      break;

    case sortField === SORT_VALUE_LENGTH && !activeFields.length:
      activeFields.name = false;
      canChangeState = true;
      break;

    case sortField === SORT_VALUE_REVERSE:
      canChangeState = true;
      break;

    case sortField === SORT_VALUE_RESET:
      activeFields.reset = true;
  }

  if (canChangeState) {
    canChangeState = false;
    activeFields[sortField] = !activeFields[sortField];
  }

  // eslint-disable-next-line
  for (const key in activeFields) {
    if (activeFields[key] === true) {
      activeFields.initial = true;
      break;
    } else {
      activeFields.initial = false;
    }
  }

  let preperedGoods = [...goods];

  if (activeFields[SORT_VALUE_NAME]) {
    preperedGoods.sort((good, good2) => (
      good[SORT_VALUE_NAME].localeCompare(good2[SORT_VALUE_NAME])
    ));
  }

  if (activeFields[SORT_VALUE_LENGTH]) {
    preperedGoods.sort((good, good2) => (
      good.name[SORT_VALUE_LENGTH] - good2.name[SORT_VALUE_LENGTH]
    ));
  }

  if (activeFields[SORT_VALUE_REVERSE]) {
    preperedGoods.reverse();
  }

  if (activeFields[SORT_VALUE_RESET]) {
    activeFields.name = false;
    activeFields.length = false;
    activeFields.reverse = false;
    activeFields.reset = false;
    activeFields.initial = false;
    preperedGoods = [...goodsWithId];
  }

  return preperedGoods;
}

export const App = () => {
  const [sortValue, setSortValue] = useState('initial');
  const visibleGoods = getPreperedGoods(goodsWithId, sortValue);

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          text="Sort alphabetically"
          setSortValue={setSortValue}
          sortField={SORT_VALUE_NAME}
          sortValue={sortValue}
        />

        <Button
          text="Sort by length"
          setSortValue={setSortValue}
          sortField={SORT_VALUE_LENGTH}
          sortValue={sortValue}
        />

        <Button
          text="Reverse"
          setSortValue={setSortValue}
          sortField={SORT_VALUE_REVERSE}
          sortValue={sortValue}
        />

        {activeFields.initial
          && (
            <Button
              text="Reset"
              setSortValue={setSortValue}
              sortField={SORT_VALUE_RESET}
              sortValue={sortValue}
            />
          )
        }
      </div>

      <GoodsList visibleGoods={visibleGoods} />
    </div>
  );
};

const Button = ({
  text,
  setSortValue,
  sortField,
  sortValue,
}) => {
  const buttonClass = classNames({
    button: true,
    'is-light': !activeFields[sortField],
    'is-info': sortField === SORT_VALUE_NAME,
    'is-success': sortField === SORT_VALUE_LENGTH,
    'is-warning': sortField === SORT_VALUE_REVERSE,
    'is-danger': sortField === SORT_VALUE_RESET,
  });

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={() => {
        if (sortField === SORT_VALUE_REVERSE
          && previousActivField === SORT_VALUE_REVERSE) {
          setSortValue('reReverse');
        } else {
          setSortValue(sortField);
        }
      }}
    >
      {text}
    </button>
  );
};

const GoodsList = ({ visibleGoods }) => (
  <ul>
    {visibleGoods.map(good => (
      <Good good={good} key={good.id} />
    ))}
  </ul>
);

const Good = ({ good }) => (
  <li data-cy="Good">
    {good.name}
  </li>
);
