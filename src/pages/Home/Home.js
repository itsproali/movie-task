import React, { useState } from "react";
import Banner from "./Banner/Banner";
import Movies from "./Movies/Movies";

const Home = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="min-h-screen">
      <Banner setQuery={setQuery} />
      <Movies query={query} />
    </div>
  );
};

export default Home;
