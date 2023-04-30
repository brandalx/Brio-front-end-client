import React from 'react';

export default function Main(props) {
  //this is for bg of the page should be setted on the top level div of any page component if not chakra component

  return <main className='page-body'>{props.children}</main>;
}
