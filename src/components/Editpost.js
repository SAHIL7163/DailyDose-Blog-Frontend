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
    <div className="container" style={{ maxWidth: '800px', marginTop: 'calc(var(--header-height) + 2rem)' }}>
      {post ? (
        <>
          <h2 style={{ marginBottom: '2rem' }}>Edit Post</h2>
          <div className="new-post-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Title and Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Post title"
                  value={edittitle}
                  onChange={(e) => setedittitle(e.target.value)}
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
                  {/* Handle legacy categoryId correctly if needed, or simple mapping */}
                  {categories.map((cat, idx) => (
                    <option key={idx} value={idx}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label htmlFor="fileInput" className="form-label" style={{ cursor: 'pointer', border: '2px dashed var(--border-color)', borderRadius: 'var(--border-radius)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)', transition: 'all 0.3s' }}>
                {preview ? (
                  <img src={preview} alt="Preview" style={{ maxHeight: '350px', maxWidth: '100%', objectFit: 'cover', borderRadius: 'var(--border-radius)' }} />
                ) : post.imageUrl ? (
                  <img src={post.imageUrl} alt="Current" style={{ maxHeight: '350px', maxWidth: '100%', objectFit: 'cover', borderRadius: 'var(--border-radius)' }} />
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <i className="bi bi-cloud-upload fs-1"></i>
                    <p className="mb-0 mt-2">Click to Upload New Image</p>
                  </div>
                )}
              </label>
              <input
                id="fileInput"
                type="file"
                hidden
                onChange={handleFileChange}
              />
              {filename && <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Selected: {filename}</p>}
            </div>

            {/* AI Suggestions */}
            <div style={{ marginBottom: '1rem' }}>
              <AiSuggestionForm
                posttitle={edittitle}
                postBody={editpostbody}
                setPosttitle={setedittitle}
                setPostBody={seteditpostbody}
                SetcategoryId={SetcategoryId}
                Image={image}
              />
            </div>

            {/* Editor */}
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ marginBottom: '2rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
                <Editor value={editpostbody} onChange={seteditpostbody} />
              </div>

              <button
                type="submit"
                onClick={() => handleEdit(post._id)}
                className="btn-primary"
                style={{ width: '100%', fontSize: '1.2rem' }}
              >
                Update Post
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <h2>Post Not Found</h2>
          <Link to="/" className="btn btn-primary mt-3">Return Home</Link>
        </div>
      )}
    </div>
  );
};

export default Editpost;
