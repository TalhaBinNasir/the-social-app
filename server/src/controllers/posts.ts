import Post from "../models/Post.ts";
import User from "../models/User.ts";

export const createPost = async (req: any, res: any) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
};

export const getFeedPosts = async (req: any, res: any) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const likePost = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
