import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import {createHashRouter, RouterProvider} from "react-router-dom";
import IndexPage from "./index.tsx";
import FormPage from "@/form.tsx";

const router = createHashRouter([
    {
        path: "/",
        element: <IndexPage />,
    },
    {
        path: "form",
        element: <FormPage />
    }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
