import React, { useEffect, useState } from "react";

import Login from './Login';
import { useHistory } from 'react-router';
import { axiosWithAuth } from '../helpers/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  const { push } = useHistory(); 

  const toggleEdit = (value) => {
    setEditing(value);
      axiosWithAuth()
        .get(`http://localhost:5000/api/colors`)
        .then(res => {
          push('/bubbles')
        })
        .catch((err) => console.log({ err }))
  };

  const saveEdit = (editColor) => {
    setEditing(editColor); 
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors`, colors)
      .then(res => {
        push('./bubbles')
      })
      .catch((err) => console.log( { err }))
  };

  const deleteColor = (colorToDelete) => {
    setColors(colorToDelete); 
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/123`, id) 
      .then(res => {
        push('./bubbles')
      })
      .catch((err) => console.log( { err }))
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
      <Route path="/login" component={Login} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
