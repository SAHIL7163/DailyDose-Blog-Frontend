import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();

  const categories = [
    "Travel", "Tech", "Finance", "Fashion", "Food", "Personal", "Sports"
  ];

  const handleReadMoreClick = () => {
    navigate(`/post/${post._id}`);
  };

  const removeHtmlTags = (str) => {
    if (!str) return "";
    return str.replace(/<[^>]*>/g, "");
  };

  const cleanBody = removeHtmlTags(post.body);
  const excerpt = cleanBody.length <= 150 ? cleanBody : `${cleanBody.slice(0, 150)}...`;

  return (
    <article className="card">
      <div className="card-image-container">
        {post.imageUrl ? (
          <img className="card-image" src={`${post.imageUrl}`} alt={post.title} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1e293b, #334155)' }}></div>
        )}
      </div>

      <div className="card-content">
        <div className="card-meta">
          <span>{post.datetime}</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>
            {categories[post.categoryId] || 'General'}
          </span>
        </div>

        <h2 className="card-title">{post.title}</h2>
        <p className="card-excerpt">{excerpt}</p>

        <div className="card-footer">
          <button onClick={handleReadMoreClick} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Read More
          </button>
        </div>
      </div>
    </article>
  );
};

export default Post;
