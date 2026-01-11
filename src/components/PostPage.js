import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../api/posts";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import Commentsection from "./Commentsection";
import { FiEdit, FiTrash2, FiThumbsUp, FiThumbsDown, FiMessageCircle, FiShare2, FiArrowLeft } from "react-icons/fi";

const PostPage = ({ handleDelete }) => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const commentSectionRef = useRef(null);

  const { auth } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosPrivate.get(`/posts/${id}`);
        setPost(response.data);
        setLikes(response.data.likes || 0);
        setDislikes(response.data.dislikes || 0);
      } catch (err) {
        console.error(err);
        setError("Post Not Found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id, axiosPrivate]);

  useEffect(() => {
    if (auth?.user?.username && post) {
      setHasLiked(post.usersLiked?.includes(auth.user.username));
      setHasDisliked(post.usersDisliked?.includes(auth.user.username));
    }
  }, [post, auth?.user?.username]);

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
      console.error(err);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.put(`/posts/${id}/like`, {
        username: auth?.user.username,
        action: "dislike",
      });
      setDislikes(response.data.dislikes);
      setLikes(response.data.likes);
      setHasDisliked(!hasDisliked);
      setHasLiked(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: "Check out this blog post!",
        url: window.location.href,
      }).catch((err) => console.log("Sharing failed", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const toggleComments = () => {
    setIsCommentsVisible((prev) => !prev);
    if (!isCommentsVisible && commentSectionRef.current) {
      setTimeout(() => commentSectionRef.current.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  if (isLoading) return <p className="statusMsg">Loading post...</p>;
  if (error) return <p className="statusMsg" style={{ color: "var(--error)" }}>{error}</p>;
  if (!post) return <p className="statusMsg">Post not found.</p>;

  const paragraphs = post.body.split("\n");

  return (
    <article className="post-page">
      <div className="mb-5 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="d-flex"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            padding: 0,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.borderColor = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}
        >
          <FiArrowLeft size={20} />
        </button>
      </div>

      <div className="post-hero">
        <img
          src={post.imageUrl || ""}
          alt={post.title}
          className="post-hero-img"
          style={{ display: post.imageUrl ? 'block' : 'none' }}
        />

        {!post.imageUrl && (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1e293b, #334155)' }}></div>
        )}
      </div>

      <header className="post-header position-relative">
        <h1 className="display-4 fw-bold mb-4" style={{ fontFamily: 'var(--font-display)', lineHeight: '1.2' }}>{post.title}</h1>

        <div className="d-flex align-items-center justify-content-center gap-3 text-muted mb-4">
          <span className="fw-medium">{post.datetime}</span>
          <span>•</span>
          <span className="fw-medium">by {post.user}</span>
        </div>

        {auth.user.username === post.user && (
          <div className="d-flex justify-content-center align-items-center mb-4">
            <Link
              to={`/edit/${post._id}`}
              className="d-flex align-items-center justify-content-center"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                width: '48px',
                height: '48px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '14px',
                marginRight: '2rem'
              }}
              title="Edit Post"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)';
                e.currentTarget.style.color = 'var(--accent-primary)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FiEdit size={22} strokeWidth={2} />
            </Link>
            <button
              onClick={() => handleDelete(post._id)}
              className="d-flex align-items-center justify-content-center bg-transparent"
              style={{
                color: 'var(--text-muted)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                width: '48px',
                height: '48px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '14px'
              }}
              title="Delete Post"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                e.currentTarget.style.color = 'var(--error)';
                e.currentTarget.style.borderColor = 'var(--error)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FiTrash2 size={22} strokeWidth={2} />
            </button>
          </div>
        )}

      </header>

      {/* Post Content */}
      <div className="post-body">
        {paragraphs.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </div>

      {/* Actions Bar - Enhanced */}
      <div className="postpage-icons">
        <button
          onClick={handleLike}
          className={`icon-btn ${hasLiked ? 'active-like' : ''}`}
          title="Like this post"
        >
          <FiThumbsUp size={22} strokeWidth={2.5} />
          <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{likes}</span>
        </button>

        <button
          onClick={handleDislike}
          className={`icon-btn ${hasDisliked ? 'active-dislike' : ''}`}
          title="Dislike this post"
        >
          <FiThumbsDown size={22} strokeWidth={2.5} />
          <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{dislikes}</span>
        </button>

        <button
          onClick={toggleComments}
          className={`icon-btn ${isCommentsVisible ? 'active-like' : ''}`}
          title="View comments"
        >
          <FiMessageCircle size={22} strokeWidth={2.5} />
          <span>Comments</span>
        </button>

        <button
          onClick={handleShare}
          className="icon-btn"
          title="Share this post"
        >
          <FiShare2 size={22} strokeWidth={2.5} />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {isCommentsVisible && (
        <div ref={commentSectionRef} style={{ marginTop: 'var(--spacing-xl)' }}>
          <Commentsection postId={id} />
        </div>
      )}

    </article>
  );
};

export default PostPage;
