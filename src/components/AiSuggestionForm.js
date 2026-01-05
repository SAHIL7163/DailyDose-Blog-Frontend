import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AiSuggestionForm = ({
  setPosttitle,
  setPostBody,
  SetcategoryId,
  Image,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const handleAiGenerate = async () => {
    if (!Image) {
      setError("Please choose an image first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", Image);

      const res = await axiosPrivate.post(
        "/api/generate-blog-from-image",
        formData
      );

      const data = res.data;
      setPosttitle(data.title);
      setPostBody(data.body);
      SetcategoryId(data.category_id);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <> 
     <button
        type="submit"
        onClick={handleAiGenerate}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          width: "100%",
        }}
      >
        {loading ? "Generating..." : "Generate With AI"}
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </>
  );
};

export default AiSuggestionForm;
