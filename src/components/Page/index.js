import React from 'react';
import './../../assets/styles/Page.css';

function Page({ children }) { // <-- we're destructuring the children from props
  return (
    <section className="page">{children}</section>
  );
}

export default Page;
