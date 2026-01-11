import React, { useState } from "react";
import Editor from "./Editor";
import AiSuggestionForm from "./AiSuggestionForm";
import { FiUploadCloud } from "react-icons/fi";

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
    "Travel", "Tech", "Finance", "Fashion", "Food", "Personal", "Sports"
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
    <div className="container" style={{ maxWidth: '800px', marginTop: 'calc(var(--header-height) + 2rem)' }}>
      <h2 style={{ marginBottom: '2rem' }}>Create New Post</h2>
      <div className="new-post-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Title and Category */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="Post title"
              value={posttitle}
              onChange={(e) => setPosttitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              value={categoryId}
              onChange={onCategorychanged}
              className="form-input"
              style={{ appearance: 'none' }}
            >
              <option value="">Select category</option>
              {usersOptions}
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="fileInput" className="form-label" style={{ cursor: 'pointer', border: '2px dashed var(--border-color)', borderRadius: 'var(--border-radius)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)', transition: 'all 0.3s' }}>
            {preview ? (
              <img src={preview} alt="Preview" style={{ maxHeight: '350px', maxWidth: '100%', objectFit: 'cover', borderRadius: 'var(--border-radius)' }} />
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <FiUploadCloud size={40} />
                <p className="mb-0 mt-2">Click to Upload Image</p>
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
          {filename && <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{filename}</p>}
        </div>

        {/* AI Suggestions */}
        <div style={{ marginBottom: '1rem' }}>
          <AiSuggestionForm
            posttitle={posttitle}
            postBody={postBody}
            setPosttitle={setPosttitle}
            setPostBody={setPostBody}
            SetcategoryId={SetcategoryId}
            Image={image}
          />
        </div>

        {/* Editor */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
            <Editor value={postBody} onChange={setPostBody} />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-primary"
            style={{ width: '100%', fontSize: '1.2rem' }}
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
