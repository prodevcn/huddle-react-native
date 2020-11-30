import { format } from '/util';

const today = '2019-05-29T15:27:07.743+08:00';
const yesterday = '2019-06-29T15:27:07.743+08:00';
const oneAccessedDate = {
  accessed: [{
    date: format.toMmmDate(yesterday),
    dateRaw: yesterday,
    time: format.toTime(yesterday),
  }],
  deleted: null,
  secure: true,
  shareUniqueName: '81123826-a677-4235-b3d4-436357312650',
};

export const deletedDate = {
  accessed: [{
    date: format.toMmmDate(yesterday),
    dateRaw: yesterday,
    time: format.toTime(yesterday),
  }],
  created: format.toMmmDate(yesterday),
  deleted: format.toMmmDate(today),
  secure: true,
  shareUniqueName: '81123826-a677-4235-b3d4-436357312650',
};

export default oneAccessedDate;
