import { CONST } from './const';

const getPreparedGoodsFunction = (goods, { sortField }) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case CONST.SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case CONST.SORT_FIELD_RESET:
          return 0;

        case CONST.SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
};

const checkFieldFunction = (newField, oldField, setFunction) => {
  const newSortField = oldField !== newField ? newField : '';

  setFunction(newSortField);
};

export const FUNCTIONS = {
  getPreparedGoods: getPreparedGoodsFunction,
  checkField: checkFieldFunction,
};
