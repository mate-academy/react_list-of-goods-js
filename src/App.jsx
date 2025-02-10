import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';

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

const LENGTH = 'length';
const ALPHABETIC = 'alphabetic';

export const App = () => {
  const [sortBy, setSortBy] = useState(null);
  const [sortByReverse, setSortByReverse] = useState(false);
  const [shownGoods, setShownGoods] = useState([...goodsFromServer]);

  const handleOrganizedGoods = (goods, { sortedByType }) => {
    const organizedGoodsBy = [...goods];

    organizedGoodsBy.sort((good1, good2) => {
      if (sortedByType === LENGTH) {
        return good1.length - good2.length;
      }

      return good1.localeCompare(good2);
    });

    if (sortByReverse) {
      setSortByReverse(false);
    }

    setSortBy(sortedByType);

    setShownGoods(organizedGoodsBy);
  };

  const handleReversedGoods = () => {
    if (sortByReverse) {
      setSortByReverse(false);
    } else {
      setSortByReverse(true);
    }

    return setShownGoods([...shownGoods].reverse());
  };

  const handleResetGoods = () => {
    setSortBy(null);
    setSortByReverse(false);

    return setShownGoods([...goodsFromServer]);
  };

  const listGoods = () =>
    shownGoods.map(shownGood => (
      <li key={shownGood} data-cy="Good">
        {shownGood}
      </li>
    ));

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!sortByReverse && sortBy === ALPHABETIC ? '' : 'is-light'}`}
          onClick={() =>
            handleOrganizedGoods(goodsFromServer, {
              sortedByType: ALPHABETIC,
            })
          }
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${!sortByReverse && sortBy === LENGTH ? '' : 'is-light'}`}
          onClick={() =>
            handleOrganizedGoods(goodsFromServer, {
              sortedByType: LENGTH,
            })
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortByReverse ? '' : 'is-light'}`}
          onClick={handleReversedGoods}
        >
          Reverse
        </button>

        {(sortBy !== null || sortByReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleResetGoods()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>{listGoods()}</ul>
    </div>
  );
};
