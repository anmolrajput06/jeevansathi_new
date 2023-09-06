// import { lazy } from "react";
// import { Navigate } from "react-router-dom";

// /****Layouts*****/
// const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

// /***** Pages ****/

// const Starter = lazy(() => import("../views/Starter.js"));
// const About = lazy(() => import("../views/About.js"));
// const EventForm = lazy(() => import("../views/ui/EventForm.js"));
// const Badges = lazy(() => import("../views/ui/Badges"));
// const Buttons = lazy(() => import("../views/ui/Buttons"));
// const EventDataTable = lazy(() => import("../views/ui/EventDataTable.js"));
// const Grid = lazy(() => import("../views/ui/Grid"));
// const Tables = lazy(() => import("../views/ui/Tables"));
// const Forms = lazy(() => import("../views/ui/Forms"));
// const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
// const Login=lazy(()=>import("../auth/Login.js"))
// const UserDetails = lazy(()=>import("../"))
// const UserDetail = lazy(()=> import("../views/ui/UserDetail.js"))
// const EventUpdate=lazy(()=> import("../views/ui/EventUpdate.js"))
// /*****Routes******/

// const ThemeRoutes = [
//   {path : "/login" , exact : true , element : <Login/>},
//   {
//     path: "/",
//     element: <FullLayout />,
//     children: [
//       { path: "/", element: <Navigate to="/login" /> },
//       { path: "/starter", exact: true, element: <Starter /> },
//       { path: "/about", exact: true, element: <About /> },
//       { path: "/EventForm", exact: true, element: <EventForm /> },
//       { path: "/badges", exact: true, element: <Badges /> },
//       { path: "/buttons", exact: true, element: <Buttons /> },
//       { path: "/EventDataTable", exact: true, element: <EventDataTable /> },
//       { path: "/grid", exact: true, element: <Grid /> },
//       { path: "/table", exact: true, element: <Tables /> },
//       { path: "/forms/:id", exact: true, element: <Forms /> },
//       { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
//       { path: "/userdetails/:id", exact: true, element: <UserDetail /> },
//       { path: "/eventUpdate/:id", exact: true, element: <EventUpdate /> },

//     ],
//   },
// ];

// export default ThemeRoutes;



import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/**** Pages ***/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const EventForm = lazy(() => import("../views/ui/EventForm.js"));
const Contact = lazy(() => import("../views/ui/Contact.js"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const EventDataTable = lazy(() => import("../views/ui/EventDataTable.js"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const Login = lazy(() => import("../auth/Login.js"))
const UserDetails = lazy(() => import("../"))
const UserDetail = lazy(() => import("../views/ui/UserDetail.js"))
const UserEdit = lazy(() => import("../views/ui/Forms.js"))
const EventUpdate = lazy(() => import("../views/ui/EventUpdate.js"))


/*****Routes******/

const ThemeRoutes = [
  { path: "/login", exact: true, element: <Login /> },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/EventForm", exact: true, element: <EventForm /> },
      { path: "/contact", exact: true, element: <Contact /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/EventDataTable", exact: true, element: <EventDataTable /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms/:id", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/userdetails/:id", exact: true, element: <UserDetail /> },
      { path: "/useredit/:id", exact: true, element: <UserEdit /> },
      { path: "/eventUpdate/:id", exact: true, element: <EventUpdate /> },



    ],
  },
];

export default ThemeRoutes;

