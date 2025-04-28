export type Post = {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
};

export type FavouritePost = {
  id: string;
  title: string;
  image_link: string;
  post_link: string;
};
