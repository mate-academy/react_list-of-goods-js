import 'bulma/css/bulma.css';
import './App.scss';
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

const goodsWithId = goodsFromServer.map(good => (
  {
    name: good,
    // eslint-disable-next-line
    id: self.crypto.randomUUID(),
  }
));

let renderedGoods;

const SORT_VALUE_NAME = 'name';
const SORT_VALUE_LENGTH = 'length';
let SORT_VALUE_REVERSE = 'reverse';
let isReversed = false;
let isAlpha = false;
let isLength = false;

function getPreperedGoods(goods = goodsWithId, sortField, reverse) {
  let preperedGoods = [...goods];

  if (sortField !== SORT_VALUE_REVERSE) {
    preperedGoods.sort((good, good2) => {
      if (sortField === 'length') {
        isLength = true;
        isAlpha = false;
        if (!isReversed) {
          return good.name[sortField] - good2.name[sortField];
        // eslint-disable-next-line
        } else {
          return good2.name[sortField] - good.name[sortField];
        }
      }

      if (sortField === 'name') {
        isAlpha = true;
        isLength = false;

        return good[sortField].localeCompare(good2[sortField]);
      }

      return 0;
    });
  }

  if ((sortField === SORT_VALUE_REVERSE || isReversed)
      && sortField !== SORT_VALUE_LENGTH) {
    if (sortField === SORT_VALUE_REVERSE) {
      isReversed = !isReversed;
    }

    SORT_VALUE_REVERSE += ' ';
    preperedGoods.reverse();
  }

  if (sortField === 'reset') {
    isAlpha = false;
    isReversed = false;
    isLength = false;
    preperedGoods = [...goodsWithId];
  }

  renderedGoods = preperedGoods;

  return preperedGoods;
}

export const App = () => {
  const [sortValue, setSortValue] = useState('');
  const [reverseArray, setReverseArray] = useState(false);
  const visibleGoods = getPreperedGoods(
    renderedGoods, sortValue, reverseArray,
  );
  let isEqualToSourceGoods = false;
  // eslint-disable-next-line
  for (let i = 0; i < visibleGoods.length; i++) {
    if (visibleGoods[i].id === goodsWithId[i].id) {
      isEqualToSourceGoods = true;
    } else {
      isEqualToSourceGoods = false;
      break;
    }
  }

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
          reverseArray={reverseArray}
          setReverseArray={setReverseArray}
        />

        {!isEqualToSourceGoods
          && (
            <Button
              text="Reset"
              setSortValue={setSortValue}
              sortField="reset"
              sortValue={sortValue}
            />
          )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <Good good={good} key={good.id} />
        ))}
      </ul>
    </div>
  );
};

const Button = ({
  text, setSortValue, sortField, sortValue, reverseArray, setReverseArray,
}) => {
  let btnClass = 'button';

  switch (text) {
    case 'Sort alphabetically':
      // eslint-disable-next-line
      isAlpha
        ? btnClass += ' is-info'
        : btnClass += ' is-light is-info';
      break;

    case 'Sort by length':
      // eslint-disable-next-line
      isLength
        ? btnClass += ' is-success'
        : btnClass += ' is-light is-success';
      break;

    case 'Reverse':
      // eslint-disable-next-line
      isReversed
        ? btnClass += ' is-warning'
        : btnClass += ' is-light is-warning';
      break;

    case 'Reset':
      // eslint-disable-next-line
      btnClass += ' is-light is-danger';
      break;

    default:
      break;
  }

  return (
    <button
      type="button"
      className={btnClass}
      onClick={() => setSortValue(sortField)}
    >
      {text}
    </button>
  );
};

const Good = ({ good }) => (
  <li data-cy="Good">
    {good.name}
  </li>
);
