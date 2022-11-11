import axios from "axios";
import React from "react"

export const getCategoies=(user_id)=>async(dispatch)=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const id={uid:user_id}
    const body=JSON.stringify({uid:user_id, name:"Eyasu Emana"})
    // const body=JSON.stringify(data);
    try {
        const res=await axios.post(`${process.env.REACT_APP_API_URL}/api/service/get-categories/`, body, config);
        dispatch({
            type:"CATEGORY_LOAD_SUCCESS",
            payload:JSON.stringify(res.data)
        })
    } catch (error) {
        
        dispatch({
            type:"CATEGORY_LOAD_FAIL"
        })
    }
}
export const addCategory=(data)=>async(dispatch)=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify(data);
    try {
        const res=await axios.post(`${process.env.REACT_APP_API_URL}/api/service/add-category/`,body,config);
       
        dispatch({
            type:"CATEGORY_ADDED_SUCCESS"
        })
    } catch (error) {
        dispatch({
            type:"CATEGORY_ADDED_FAIL"
        })
    }
}
export const getCategoryLinks=(category,user_id)=>async(dispatch)=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify({category:category,uid:user_id});
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/service/get-catlinks/`,body,config);
    dispatch({
        type:"CATLINKS_LOAD_SUCCESS",
        payload:JSON.stringify(res.data)
    })
  } catch (error) {
    dispatch({
        type:"CATLINKS_LOAD_FAIL"
    })
  }
}