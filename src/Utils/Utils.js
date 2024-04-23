import { SORT_FIELD } from '../constants';

export function sortByField(sortField, itemsToSort) {
  if (sortField) {
    itemsToSort.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD.ABC:
          return a.localeCompare(b);

        case SORT_FIELD.LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }
}
