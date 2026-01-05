import React from "react";
import Feed from "./Feed";
import Category from "./categories/Category";

const Home = ({ posts, fetchError, isLoading }) => {
  return (
    <main className="Home d-flex flex-column ">
      <Category />
      {isLoading && (
        <div
          className="statusMsg"
          style={{ margin: "5rem", minHeight: "50px" }}
        >
          Loading posts...
        </div>
      )}
      {fetchError && (
        <p
          className="statusMsg"
          style={{
            color: "red",
          }}
        >
          {fetchError}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (posts.length ? (
          <Feed posts={posts} />
        ) : (
          <div
            className="statusMsg"
            style={{ margin: "5rem", minHeight: "50px" }}
          >
            No Posts to Display
          </div>
        ))}
    </main>
  );
};

export default Home;
