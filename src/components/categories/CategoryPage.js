import { useParams } from "react-router-dom";
import Post from "../Post";
import { useLocation } from "react-router-dom";

const CategoryPage = ({ posts }) => {
  const { categoryId } = useParams();
  const location = useLocation();

  const categoryposts = Array.isArray(posts)
    ? posts.filter((post) => post.categoryId.toString() === categoryId)
    : [];

  const categoryName = location.state?.categoryName || "Category";

  return (
    <main className="Home d-flex flex-column justify-content-center gap-20">
      <h1 className="text-center mt-3">{categoryName} Blogs</h1>
      <div>
        {categoryposts.length > 0 ? (
          categoryposts.map((post, index) => (
            <Post key={post.id} post={post} postIndex={index} />
          ))
        ) : (
          <div
            className="statusMsg d-flex justify-content-center align-items-center"
            style={{ margin: "5rem", minHeight: "320px" }}
          >
            <p>No Posts to Display</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
