import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

import { Button } from './components/Button';
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

const SORT = {
  undefined: list => [...list],
  ALPHABETICALLY: list => list.toSorted((el1, el2) => el1.localeCompare(el2)),
  BY_LENGTH: list => list.toSorted((el1, el2) => el1.length - el2.length),
};

const SORTING_TYPE = {
  undefined,
  ALPHABETICALLY: 'ALPHABETICALLY',
  BY_LENGTH: 'BY_LENGTH',
};

export const App = () => {
  const [sorting, setSorting] = useState({
    type: SORTING_TYPE.undefined,
    isReversed: false,
  });

  const sortedGoods = (() => {
    const arr = SORT[sorting.type](goodsFromServer);

    if (sorting.isReversed) {
      arr.reverse();
    }

    return arr;
  })();

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          text="Sort alphabetically"
          highlightClass="is-info"
          highlightCondition={sorting.type === SORTING_TYPE.ALPHABETICALLY}
          handleClick={() =>
            setSorting(currrentSorting => ({
              ...currrentSorting,
              type: SORTING_TYPE.ALPHABETICALLY,
            }))
          }
        />

        <Button
          text="Sort by length"
          highlightClass="is-success"
          highlightCondition={sorting.type === SORTING_TYPE.BY_LENGTH}
          handleClick={() =>
            setSorting(currrentSorting => ({
              ...currrentSorting,
              type: SORTING_TYPE.BY_LENGTH,
            }))
          }
        />

        <Button
          text="Reverse"
          highlightClass="is-warning"
          highlightCondition={sorting.isReversed}
          handleClick={() =>
            setSorting(currrentSorting => ({
              ...currrentSorting,
              isReversed: !currrentSorting.isReversed,
            }))
          }
        />

        {(sorting.type || sorting.isReversed) && (
          <Button
            text="Reset"
            highlightClass="is-danger"
            highlightCondition={false}
            handleClick={() =>
              setSorting({
                type: SORTING_TYPE.undefined,
                isReversed: false,
              })
            }
          />
        )}
      </div>

      <GoodList list={sortedGoods} />
    </div>
  );
};
