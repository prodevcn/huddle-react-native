import format from '../format';
import sort from '../sort';

const getDatedFixture = (propertyName) => [
  {
    name: 4,
    [propertyName]: format.toMmmDate(new Date(2012, 1, 3, 4, 5, 6)),
    [`${propertyName}Raw`]: new Date(2012, 1, 3, 4, 5, 6),
  },
  {
    name: 3,
    [propertyName]: format.toMmmDate(new Date(2013, 1, 3, 4, 5, 6)),
    [`${propertyName}Raw`]: new Date(2013, 1, 3, 4, 5, 6),
  },
  {
    name: 2,
    [propertyName]: format.toMmmDate(new Date(2013, 1, 3, 4, 5, 7)),
    [`${propertyName}Raw`]: new Date(2013, 1, 3, 4, 5, 7),
  },
  {
    name: 1,
    [propertyName]: format.toMmmDate(null),
    [`${propertyName}Raw`]: null,
  },
  {
    name: 5,
    [propertyName]: format.toMmmDate(new Date(2001, 1, 3, 4, 5, 6)),
    [`${propertyName}Raw`]: new Date(2001, 1, 3, 4, 5, 6),
  },
];

describe('Sort', () => {
  describe('Manage Sharing', () => {
    test('Deleted only', () => {
      const data = getDatedFixture('deleted');
      const expected = [data[3], data[2], data[1], data[0], data[4]];

      expect(sort.manageSharing(data)).toEqual(expect.arrayContaining(expected));
      expect(sort.manageSharing(data)).toEqual(expected);
    });

    test('Created only', () => {
      const data = getDatedFixture('created');
      const expected = [data[3], data[2], data[1], data[0], data[4]];

      expect(sort.manageSharing(data)).toEqual(expect.arrayContaining(expected));
      expect(sort.manageSharing(data)).toEqual(expected);
    });

    test('Deleted then Created', () => {
      const data = [
        {
          name: 4, // next three all have same most recent deleted date
          deleted: format.toMmmDate(new Date(2012, 1, 3, 4, 5, 6)),
          deletedRaw: new Date(2012, 1, 3, 4, 5, 6),
          created: format.toMmmDate(new Date(2001, 1, 3, 4, 5, 6)),
          createdRaw: new Date(2001, 1, 3, 4, 5, 6),
        },
        {
          name: 2, // of the three same deleted, this has most recent created
          deleted: format.toMmmDate(new Date(2012, 1, 3, 4, 5, 6)),
          deletedRaw: new Date(2012, 1, 3, 4, 5, 6),
          created: format.toMmmDate(new Date(2003, 1, 3, 4, 5, 6)),
          createdRaw: new Date(2003, 1, 3, 4, 5, 6),
        },
        {
          name: 3, // of the three same deleted, this has second recent created
          deleted: format.toMmmDate(new Date(2012, 1, 3, 4, 5, 6)),
          deletedRaw: new Date(2012, 1, 3, 4, 5, 6),
          created: format.toMmmDate(new Date(2002, 1, 3, 4, 5, 6)),
          createdRaw: new Date(2002, 1, 3, 4, 5, 6),
        },
        {
          name: 1, // cuz still active Share Link, all others are disabled / de-active
          deleted: format.toMmmDate(null),
          deletedRaw: null,
          created: format.toMmmDate(new Date(2001, 1, 3, 4, 5, 6)),
          createdRaw: new Date(2001, 1, 3, 4, 5, 6),
        },
        {
          name: 5,
          deleted: format.toMmmDate(new Date(2001, 1, 3, 4, 5, 6)),
          deletedRaw: new Date(2001, 1, 3, 4, 5, 6),
          created: format.toMmmDate(new Date(2001, 1, 3, 4, 5, 6)),
          createdRaw: new Date(2001, 1, 3, 4, 5, 6),
        },
      ];
      const expected = [data[3], data[1], data[2], data[0], data[4]];

      expect(sort.manageSharing(data)).toEqual(expect.arrayContaining(expected));
      expect(sort.manageSharing(data)).toEqual(expected);
    });

    test('Nathan Deleted then Created', () => {
      const data = [
        {
          name: 4,
          deleted: format.toMmmDate(new Date(2019, 10, 12)),
          deletedRaw: new Date(2019, 10, 12),
          created: format.toMmmDate(new Date(2019, 10, 7)),
          createdRaw: new Date(2019, 10, 7),
        },
        {
          name: 1,
          deleted: format.toMmmDate(new Date(2019, 10, 12)),
          deletedRaw: new Date(2019, 10, 12),
          created: format.toMmmDate(new Date(2019, 10, 12)),
          createdRaw: new Date(2019, 10, 12),
        },
        {
          name: 2,
          deleted: format.toMmmDate(new Date(2019, 10, 12)),
          deletedRaw: new Date(2019, 10, 12),
          created: format.toMmmDate(new Date(2019, 10, 12)),
          createdRaw: new Date(2019, 10, 12),
        },
        {
          name: 3,
          deleted: format.toMmmDate(new Date(2019, 10, 12)),
          deletedRaw: new Date(2019, 10, 12),
          created: format.toMmmDate(new Date(2019, 10, 12)),
          createdRaw: new Date(2019, 10, 12),
        },
        {
          name: 5,
          deleted: format.toMmmDate(new Date(2019, 10, 11)),
          deletedRaw: new Date(2019, 10, 11),
          created: format.toMmmDate(new Date(2019, 10, 8)),
          createdRaw: new Date(2019, 10, 8),
        },
      ];
      const expected = [data[1], data[2], data[3], data[0], data[4]];

      expect(sort.manageSharing(data)).toEqual(expect.arrayContaining(expected));
      expect(sort.manageSharing(data)).toEqual(expected);
    });
  });
});
