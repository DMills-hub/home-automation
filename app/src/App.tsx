import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import logo from "./logo.svg";
import "./App.css";
import useApi from "./hooks/useApi";
import Button from "./components/Button";
import Input from "./components/Input";
import Home from "./pages/Home/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home></Home>
    </QueryClientProvider>
  );
}

export default App;
