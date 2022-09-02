import { createClient } from 'contentful';

const client = createClient({
  space: 'aqn8a03zlkfb',
  accessToken: 'H6BtetboBnmIMoBeLcpRBOJrM6ByNh9bjy8duaVUtWE',
});

export async function getAllRooms() {
  return client
    .getEntries({
      content_type: 'room',
      includes: 2,
    })
    .then((entries) => {
      return entries;
    });
}

export async function getEntry(ID) {
  return client
    .getEntries({
      'sys.id': ID,
      include: 2,
    })
    .then((entries) => {
      return entries.items[0];
    });
}
