import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import FarmerLayout from "../layouts/FarmerLayout";
import HomeFeedPage from "../pages/HomeFeedPage";
import HomeFeedLayout from "../layouts/HomeFeedLayout";
import AuthLayout from "../layouts/AuthLayout";
import SignInPage from "../pages/SignInPage";
import Signup from "../pages/SignUpPage";
import FarmerHomePage from "../pages/FarmerHomePage";

import MessageLayout from "../components/message/MessageLayout";
import BuyerLayout from "../layouts/BuyerLayout";
import BuyerHomePage from "../pages/BuyerHomePage";
import BuyerCartPage from "../components/buyer/BuyerCartPage";

const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<AuthLayout />}>
        <Route path="auth/signin" element={<SignInPage />} />
        <Route path="auth/signup" element={<Signup />} />
      </Route>
      <Route path="/" element={<HomeFeedLayout />}>
        <Route index element={<HomeFeedPage />} />
      </Route>
      <Route path="/farmer" element={<FarmerLayout />}>
        <Route path=":farmerId" element={<FarmerHomePage />} />
        <Route
          path=":farmerId/messages/:anotherId"
          element={<MessageLayout />}
        />
      </Route>
      <Route path="/buyer" element={<BuyerLayout />}>
        <Route path=":buyerId" element={<BuyerHomePage />} />
        <Route path=":buyerId/cart" element={<BuyerCartPage />} />
        <Route
          path=":buyerId/messages/:anotherId"
          element={<MessageLayout />}
        />
      </Route>
    </Route>
  )
);

export default routers;
