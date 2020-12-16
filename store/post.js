const posts = [
  {
    title: 'Post 1',
    date: new Date(),
    views: 22,
    comments: [1, 2],
    _id: '1',
  },
  {
    title: 'Post 2',
    date: new Date(),
    views: 22,
    comments: [1, 2],
    _id: '2',
  },
];
export const actions = {
  // eslint-disable-next-line no-empty-pattern
  async fetchAdminPosts({}) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(posts);
      }, 1000);
    });
  },
  // eslint-disable-next-line no-empty-pattern
  async remove({}, id) {
    await console.log('remove', id);
  },
  // eslint-disable-next-line no-empty-pattern
  async update({}, { id, text }) {
    await console.log('update', id, text);
  },
  // eslint-disable-next-line no-empty-pattern
  async fetchAdminById({}, id) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(posts.find((p) => p._id === id));
      }, 1000);
    });
  },
};
