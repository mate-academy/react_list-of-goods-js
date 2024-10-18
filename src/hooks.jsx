import { useState } from 'react';

export const useVisibleGoods = initialGoods => {
  const [visibleGoods, setVisibleGoods] = useState(initialGoods);
  const [sortButton, setSortButton] = useState({
    alphabetically: false,
    length: false,
    reverse: false,
    reset: false,
  });

  const sortAlphabetically = () => {
    const sortedGoods = [...visibleGoods].sort();

    if (sortButton.reverse) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
    setSortButton(prevState => ({
      ...prevState,
      alphabetically: true,
      length: false,
      reset: true,
    }));
  };

  const sortByLength = () => {
    const sortedGoods = [...visibleGoods].sort((goods1, goods2) => {
      if (goods1.length !== goods2.length) {
        return goods1.length - goods2.length;
      }

      return goods1.localeCompare(goods2);
    });

    if (sortButton.reverse) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
    setSortButton(prevState => ({
      ...prevState,
      alphabetically: false,
      length: true,
      reset: true,
    }));
  };

  const reverseSort = () => {
    if (sortButton.reverse) {
      let sortedGoods = [...initialGoods];

      if (sortButton.alphabetically) {
        sortedGoods = sortedGoods.sort();
      }

      if (sortButton.length) {
        sortedGoods = sortedGoods.sort(
          (goods1, goods2) => goods1.length - goods2.length,
        );
      }

      setVisibleGoods(sortedGoods);
      setSortButton(prevState => ({
        ...prevState,
        reverse: false,
        reset: prevState.alphabetically || prevState.length,
      }));
    } else {
      setVisibleGoods([...visibleGoods].reverse());
      setSortButton(prevState => ({
        ...prevState,
        reverse: true,
        reset: true,
      }));
    }
  };

  const resetSort = () => {
    setVisibleGoods([...initialGoods]);
    setSortButton({
      alphabetically: false,
      reverse: false,
      length: false,
      reset: false,
    });
  };

  return {
    visibleGoods,
    sortButton,
    sortAlphabetically,
    sortByLength,
    reverseSort,
    resetSort,
  };
};
