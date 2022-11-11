import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddLink from "./components/addlink/AddLink";
import Add_link_or_category from "./components/add_link_or_category/add_link_or_category";
import Content from "./components/content/Content";
import LinkCard from "./components/linkCards/LinkCard";
import AddCat from "./components/addcat/AddCat";
import Register from "./screens/account/Register";
import Activate from "./screens/account/Activate";
import ResetPasswordConfirm from "./screens/account/ResetPasswordConfirm";
import ResetPassword from "./screens/account/ResetPassword";
import Login from "./screens/account/Login";
import { connect, Connect, useDispatch, useSelector } from "react-redux";
import { checkAuthenticated, load_user } from "./actions/auth";
import axios from "axios";
import { getLinks } from "./actions/linkActions";
import { linkReducer } from "./reducers/linkReducers";
import { getCategoies } from "./actions/categoryAction";
import { authReducer } from "./reducers/auth";
import { catReducer } from "./reducers/categoryReducer";
import CatCard from "./components/catCards/CatCard";
import LandingPage from "./bscadminlandingpage/LandingPage";
import Navbar from "./components/navbar/Navbar";
import CatLinkCard from "./components/catlinkcars/CatLinkCard";
// import LinkCardClassBased from "./components/linkCards/linkCardClassBased";
// import MenuAppBar from "./bscadminlandingpage/navbar";

function App(props) {
  const [LinkList, setLinkList] = useState([]);
  const [categories, setCategories] = useState({ id: [], cat: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  var catArray = [];

  const authstate = useSelector((state) => state.authReducer);
  const { isAuthenticated } = authstate;

  const linkstate = useSelector((state) => state.linkReducer);
  const { links, islinkloaded } = linkstate;

  const catstate = useSelector((state) => state.catReducer);
  const { cats, isCatLoaded } = catstate;

  const userid = JSON.parse(localStorage.getItem("currentUser")).id;
  const dispatch = useDispatch();

  useEffect(() => {
    props.load_user();
    props.checkAuthenticated();
  }, []);

  function linkFetch() {
    if (JSON.parse(localStorage.getItem("currentUser")).id) {
      dispatch(getLinks(userid)).then(() => {
        setLinkList(links);
        setIsLoaded(islinkloaded);
      });
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          ></Route>
          <Route path="/activate/:uid/:token" element={<Activate />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/landing-page" element={<LandingPage />}></Route>
          <Route path="/" element={<Content />}>
            <Route index element={<LinkCard />}></Route>
            <Route
              path="/cat-cards"
              element={<CatCard ctgs={categories} />}
            ></Route>
            <Route path="/cat-link-cards" element={<CatLinkCard />}></Route>
            <Route path="/add-link" element={<Add_link_or_category />}>
              <Route
                index
                element={
                  <AddLink categories={categories} linkFetch={linkFetch} />
                }
              ></Route>
              <Route path="add-cat" element={<AddCat />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default connect(null, {
  checkAuthenticated,
  load_user,
  getCategoies,
  getLinks,
})(App);
