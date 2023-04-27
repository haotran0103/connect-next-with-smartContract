import React from 'react'
import Header from './header/header';
import Footer from './footer/footer';
export default function layout({children}) {
  return (
    <>
   <Header/>
    {children}
   <Footer/>
   </>
  )
}
