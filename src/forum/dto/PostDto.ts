import CommentDto from "./CommentDto";

export default class PostDto {
        id:string;
        title: string;
        content: string;
        author: string;
        dataCreated: Date;
        tags: Set<string>;
        likes: number;
        comments: CommentDto[] //TODO advanced


        constructor(id: string, title: string, content: string, author: string, dataCreated: Date, tags: Set<string>, likes: number,
        comments: CommentDto[]) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.author = author;
            this.dataCreated = dataCreated;
            this.tags = tags;
            this.likes = likes;
            this.comments = comments;
        }
    }