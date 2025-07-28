import { useContext, useState } from 'react';
import { GoodsContext } from '../../App';
import { goodsFromServer } from '../../model/GoodsFromServer.model';

export const Button = ({ button }) => {
  const {
    goods,
    setGoods,
    historyOrder,
    setHistoryOrder,
    counterReset,
    setCounterReset,
    isLightAlpha,
    isLightReverse,
    isLightLength,
    setIsLightAlpha,
    setIsLightLength,
    setIsLightReverse,
  } = useContext(GoodsContext);

  const handleOrderByAlpha = () => {
    setIsLightAlpha(false);
    setIsLightLength(true);
    setIsLightReverse(true);

    setGoods(
      [...goods].sort((good1, good2) => {
        return good1.localeCompare(good2);
      }),
    );

    setHistoryOrder([...historyOrder, 'alpha']);
  };

  const handleOrderByLength = () => {
    setIsLightLength(false);
    setIsLightAlpha(true);
    setIsLightReverse(true);

    setGoods(
      [...goods].sort((good1, good2) => {
        return good1.length - good2.length;
      }),
    );

    setHistoryOrder([...historyOrder, 'length']);
  };

  const handleOrderReset = () => {
    setIsLightAlpha(true);
    setIsLightLength(true);
    setIsLightReverse(true);

    setGoods(goodsFromServer);
  };

  const handleOrderByReverse = () => {
    if (counterReset > 1) {
      setCounterReset(0);
    }

    switch (historyOrder[historyOrder.length - 2]) {
      case 'alpha':
        setCounterReset(counterReset + 1);
        handleOrderByAlpha();
        setIsLightReverse(false);
        break;
      case 'length':
        setCounterReset(counterReset + 1);
        handleOrderByLength();
        setIsLightReverse(false);
        break;
    }
  };

  return (
    <>
      {(() => {
        switch (button.textContent) {
          case 'Sort alphabetically':
            return (
              <button
                type="button"
                onClick={() => handleOrderByAlpha()}
                className={`${button.className} ${isLightAlpha ? 'is-light' : ''}`}
              >
                {button.textContent}
              </button>
            );
          case 'Sort by length':
            return (
              <button
                type="button"
                onClick={() => handleOrderByLength()}
                className={`${button.className} ${isLightLength ? 'is-light' : ''}`}
              >
                {button.textContent}
              </button>
            );
          case 'Reverse':
            return (
              <button
                type="button"
                onClick={() => handleOrderByReverse()}
                className={`${button.className} ${isLightReverse ? 'is-light' : ''}`}
              >
                {button.textContent}
              </button>
            );
          case 'Reset':
            {
              
              if(!isLightAlpha || !isLightLength || !isLightReverse) {
                return (
                  <button
                    type="button"
                    onClick={() => handleOrderReset()}
                    className={`${button.className}`}
                  >
                    {button.textContent}
                  </button>
                );
              }
              
            }
        }
      })()}
    </>
  );
};
