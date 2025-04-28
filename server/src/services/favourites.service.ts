import { prisma } from '../lib/prisma';
import { Post } from '../models/favourites.dto';

export async function getFavourites(userId: string) {
  return await prisma.savedPost.findMany({ where: { user_id: userId } });
}

export async function addFavourites(post: Post, userId: string) {
  return await prisma.savedPost.create({
    data: {
      title: post.description,
      post_link: post.link,
      image_link: post.image,
      user_id: userId,
    },
  });
}

export async function deleteFavourites(postId: string, userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { credits: { increment: 1 } },
  });
  return await prisma.savedPost.delete({
    where: { id: postId, user_id: userId },
  });
}
