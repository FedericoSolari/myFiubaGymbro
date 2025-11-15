import { useState } from "react";
import { UserHome } from "../components/ItemsList/UserHome";

export const HomePage = () => {
  const [updateHome, setUpdateHome] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-full w-full p-3">
      <div className="bg-white p-6">
        <UserHome updateHome={updateHome} onUpdateHome={setUpdateHome} />
      </div>
    </div>
  );
}
