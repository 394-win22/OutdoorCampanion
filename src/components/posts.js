import React, {useState} from "react";
import {Card, Image} from "react-bootstrap";
import {Comments} from "./comments";
import {isMobile} from 'react-device-detect';
import 'bootstrap-icons/font/bootstrap-icons.css';


export const Feed = ({ posts, category }) => {
    return (
        <div className="feed">
            { posts ? Object.values(posts).filter(post => category === "" || post.category === category).map( post =>
                <Post key={post.postKey} post={post}  />) : null
            }
        </div>
    );
}

const Post = ({ post, handleClick }) => {
    const [selected, setSelected] = useState(false);
    const [commentOpen, setOpen] = useState(false);
    return (
        <Card className="m-2"
            //   onClick={() => setSelected(true)}
            //   onDoubleClick={() => setSelected(false)}
        >
            <Card.Body>
                <Card.Title>{ post.text }</Card.Title>
                { post.image? <img src = { post.image } alt="postImage"/> : null }
                <Card.Text>{post.creator + " " + new Date(post.time).toLocaleString()}</Card.Text>
                {selected ? <button type="button" className="btn btn-secondary" onClick={() => setSelected(false)}>close comments</button> : <button type="button" className="btn btn-outline-dark" onClick={() => setSelected(true)}>{!post.comments ? 0 : Object.keys(post.comments).length} comment(s)</button>}
            </Card.Body>
            {selected ? <Comments postKey={post.postKey}/>: null}
        </Card>
    );

    // <i class="bi bi-x"></i>
}