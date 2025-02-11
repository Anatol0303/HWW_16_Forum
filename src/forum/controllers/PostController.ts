import {Body, Controller, Delete, Get, Param, Post, Put, Res} from "routing-controllers"
import NewPostDto from "../dto/NewPostDto";
import {Post as P} from "../models/Post";
import PostService from "../service/PostService";
import PostServiceImpl from "../service/PostServiceImpl";
import {Response} from 'express';
import PostDto from "../dto/PostDto";

@Controller('/forum')
export default class PostController {

    postService: PostService = new PostServiceImpl();

    @Post("/post/:author")
    async createPost(@Param('author') author: string, @Body() newPostDto: NewPostDto) {
        //TODO solve double
        return await this.postService.createPost(author,newPostDto.title , newPostDto.content , newPostDto.tags);


    }
    @Get("/post/:id")
    async findPostById(@Param('id') id: string, @Res() res:Response) {
        return await this.postService.findPostById(id).catch(err => res.status(404).send(err));

    }
    @Put("/post/:id")
    async updatePostById(@Param('id') id: string, @Body() newPostDto: NewPostDto, @Res() res:Response) {
        return await this.postService.updatePostById(id,newPostDto.title, newPostDto.content, newPostDto.tags).catch(err => res.status(404).send(err));

    }

    @Delete("/post/:id")
    async removePostById(@Param('id') id: string, @Res() res:Response) {
        return await this.postService.removePostById(id).catch(err => res.status(404).send(err));

    }

    @Put("/post/:id/like")
    async addLike(@Param('id') id: string, @Res() res:Response) {
        return await this.postService.addLike(id).catch(err => res.status(404).send(err));
    }

    @Put("/post/:id/comment/:user")
    async addComment(@Param('id') id: string, @Param ('user') user:string,@Body() {message}: {message:string} ,@Res() res:Response) {
        return await this.postService.addComment(id, user, message).catch(err => res.status(404).send(err));
    }


    @Get("/posts/author/:user")
    async findPostsByAuthor(@Param('user') author: string ,@Res() res:Response) {
        return await this.postService.findPostsByAuthor(author).catch(err => res.status(404).send(err));
    }
    @Get("/posts/tags")
    async findPostsByTags(@Body() tags: string[] ,@Res() res:Response) {
        return await this.postService.findPostsByTags(tags).catch(err => res.status(404).send(err));
    }

    @Get("/posts/period")
    async findPostsByPeriod(@Body() {dateFrom,dateTo}:  {dateFrom: Date; dateTo: Date}, @Res() res:Response) {
        return await this.postService.findPostsByPeriod(dateFrom,dateTo).catch(err => res.status(404).send(err));
    }
}