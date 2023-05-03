import { useContext } from 'react'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//import { defaultMethod } from "react-router-dom/dist/dom";
import {UserContext} from "./components/UserContext.jsx";

//pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/help/Contact";
import Faq from "./Pages/help/Faq";
import NotFound from "./Pages/help/NotFound";
import Activities from "./Pages/activities/Activities";

//layouts
import RootLayout from "./layouts/RootLayout";
import HelpLayout from "./layouts/HelpLayout";
import ActivitiesLayout from "./layouts/ActivitiesLayout";
import Joinactivity from "./Pages/activities/Joinactivity";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="activities" element={<ActivitiesLayout />}>
        <Route path="createactivities" element={<Activities />} />
        <Route path="joinedactivities" element={<Joinactivity />} />
        {/* <Route index element={<Activities />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
  );

  function App3() {
    const loggedInUser = useContext(UserContext);
    const user = loggedInUser.user;

    console.log(`Logged-in user:  ${user}`);

    return <RouterProvider router={router} />;
  }

  export default App3;
