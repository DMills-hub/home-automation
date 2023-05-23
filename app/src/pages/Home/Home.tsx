import useApi from "../../hooks/useApi";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";

function Home() {
  const query = useApi("devices", "device/all");
  console.log(query.data);
  return (
    <div>
      Home
      <Button text="Refetch" onClick={() => query.refetch()} />
    </div>
  );
}

export default Home;
