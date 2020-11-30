// Note: The items in this file are not true representations of what items from
// the API look like. They are formatted for nice presentation and ease of use
import values from 'lodash/values';

import itemTypes from '/screen/Item/PickType/itemTypes';

const itemFields = {
  note: '',
  tags: [],
  files: [],
};

export const items = {
  1: {
    docUniqueName: 1,
    displayName: 'Polyethylene Glycol - 17g',
    description: 'Take one scoop daily as needed',
    icon: 'Medication',
    custom: {
      type: itemTypes.medication,
      status: 'Active',
      instructions: 'Take one scoop daily as needed',
    },
    ...itemFields,
  },
  2: {
    docUniqueName: 2,
    displayName: 'Coughing & Chest Pain',
    description: 'Personal Note',
    icon: 'NoteCreate',
    custom: {
      type: itemTypes.note,
    },
    ...itemFields,
  },
  3: {
    docUniqueName: 3,
    displayName: 'Echo Transthoracic',
    description: 'Essential hypertension',
    icon: 'ResultsLab',
    custom: {
      type: itemTypes.testResults,
      result: 'Essential hypertension',
    },
    ...itemFields,
  },
  4: {
    docUniqueName: 4,
    displayName: 'ECG 12-Lead',
    description: 'Lab Result',
    icon: 'ResultsTest',
    custom: {
      type: itemTypes.testResults,
    },
    ...itemFields,
  },
};

const folder1 = {
  folderUniqueName: 'folder1',
  displayName: 'Favorites',
  tags: [],
  note: '',
  docUniqueName: [1, 3, 4],
};

const folder2 = {
  folderUniqueName: 'folder2',
  displayName: 'Results',
  tags: [],
  note: '',
  docUniqueName: [3, 4],
};

export const folders = [folder1, folder2];
export const itemList = values(items);
