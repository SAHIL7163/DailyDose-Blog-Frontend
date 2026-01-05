import React from "react";
import Post from "./Post";
const Feed = ({ posts }) => {
  return (
    <main className="Feed">
      {posts.map((post, index) => (
        <Post key={post.id} post={post} postIndex={index} />
      ))}
    </main>
  );
};

export default Feed;
