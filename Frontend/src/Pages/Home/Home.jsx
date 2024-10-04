import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";

function Home() {
  const [category, setCategory] = useState("All");
  console.log(category);

  return (
    <div className="">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  );
}

export default Home;
