import React, { useState, useEffect } from "react";
import axios from "../api/posts";
import useAuth from "../hooks/useAuth";
import "./Commentsection.css";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const Commentsection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  const { auth } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/comments`);
        setComments(response.data);
      } catch (err) {
        setError("Failed to fetch comments.");
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Prevent empty comments

    try {
      const response = await axios.post(`/posts/${postId}/comments`, {
        username: auth?.user.username,
        content: newComment,
      });
      setComments(response.data); // Update the comments state with the new list
      setNewComment(""); // Clear the input field
    } catch (err) {
      setError("Failed to add comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `/posts/${postId}/comments/${commentId}`
      );
      setComments(response.data.comments); // Update the comments state with the remaining comments
    } catch (err) {
      setError("Failed to delete comment.");
    }
  };

  return (
    <div className="comment-section">
      {/* Add Comment Box */}
      <div className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="comment-input"
        ></textarea>

        <button className="add-btn" onClick={handleAddComment}>
          <FiPlus size={20} />
        </button>
      </div>

      {/* Comment List */}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-card">
            <div className="comment-header">
              <div>
                <p className="comment-username">{comment.username}</p>
                <p className="comment-date">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>

              {comment.username === auth?.user.username && (
                <FiTrash2
                  className="delete-btn"
                  size={18}
                  onClick={() => handleDeleteComment(comment._id)}
                />
              )}
            </div>

            <p className="comment-content">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commentsection;
