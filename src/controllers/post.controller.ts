import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";
import AppError from "../utils/AppError";

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      error: false,
      statusCode: 200,
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { title, content } = req.body;
    const authorId = req.user!.userId;

    const post = await prisma.post.create({
      data: { title, content, authorId },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.status(201).json({
      error: false,
      statusCode: 201,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const userId = req.user!.userId;

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return next(new AppError("Post not found", 404));
    }

    if (post.authorId !== userId) {
      return next(
        new AppError("You are not authorized to update this post", 403),
      );
    }

    const updated = await prisma.post.update({
      where: { id },
      data: req.body,
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.status(200).json({
      error: false,
      statusCode: 200,
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id as string;    
    const userId = req.user!.userId;

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return next(new AppError("Post not found", 404));
    }

    if (post.authorId !== userId) {
      return next(
        new AppError("You are not authorized to delete this post", 403),
      );
    }

    await prisma.post.delete({ where: { id } });

    res.status(200).json({
      error: false,
      statusCode: 200,
      message: "Post deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
