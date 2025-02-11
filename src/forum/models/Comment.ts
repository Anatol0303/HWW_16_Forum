    export default class Comment {
    user:string;
        message:string;
        dataCreated:Date;
        likes:number


        constructor(user: string, message: string,
                    //dataCreated: Date,
                    likes: number) {
            this.user = user;
            this.message = message;
            this.dataCreated = new Date();
            this.likes = likes;
        }
    }