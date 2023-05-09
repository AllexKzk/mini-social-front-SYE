import { useEffect, useState } from "react";
import { getPosts } from "../../api/apiWorker";
import { IPostsCollection } from "./IPost";
import Post from "./Post";
import { IFriend } from "../../api/interfaces";
import { Typography } from "@mui/material";

interface IPostsCollectionPrev{
    sources?: string[],
    friends?: IFriend[]
}

export default function PostsCollection(props: IPostsCollectionPrev) {
    const [collection, setCollection] = useState<IPostsCollection | undefined>(undefined);

    useEffect(() => {
        if (props.sources)
            getPosts(props.sources).then((posts: IPostsCollection) => setCollection(posts));
        else if (props.friends){
            const idArray = props.friends.map((friend: IFriend) => friend.id);
            console.log(idArray);
            getPosts(idArray).then((posts: IPostsCollection) => setCollection(posts));
        }
    }, []);

    return (
        <>
            {
                collection ? 
                collection.posts.map((post) => <Post data={post}/>)
                :
                <> 
                </>
            }
        </>
    );
}