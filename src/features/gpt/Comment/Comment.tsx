import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import "./Comment.css";

interface Comment {
  id: number;
  text: string;
}

const CommentComponent: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        text: commentText,
      };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  return (
    <div className="comment-section">
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        value={commentText}
        onChange={handleCommentChange}
        className="comment-input"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCommentSubmit}
        className="comment-submit"
      >
        Submit
      </Button>
      <List className="comment-list">
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText primary={comment.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CommentComponent;
