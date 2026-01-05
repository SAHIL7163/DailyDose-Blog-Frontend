import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/posts";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { Container } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown, FaComment, FaShare } from "react-icons/fa";
import Commentsection from "./Commentsection";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  FiThumbsUp,
  FiThumbsDown,
  FiMessageCircle,
  FiShare2,
} from "react-icons/fi";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

const PostPage = ({ posts, handleDelete }) => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [isLoading, SetLoading] = useState(true);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false); 
  const [dislikes, setDislikes] = useState(0);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const { auth } = useAuth();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosPrivate.get(`/posts/${id}`);
        setPost(response.data);
        setLikes(response.data.likes || 0);
        setDislikes(response.data.dislikes || 0);
      } catch (err) {
        console.log(err);
        setError("Post Not found");
      } finally {
        SetLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (auth?.user?.username) {
      setHasLiked(post?.usersLiked?.includes(auth.user.username));
      setHasDisliked(post?.usersDisliked?.includes(auth.user.username));
    }
  }, [post, auth?.user?.username]);

  const isAdmin = auth?.roles?.includes(ROLES.Admin);
  const postBody = post.body;

  const handleLike = async () => {
    try {
      const response = await axios.put(`/posts/${id}/like`, {
        username: auth?.user.username,
        action: "like",
      });
      setLikes(response.data.likes);
      setDislikes(response.data.dislikes);
      setHasLiked(!hasLiked);
      setHasDisliked(false);
    } catch (err) {
      console.error("Error details:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Unexpected error occurred while liking the post";
      setError(errorMessage);
    }
  };

  const handleDislike = async () => {
    // if (hasDisliked) return;  // Prevent multiple dislikes
    try {
      const response = await axios.put(`/posts/${id}/like`, {
        username: auth?.user.username, // Username of the currently logged-in user
        action: "dislike", // The action (like or dislike)
      });
      setDislikes(response.data.dislikes);
      setLikes(response.data.likes);
      setHasDisliked(!hasDisliked);
      setHasLiked(false);
    } catch (err) {
      setError("Error while disliking the post");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: "Check out this blog post!",
          url: window.location.href,
        })
        .catch((err) => console.log("Sharing failed", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const commentSectionRef = useRef(null);

  const toggleComments = () => {
    setIsCommentsVisible((prev) => !prev); // Toggle visibility
    if (!isCommentsVisible && commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!postBody) {
    return null;
  }
  const paragraphs = postBody.split("\n");

  return (
    <main className="PostPage">
      {isLoading && <p className="statusMsg mt-4">Loading post...</p>}
      {error && (
        <p
          className="statusMsg mt-4"
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}
      {!isLoading && !error && (
        <div className="">
          {post && (
            <>
              <div
                className="d-flex flex-column ms-4"
                style={{ marginTop: "20px" }}
              >
                <h2 className="postitle">{post.title}</h2>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postDate">written by {post.user}</p>
                  </div>
                  <div className="me-4">
                    {auth.user.username === post.user && (
                      <div className="d-flex gap-3">
                        {/* Edit */}
                        <Link to={`/edit/${post._id}`}>
                          <FiEdit
                            size={50}
                            className="text-primary cursor-pointer"
                            title="Edit Blog"
                          />
                        </Link>

                        {/* Delete */}
                        <FiTrash2
                          size={50}
                          className="text-danger cursor-pointer"
                          title="Delete Blog"
                          onClick={() => handleDelete(post._id)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center mt-3">
                <img
                  className="img-fluid"
                  src={`${post.imageUrl}`}
                  alt={post.title || "post image"}
                />
              </div>
              <div className="scrollable-content my-5 mx-4">
                <div>
                  {paragraphs.map((paragraph, index) => (
                    <p key={index} className="post-para">
                      <span
                        className="content"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}

          {!post && (
            <>
              <h2>Post Not Found</h2>
              <p>Well, that's disappointing.</p>
              <p>
                <Link to="/">Visit Our Homepage</Link>
              </p>
            </>
          )}
        </div>
      )}

      {/* Like, Comment, Share Section */}
      <div className="postpage-icons">
        {/* Like */}
        <button
          onClick={handleLike}
          className="icon-btn"
          style={{ color: hasLiked ? "blue" : "gray" }}
        >
          <FiThumbsUp size={60} />
          <span>{likes}</span>
        </button>

        {/* Dislike */}
        <button
          onClick={handleDislike}
          className="icon-btn"
          style={{ color: hasDisliked ? "red" : "gray" }}
        >
          <FiThumbsDown size={60} />
          <span>{dislikes}</span>
        </button>

        {/* Comments */}
        <button onClick={toggleComments} className="icon-btn">
          <FiMessageCircle size={60} />
          <span className="hide-on-small">Comments</span>
        </button>

        {/* Share */}
        <button onClick={handleShare} className="icon-btn">
          <FiShare2 size={60} />
          <span className="hide-on-small">Share</span>
        </button>
      </div>

      {isCommentsVisible && (
        <div
          ref={commentSectionRef}
          style={{
            marginTop: "20px",
            border: "1px solid lightgray",
            borderRadius: "5px",
          }}
        >
          <Commentsection postId={id} />
        </div>
      )}
    </main>
  );
};

export default PostPage;
