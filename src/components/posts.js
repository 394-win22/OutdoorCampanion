import React, {useState} from "react";
import {Card, Image} from "react-bootstrap";
import {Comments} from "./comments";
import {isMobile} from 'react-device-detect';
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import {Link} from "react-router-dom";
import {delete_post,like_post, unlike_post,check_if_liked} from "../database/posts";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {addToGroupChat} from "../database/posts";


export const Feed = ({ posts, category, UName, UEmail, uid }) => {
    return (
        <div className="feed">
            { posts ? Object.values(posts).filter(post => category === "" || post.category === category).map( post =>
                <Post key={post.postKey} post={post} UName={UName} UEmail={UEmail} uid={uid}/>) : null
            }
        </div>
    );
}

const Post = ({ post, UName, UEmail, uid }) => {
    const [selected, setSelected] = useState(false);
    const [liked, setLiked] = useState(false);
    check_if_liked(post.postKey, UEmail, setLiked);
    const categoryfn = () =>{
        if (post.category === 'event'){
            return <div className="alert alert-primary" style={{display: 'flex'}}>Event <FaIcons.FaHiking />
                    <div className="shareIconDiv" >
                        <Link to={"/share"}>
                            <div style={{width: 100+'%'}}>
                                <ImIcons.ImShare className="shareIcon"/>
                            </div>
                        </Link>
                    </div>
                </div>
        }
        else if (post.category === 'question'){
            return <div className="alert alert-danger" style={{display: 'flex'}}> Question <FaIcons.FaQuestionCircle />
                    <div className="shareIconDiv" >
                        <Link to={"/share"} >
                            <div style={{width: 100+'%'}}>
                                <ImIcons.ImShare className="shareIcon" style={{color: '#800000'}}/>
                            </div>
                        </Link>
                    </div>
                </div>
        }
        else if (post.category === 'promotion'){
            return <div className="alert alert-dark"  style={{display: 'flex'}}> Promotion <FaIcons.FaBullhorn />
                    <div className="shareIconDiv" >
                        <Link to={"/share"}>
                            <div style={{width: 100+'%'}}>
                                <ImIcons.ImShare className="shareIcon" style={{color: '#000000'}}/>
                            </div>
                        </Link>
                    </div>
                </div>
        }
        else {
            return <div className="alert alert-success"  style={{display: 'flex'}}> Experience <FaIcons.FaCampground/>
                    <div className="shareIconDiv" >
                        <Link to={"/share"}>
                            <div style={{width: 100+'%'}}>
                                <ImIcons.ImShare className="shareIcon" style={{color: '#2E8B57'}}/>
                            </div>
                        </Link>
                    </div>
                </div>
        }
    }

    const joinEvent = () => {
        addToGroupChat(post.postKey, uid)
    }

    return (
        <Card className="m-2">
            <Card.Body>
                {categoryfn()}
                <Card.Title>{ post.text }</Card.Title>
                { post.image ?
                    (isMobile ?
                         <Image src={post.image} alt="postImage" fluid={true} style={{width: "100%"}}/> :
                         <Image src={post.image} alt="postImage" fluid={true} style={{width: "30%"}}/>)
                    : null
                }
                { post.heldTime ? <Card.Text>{"Time: " + post.heldTime}</Card.Text> : null }
                { post.address ? <Card.Text> {"Location: " + post.address}</Card.Text> : null }
                <Card.Text><small className="text-muted">{post.creator + " " + new Date(post.time).toLocaleString()}</small></Card.Text>
                { selected ?
                    <button type="button" className="btn btn-secondary" onClick={() => setSelected(false)}>
                        close comments
                    </button> :
                    <button type="button" className="btn btn-outline-dark" onClick={() => setSelected(true)}>
                        {!post.comments ? 0 : Object.keys(post.comments).length} comment(s)
                    </button>
                }
                { uid ? liked?
                    <button type="button" className="bi bi-heart-fill" onClick={() => {setLiked(false); unlike_post(post.postKey, UEmail)}}>
                        {!post.likes ? 0 : Object.keys(post.likes).length} like(s)
                    </button> :
                    <button type="button" className="bi bi-heart" onClick={() => {setLiked(true); like_post(post.postKey,UEmail)}}>
                        {!post.likes ? 0 : Object.keys(post.likes).length} like(s)
                    </button> : null
                }
                { UEmail===post.creatorEmail ?
                    <button type="button" className="btn btn-outline-dark" onClick={() => delete_post(post.postKey)}>
                        delete
                    </button> :
                    (uid ? <button type="button" className="btn btn-secondary" onClick={() => joinEvent()}>Join</button>:null)
                }

            </Card.Body>
            { selected ? <Comments postKey={post.postKey} UName = {UName}/>: null}
        </Card>

    );
}



