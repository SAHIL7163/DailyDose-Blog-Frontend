import React from "react";
import Post from "./Post";

const Feed = ({ posts }) => {
  return (
    <div className="post-grid">
      {posts.map((post, index) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
