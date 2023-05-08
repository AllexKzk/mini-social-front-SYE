import { useEffect, useState } from "react";
import { getPosts } from "../../api/apiWorker";
import { IPostsCollection } from "./IPost";
import Post from "./Post";

interface IPostsCollectionPrev{
    sources: string[]
}

export default function PostsCollection(props: IPostsCollectionPrev) {
    const [collection, setCollection] = useState<IPostsCollection | undefined>(undefined);

    useEffect(() => {
        getPosts(props.sources).then((posts: IPostsCollection) => setCollection(posts));
    }, []);

    return (
        <>
            {
                collection ? 
                collection.posts.map((post) => <Post data={post}/>)
                :
                <> </>
            }
        </>
    );
}