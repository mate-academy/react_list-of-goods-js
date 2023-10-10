export const sortHandlers = {
  ALPHABET: (good1, good2) => good1.localeCompare(good2),
  LENGTH: (good1, good2) => good1.length - good2.length,
};

export const getPreparedGoods = (listOfGoods, sortType, isReversed) => {
  const nextListOfGoods = [...listOfGoods];
  const sortHandler = sortHandlers[sortType];

  if (sortHandler) {
    nextListOfGoods.sort(sortHandler);
  }

  if (isReversed) {
    nextListOfGoods.reverse();
  }

  return nextListOfGoods;
};
