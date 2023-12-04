import { Avatar, Grid, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import commentService from "../service/commentService";
import DeleteDialog from "./DeleteDialog";

const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";


const Comment = (props) => {

    const [commentList, setCommetList] = useState([]);
    useEffect(() => {
        init();
    }, [])

    const init = () => {
        commentService.getCommentByIdProduct(props.idProduct)
            .then(res => {
                setCommetList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <div style={{ padding: 14 }} className="App">
            <h1>Comments</h1>
            {
                commentList.length > 0 ?
                    commentList.map(element => {
                        return (
                            <Paper style={{ padding: "40px 20px", marginTop: 20 }}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar alt="Remy Sharp" src={imgLink} />
                                    </Grid>
                                    <Grid justifyContent="left" item xs zeroMinWidth>
                                        <h4 style={{ margin: 0, textAlign: "left" }}>{element.username}</h4>
                                        <p style={{ textAlign: "left" }}>
                                            {element.description}{" "}
                                        </p>
                            
                                        <p style={{ textAlign: "left", color: "gray" }}>
                                            posted 1 minute ago
                                        </p>
                                        <DeleteDialog name="comment" id={element.id} handleRefreshComment={init} />
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    }) : <></>
            }
        </div>
    );
}

export default Comment;