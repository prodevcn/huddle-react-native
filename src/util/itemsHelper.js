import capitalize from 'lodash/capitalize';

import { itemTypes } from '/screen/Item/PickType';
import itemConstants from '/constants/items';
import DetailedIcon from '/component/DetailedIcon';
import thumbnailsHelper from '/util/thumbnailsHelper';

/**
 * Deep merge two items together, merging their custom data as well.
 * Note: `newItem` will **override** `oldItem`
 * @param {object} oldItem
 * @param {object} newItem
 */
const merge = (oldItem = {}, newItem = {}) => {
  const oldCustom = oldItem.custom || {};
  const newCustom = newItem.custom || {};

  return {
    ...oldItem,
    ...newItem,
    custom: {
      ...oldCustom,
      ...newCustom,
    },
  };
};

/**
 * Parse the custom data from json and return the item
 *
 * @param {object} item
 */
const parse = (item) => {
  try {
    return {
      ...item,
      custom: JSON.parse(item.custom),
    };
  } catch (e) {
    return item;
  }
};

// Sort by createTimestamp
const orderCreated = (a, b) => {
  if (a.createTimestamp < b.createTimestamp) return 1;
  if (a.createTimestamp > b.createTimestamp) return -1;
  return 0;
};

/**
 * Given the response of a `POST folder:list` call, turn any folders who have
 * the "isItem" tag into real items that our app can render
 *
 * @param {object} response
 * @param {[object]} response.folder
 * @param {[object]} response.document
 */
const createFromFolders = (response) => {
  // We want to ignore non-item folders
  const itemFolders = response.folder
    .filter((folder) => folder.tags.includes(itemConstants.IS_ITEM))
    .sort(orderCreated);

  // Documents are coming from the API as a list, but we need to access them by id
  const documentHash = {};
  response.document.forEach((doc) => {
    documentHash[doc.docUniqueName] = doc;
  });

  const items = {};
  const itemIds = [];

  // We will loop over each folder, and create an item out of it. After this point
  // the front end will treat these as normal items, nothing to do with other folders
  itemFolders.forEach((folder) => {
    // We store the `folderUniqueName` on the item for things like deletion, or if we
    // update the images on the item. This is the only spot that we save the reference
    // to the folder
    let item = {
      folderUniqueName: folder.folderUniqueName,
      createTimestamp: folder.createTimestamp,
    };

    const files = [];

    let thumbnailUrl;
    let thumbnailDocUniqueName;
    folder.docUniqueName.forEach((docId) => {
      const doc = documentHash[docId];

      // Each folder will have one document with the `isMaster` tag. We will use this
      // as our base item, and then add an array of `files` to it, which will be all
      // the other documents
      if (doc.tags.includes(itemConstants.IS_MASTER)) {
        itemIds.push(doc.docUniqueName);
        item = {
          ...item,
          ...parse(doc),
        };
      } else {
        const data = { ...doc };
        if (data.mimeType.match(/image/i)) {
          const path = thumbnailsHelper.getPath(data.docUniqueName);
          data.thumbnailUrl = path;
          if (!thumbnailUrl) {
            thumbnailUrl = data.thumbnailUrl;
            thumbnailDocUniqueName = data.docUniqueName;
          }
        }

        files.push(data);
      }
    });

    item.files = files;
    item.thumbnailUrl = thumbnailUrl;
    item.thumbnailDocUniqueName = thumbnailDocUniqueName;
    items[item.docUniqueName] = item;
  });

  return { items, itemIds };
};

/**
 * Get the name of the icon cooresponding to the item type. Default to 'Other'
 *
 * @param {object} item
 * @param {object} item.custom
 * @param {string} item.custom.type
 */
const getItemIcon = (item) => {
  let iconName;
  // Add any custom logic here to handle custom types
  switch (item.custom.type) {
    case itemTypes.careDoc:
      iconName = 'AdvancedCare';
      break;
    case itemTypes.care:
      iconName = 'CarePlan';
      break;
    case itemTypes.claims:
      iconName = 'Bill';
      break;
    case itemTypes.eduInfo:
      iconName = 'Education';
      break;
    case itemTypes.note:
      iconName = 'NoteCustom';
      break;
    case itemTypes.testResults:
      iconName = 'ResultsTest';
      break;
    default:
      iconName = capitalize(item.custom.type);
  }

  // If our type doesn't have an icon, use Other
  if (!DetailedIcon[iconName]) {
    iconName = 'Other';
  }

  return iconName;
};

export default {
  createFromFolders,
  parse,
  merge,
  getItemIcon,
  orderCreated,
};
