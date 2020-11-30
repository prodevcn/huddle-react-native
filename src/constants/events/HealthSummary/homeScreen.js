import { itemTypeLabels } from '/screen/Item/PickType';

export const WORKFLOW_NAME = 'Health Summary';
export const SCREEN_NAME = `${WORKFLOW_NAME}, Home Screen`;

export const CLICK_SHARE = `${SCREEN_NAME}: Click share`;

export const CLICK_ADD = (type) => `${SCREEN_NAME}: Click add health insurance item: ${itemTypeLabels[type]}`;
export const CLICK_VIEW = (type) => `${SCREEN_NAME}: Click view health summary category: ${itemTypeLabels[type]}`;
