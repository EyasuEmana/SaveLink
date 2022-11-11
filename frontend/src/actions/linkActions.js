import axios from "axios";

export const getLinks = (user_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const id = { uid: user_id };
  const body = JSON.stringify({ uid: user_id });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/service/get-links/`,
      body,
      config
    );
    dispatch({
      type: "LINKS_LOAD_SUCCESS",
      payload: JSON.stringify(res.data),
    });
  } catch (error) {
    dispatch({
      type: "LINKS_LOAD_FAIL",
    });
  }
};
export const addLinkAction = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const datapassed = data;
  const body = JSON.stringify(datapassed);
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/service/add-link/`,
      body,
      config
    );
    dispatch({
      type: "LINK_ADD_SUCCESS",
    });
    return "successfully added"
  } catch (error) {
    return "failed to add data"
    dispatch({
      type: "LINK_ADD_FAIL",
    });
  }
};
export const deleteLink = (link_id) => async(dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/service/link-delete/${link_id}/`,config);

    const userid = JSON.parse(localStorage.getItem("currentUser")).id;

    const body = JSON.stringify({ uid: userid });
    
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/service/get-links/`,
      body,
      config
    );
    dispatch({
      type:"LINK_DELETE_SUCCESS",
      payload: JSON.stringify(res.data),
    })

  } catch (error) {
    dispatch({
      type:"LINK_DELETE_FAIL"
    })
  }
};
