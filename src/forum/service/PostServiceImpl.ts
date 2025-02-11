import PostService from "./PostService";
import PostDto from "../dto/PostDto";
import {Post as P} from "../models/Post";
import CommentDto from "../dto/CommentDto";
import NewPostDto from "../dto/NewPostDto";
import Comment from "../models/Comment";
export default class PostServiceImpl implements PostService {
    async createPost(author: string, title: string, content: string, tags: Set<string>): Promise<PostDto> {
        const newPost = new P({
            title: title,
            content: content,
            tags: tags,
            author: author
        });
        const res = (await newPost.save());
        return new PostDto(res.id, res.title,
            res.content, res.author,
            res.dataCreated, res.tags,
            res.likes, res.comments.map(c => c as unknown as CommentDto));
    }

    async findPostById(id: string): Promise<PostDto> {
        const post = await P.findById(id);
        if (post === null) {
            throw new Error("post is null");
        }
        return new PostDto(post.id, post.title,
            post.content, post.author,
            post.dataCreated, post.tags,
            post.likes, post.comments.map(c => c as unknown as CommentDto));
    }

    async updatePostById(id: string, title: string, content: string, tags: Set<string>): Promise<PostDto> {
        const post = await P.findById(id);
        if (post === null) {
            throw new Error("post is null");
        }
        post.title = title;
        post.content = content;
        post.tags = tags;
        await post.save();
        return new PostDto(post.id, post.title,
            post.content, post.author,
            post.dataCreated, post.tags,
            post.likes, post.comments.map(c => c as unknown as CommentDto));
    }

    async removePostById(id: string): Promise<PostDto> {
        const post = await P.findById(id);
        if (post === null) {
            throw new Error("post is null");
        }

        const deletedPost = new PostDto(post.id, post.title,
            post.content, post.author,
            post.dataCreated, post.tags,
            post.likes, post.comments.map(c => c as unknown as CommentDto));
        await post.deleteOne();
        return deletedPost;
    }

    async addLike(id: string): Promise<PostDto> {
        const post = await P.findById(id);
        if (post === null) {
            throw new Error("post is null");
        }
        post.likes += 1;
        await post.save();
        const updatedPost = new PostDto(post.id, post.title,
            post.content, post.author,
            post.dataCreated, post.tags,
            post.likes, post.comments.map(c => c as unknown as CommentDto));

        return updatedPost;
    }

    async addComment(id: string, user: string, message: string): Promise<PostDto> {
        const post = await P.findById(id);
        if (post === null) {
            throw new Error("post is null");
        }

        const newComment = new Comment(
            user,
            message,
            0
        );

        post.comments.push(newComment);
        await post.save();
        return new PostDto(post.id, post.title,
            post.content, post.author,
            post.dataCreated, post.tags,
            post.likes, post.comments.map(c => c as unknown as CommentDto));

    }

    async findPostsByAuthor(author: string): Promise<PostDto[]> {
        const postsByAuthor = await P.find({author:author});
        if (!postsByAuthor.length) {
            throw new Error("No posts by this author");
        }
        const postsByAuthorDto =  postsByAuthor.map(post => new PostDto(post.id, post.title,
            post.content, post.author, post.dataCreated, post.tags, post.likes,
            post.comments.map(c => c as unknown as CommentDto)));
        return postsByAuthorDto;

    }

    async findPostsByTags(tags: string[]): Promise<PostDto[]> {
        const postsByTags = await P.find({tags: {$all : tags}});
        if (!postsByTags.length) {
            throw new Error("No posts with all these tags ");
        }
        const postsByTagsDto =  postsByTags.map(post => new PostDto(post.id, post.title,
            post.content, post.author, post.dataCreated, post.tags, post.likes,
            post.comments.map(c => c as unknown as CommentDto)));
        return postsByTagsDto;


    }

    async findPostsByPeriod(dateFrom: Date, dateTo: Date): Promise<PostDto[]> {
        const postsByPeriod = await P.find({dataCreated: {$gte : dateFrom, $lte: dateTo }});
        if (!postsByPeriod.length) {
            throw new Error("No posts with all these tags ");
        }
        const postsByPeriodDto =  postsByPeriod.map(post => new PostDto(post.id, post.title,
            post.content, post.author, post.dataCreated, post.tags, post.likes,
            post.comments.map(c => c as unknown as CommentDto)));
        return postsByPeriodDto;

    }
}