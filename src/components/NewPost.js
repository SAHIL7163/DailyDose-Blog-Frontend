import React from "react";
import { useState } from "react";
import Editor from "./Editor";
import AiSuggestionForm from "./AiSuggestionForm";

const NewPost = ({
  handleSubmit,
  posttitle,
  setPosttitle,
  postBody,
  setPostBody,
  image,
  setImage,
  categoryId,
  SetcategoryId,
}) => {
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
  const [filename, setFilename] = useState("");
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setFilename(selectedFile ? selectedFile.name : "");
    setPreview(URL.createObjectURL(selectedFile));
  };

  const onCategorychanged = (e) => SetcategoryId(e.target.value);

  return (
    <main className="NewPost">
      <div className="new-post-card">
        <div className="d-flex justify-content-between gap-4">
          <div>
            <label htmlFor="fileInput" className="upload-box form-label fs-4">
              {preview ? (
                <img src={preview} alt="Preview" className="upload-preview" />
              ) : (
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
                placeholder="Post title"
                value={posttitle}
                onChange={(e) => setPosttitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label fs-4">Category</label>
              <select
                value={categoryId}
                onChange={onCategorychanged}
                className="form-select"
              >
                <option value="">Select category</option>
                {usersOptions}
              </select>
            </div>
            <div className="mt-4">
              <AiSuggestionForm
                posttitle={posttitle}
                postBody={postBody}
                setPosttitle={setPosttitle}
                setPostBody={setPostBody}
                SetcategoryId={SetcategoryId}
                Image={image}
              />
            </div>
          </div>
        </div>

        <form className="newPostForm" onSubmit={handleSubmit}>
          <Editor value={postBody} onChange={setPostBody} />
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            <h4>Submit</h4>
          </button>
        </form>
      </div>
    </main>
  );
};

export default NewPost;
