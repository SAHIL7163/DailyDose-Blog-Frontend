import Layout from "./components/Layout";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import { format } from "date-fns";
import axios from "./api/posts";
import Register from "./components/Register";
import Login from "./components/Login";

import CategoryPage from "./components/categories/CategoryPage";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Editpost from "./components/Editpost";
import useWindowsize from "./hooks/useWindowsize";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import useRefreshToken from "./hooks/useRefreshToken";
import useAuth from "./hooks/useAuth";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import FormData from "form-data";


const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [posttitle, setPosttitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [categoryId, SetcategoryId] = useState("");
  const [image, setImage] = useState("");
  const [edittitle, setedittitle] = useState("");
  const [editpostbody, seteditpostbody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowsize();
  const [fetchError, setfetchError] = useState(false);
  const [isLoading, SetLoading] = useState(true);

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    async function fetchData() {
      try {
        await refresh();
      } catch (err) {
        console.log("Error occurred during refresh:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        if (response && response.data) setPosts(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
        //  setfetchError(error);
      } finally {
        SetLoading(false);
      }
    };
    fetchPosts();
  }, []);

  posts.sort((a, b) => a.datetime.localeCompare(b.datetime));

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.datetime.includes(search)
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const formData = new FormData();
    formData.append("title", posttitle);
    formData.append("datetime", datetime);
    formData.append("body", postBody);
    formData.append("image", image);
    formData.append("categoryId", categoryId);
    formData.append("user", auth?.user.username);
    console.log("Submitting new post:", {
      title: posttitle,
      datetime,
      body: postBody,
      image,
      categoryId,
      user: auth?.user.username,
    });

    try {
      const response = await axiosPrivate.post("/posts", formData);
      const allPosts = [...posts, response.data];
      setPosts(allPosts.sort((a, b) => b.datetime - a.datetime));
      setPosttitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error :${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const updatedPost = { title: edittitle, datetime, body: editpostbody };
    const formData = new FormData();
    formData.append("title", edittitle);
    formData.append("datetime", datetime);
    formData.append("body", editpostbody);
    formData.append("image", image);
    formData.append("categoryId", categoryId);

    try {
      const response = await axiosPrivate.put(`/posts/${id}`, formData);
      const nonsortposts = posts.map((post) =>
        post._id === id ? { ...response.data } : post
      );
      setPosts(nonsortposts.sort((a, b) => b.datetime - a.datetime));
      setedittitle("");
      seteditpostbody("");
      navigate("/");
    } catch (err) {
      console.log(`Error :${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/posts/${id}`);
      const NewPosts = posts.filter((post) => post._id !== id);
      setPosts(NewPosts);
      navigate("/");
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Routes>
      <Route
        path="/"
        element={<Layout search={search} setSearch={setSearch} width={width} />}
      >
        <Route
          index
          element={
            <Home
              posts={searchResults}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          }
        />

        <Route element={<PersistLogin />}>
          <Route path="post">
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route
                index
                element={
                  <NewPost
                    handleSubmit={handleSubmit}
                    posttitle={posttitle}
                    setPosttitle={setPosttitle}
                    postBody={postBody}
                    setPostBody={setPostBody}
                    image={image}
                    setImage={setImage}
                    categoryId={categoryId}
                    SetcategoryId={SetcategoryId}
                  />
                }
              />
            </Route>

            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.Admin, ROLES.User, ROLES.Editor]}
                />
              }
            >
              <Route
                path=":id"
                element={<PostPage posts={posts} handleDelete={handleDelete} />}
              />
            </Route>
          </Route>
        </Route>

        <Route element={<PersistLogin />}>
          <Route path="edit">
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
              }
            >
              <Route
                path=":id"
                element={
                  <Editpost
                    posts={posts}
                    handleEdit={handleEdit}
                    edittitle={edittitle}
                    setedittitle={setedittitle}
                    editpostbody={editpostbody}
                    seteditpostbody={seteditpostbody}
                    image={image}
                    setImage={setImage}
                    categoryId={categoryId}
                    SetcategoryId={SetcategoryId}
                  />
                }
              />
            </Route>
          </Route>
        </Route>

        <Route path="Register">
          <Route index element={<Register />} />
        </Route>
        <Route path="Login">
          <Route index element={<Login />} />
        </Route>
        {/* 
        <Route path="payment" >
          <Route index element ={<Stripe/> } />
        </Route>
 */}
        <Route path="category/:categoryId">
          <Route index element={<CategoryPage posts={searchResults} />} />
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
