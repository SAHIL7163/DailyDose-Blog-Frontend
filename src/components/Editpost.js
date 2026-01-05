import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Editor from "./Editor";
import AiSuggestionForm from "./AiSuggestionForm";

const Editpost = ({
  posts,
  edittitle,
  setedittitle,
  editpostbody,
  seteditpostbody,
  handleEdit,
  image,
  setImage,
  categoryId,
  SetcategoryId,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post._id === id);
  const [filename, setFilename] = useState("");
  const [preview, setPreview] = useState(null);
  const categories = [
    "Travel",
    "Tech",
    "Finance",
    "Fashion",
    "Food",
    "PesonalBlog",
    "Sports",
  ];
  const usersOptions = categories.map((category, index) => (
    <option key={index + 1} value={index}>
      {category}
    </option>
  ));
  useEffect(() => {
    if (post) {
      setedittitle(post.title);
      seteditpostbody(post.body);
      setFilename(post.filename);
      setImage(post.filename);
      SetcategoryId(post.categoryId);
    }
  }, [post, seteditpostbody, setedittitle]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setFilename(selectedFile ? selectedFile.name : "");
    setPreview(URL.createObjectURL(selectedFile));
  };

  const onCategorychanged = (e) => SetcategoryId(e.target.value);

  return (
    <main className="NewPost">
      {(edittitle || editpostbody || image) && (
        <>
          <div className="d-flex justify-content-between gap-4">
            <div>
              {/* <label htmlFor="fileInput" className="upload-box form-label fs-4">
                {preview ? (
                  <img
                    src={post.imageUrl}
                    alt="Preview"
                    className="upload-preview"
                  />
                ) : (
                  <div>
                    <i className="bi bi-cloud-upload fs-1"></i>
                    <p className="mb-1">Drag & Drop / Upload Image</p>
                  </div>
                )}
              </label> */}

              <label htmlFor="fileInput" className="upload-box form-label fs-4">
                {preview ? (
                  /* New image selected */
                  <img src={preview} alt="Preview" className="upload-preview" />
                ) : post?.imageUrl ? (
                  /* Existing image from backend */
                  <img
                    src={post.imageUrl}
                    alt="Existing"
                    className="upload-preview"
                  />
                ) : (
                  /* No image */
                  <div>
                    <i className="bi bi-cloud-upload fs-1"></i>
                    <p className="mb-1">Drag & Drop / Upload Image</p>
                  </div>
                )}
              </label>

              <input
                id="fileInput"
                type="file"
                required
                hidden
                onChange={handleFileChange}
              />

              <p className="file-name">
                {filename ? `Selected: ${filename}` : "No file selected"}
              </p>
            </div>

            <div className="newPostForm mt-4 flex-grow-1">
              <div>
                <label className="form-label fs-4">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Blog title goes here..."
                  value={edittitle}
                  onChange={(e) => setedittitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="form-label fs-4">Category</label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={onCategorychanged}
                  className="form-select"
                  style={{ height: "2rem" }}
                >
                  <option value="">{categories[categoryId]}</option>
                  {usersOptions
                    .filter((option) => option.props.value !== post.categoryId)
                    .map((filteredOption) => (
                      <option
                        key={filteredOption.props.value}
                        value={filteredOption.props.value}
                      >
                        {filteredOption.props.children}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mt-4">
                <AiSuggestionForm
                  posttitle={edittitle}
                  postBody={editpostbody}
                  setPosttitle={setedittitle}
                  setPostBody={seteditpostbody}
                  SetcategoryId={SetcategoryId}
                  Image={image}
                />
              </div>
            </div>
          </div>

          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <Editor value={editpostbody} onChange={seteditpostbody} />

            <button
              type="submit"
              onClick={(e) => handleEdit(post._id)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                width: "100%",
              }}
            >
              Submit
            </button>
          </form>
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
    </main>
  );
};

export default Editpost;
