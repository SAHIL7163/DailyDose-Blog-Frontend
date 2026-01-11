import React from "react";
import Feed from "./Feed";
import Category from "./categories/Category";
import LoadingSkeleton from "./LoadingSkeleton";

const Home = ({ posts, fetchError, isLoading }) => {
  return (
    <main className="Home container">

      {/* CATEGORIES - RESTORED */}
      <Category />

      {/* FEED */}
      <div id="posts-grid">
        {isLoading && (
          <div className="post-grid">
            <LoadingSkeleton type="post" />
            <LoadingSkeleton type="post" />
            <LoadingSkeleton type="post" />
          </div>
        )}

        {fetchError && (
          <div className="text-center py-5">
            <p className="text-danger fs-5">{fetchError}</p>
          </div>
        )}

        {!isLoading && !fetchError && (
          posts.length ? (
            <Feed posts={posts} />
          ) : (
            <div className="text-center py-5 bg-surface-alt rounded-3 border border-dashed">
              <h3 className="text-muted mb-2">No articles found</h3>
              <p className="text-muted">Check back later for new content.</p>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default Home;
