export interface IPost {
    id: string,
    authorId: string,
    authorName: string,
    authorSurname: string,
    imagePath: string,
    caption: string,
    likes: string,
    liked: boolean
}

export interface IPostsCollection {
    posts: IPost[],
    lastPostId: string
}