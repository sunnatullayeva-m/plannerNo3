import React, { lazy, Suspense } from 'react';
import { Routes, Outlet, Route } from 'react-router-dom'; 
import Layout  from './components/Layout/Layout';

const Home = lazy(() => import("./components/Home/Home"));
const Table = lazy(() => import("./components/Table/Table"));
const Project = lazy(() => import("./components/Project/Project"));
const Time = lazy(() => import("./components/Time/Time"));



function App () {
  return(

     <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='table' element={<Table />} />
          <Route path='project' element={<Project />} />
          <Route path='time' element={<Time />} />
        </Route>
      </Routes>

  )
}

export default App;