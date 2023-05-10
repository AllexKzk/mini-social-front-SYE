import { useEffect, useState } from "react";
import { getPosts } from "../../api/apiWorker";
import { IPostsCollection } from "./IPost";
import Post from "./Post";
import { IFriend } from "../../api/interfaces";
import { Button, Box, Paper, Typography } from "@mui/material";

interface IPostsCollectionPrev{
    sources?: string[],
    friends?: IFriend[]
}

export default function PostsCollection(props: IPostsCollectionPrev) {
    const [collection, setCollection] = useState<IPostsCollection>({posts: [], lastPostId: '0'});
    const [canLoadMore, setLoadBtn] = useState(false);

    useEffect(() => {
        loadPosts();
        console.log('post')
    }, []);

    const loadPosts = () => {
        if (props.sources)
            getPosts(props.sources, collection.lastPostId).then((newCollection: IPostsCollection) => {
                setLoadBtn(newCollection.posts.length > 0);
                setCollection({
                    posts: collection.posts.concat(newCollection.posts), 
                    lastPostId: newCollection.lastPostId
                });
            });
        else if (props.friends){
            const idArray = props.friends.map((friend: IFriend) => friend.id);
            getPosts(idArray, collection.lastPostId).then((newCollection: IPostsCollection) => {
                setLoadBtn(newCollection.posts.length > 0);
                setCollection({
                    posts: collection.posts.concat(newCollection.posts), 
                    lastPostId: newCollection.lastPostId
                });
            });
        }
    };

    return (
        <Box>
            {
                collection ? 
                collection.posts.map((post) => <Post data={post}/>) : <> </>
            }
            {
                canLoadMore ? 
                <Button onClick={loadPosts}>Load more</Button> : 
                <Paper sx={{margin: '1vh 0'}}> 
                    <Typography sx={{textAlign: 'center', padding: '1vh'}}>Дальше постов нет. Поворачивай обратно</Typography>
                </Paper>
            }
        </Box>
    );
}