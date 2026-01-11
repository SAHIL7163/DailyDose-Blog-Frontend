import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Feed from "../Feed";

const CategoryPage = ({ posts }) => {
  const { categoryId } = useParams();
  const location = useLocation();

  const categoryposts = Array.isArray(posts)
    ? posts.filter((post) => post.categoryId.toString() === categoryId)
    : [];

  const categoryName = location.state?.categoryName || "Category";
  const categoryImg = location.state?.categoryImg || "";

  return (
    <main className="Home container">
      {/* Category Title and Info */}
      <div className="mb-5 mt-4">
        <div className="d-flex align-items-center mb-3">
          <h1 className="display-4 fw-bold mb-0" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {categoryName}
          </h1>
        </div>

      </div>

      {/* Articles Grid - Same as Home Page */}
      {categoryposts.length > 0 ? (
        <Feed posts={categoryposts} />
      ) : (
        <div
          className="text-center py-5 bg-surface-alt rounded-3 border border-dashed"
          style={{
            minHeight: "400px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="mb-3 text-muted opacity-50">
            <i className="bi bi-journal-x" style={{ fontSize: '4rem' }}></i>
          </div>
          <h3 className="text-muted mb-2 fw-bold">No articles found</h3>
          <p className="text-muted" style={{ maxWidth: '400px' }}>
            We haven't published any articles in <strong>{categoryName}</strong> yet.
            Check back soon for updates!
          </p>
        </div>
      )}
    </main>
  );
};

export default CategoryPage;
