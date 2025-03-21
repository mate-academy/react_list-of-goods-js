import cn from 'classnames';
import { useEffect, useState } from 'react';

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

export const SortButtons = ({ visibleGoods, setVisibleGoods, goods }) => {
  const sortButtons = [
    'Sort alphabetically',
    'Sort by length',
    'Reverse',
    'Reset',
  ];

  const INFO = 'is-info';
  const SUCCESS = 'is-success';
  const WARNING = 'is-warning';
  const DANGER = 'is-danger';

  const [activeButton, setActiveButton] = useState('');
  const [noVisibleReset, setVisibleReset] = useState('none');

  function handleVisibility(button) {
    if (button === 'Reset') {
      return noVisibleReset;
    }

    return 0;
  }

  useEffect(() => {
    if (activeButton === 'Sort alphabetically') {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
      );
      setVisibleReset('flex');
    }

    if (activeButton === 'Sort by length') {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
      );
      setVisibleReset('flex');
    }

    if (activeButton === 'Reverse') {
      setVisibleGoods([...visibleGoods].reverse());
      setVisibleReset('flex');
    }

    if (activeButton === 'Reset') {
      setVisibleGoods(goods);
      setVisibleReset('none');
    }
  }, [activeButton]);

  useEffect(() => {
    if (visibleGoods === goodsFromServer) {
      setVisibleReset('none');
    }
  }, [visibleGoods]);

  return (
    <div className="buttons">
      {sortButtons.map(button => (
        <button
          key={button}
          type="button"
          className={cn(
            'button',
            [
              button === 'Sort alphabetically' && INFO,
              button === 'Sort by length' && SUCCESS,
              button === 'Reverse' && WARNING,
              button === 'Reset' && DANGER,
            ],
            {
              'is-light': activeButton !== button,
            },
          )}
          style={{ display: handleVisibility(button) }}
          onClick={() => setActiveButton(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};
