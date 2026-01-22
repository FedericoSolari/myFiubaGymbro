import { MyReceip } from "../components/ItemsList/MyReceipList";

export const MyReceipPage = () => {

  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-full w-full p-3">
      <div className="bg-white p-6">
        <MyReceip />
      </div>
    </div>
  );
}
