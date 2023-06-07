import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PersonalDetails({ type }) {
  //   const nav = useNavigate();
  //   useEffect(()=>{
  //     if(!type){
  //         nav
  //     }}
  //   })
  useEffect(() => {
    console.log(type);
  }, []);
  return <div>{type}</div>;
}
