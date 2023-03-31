export const getCloudinaryPublicId = (id: string) =>
  `${
    process.env.NODE_ENV === 'production' ? '' : 'temporary/'
  }noneme-chan-cheki/edited-images/${id}`;
