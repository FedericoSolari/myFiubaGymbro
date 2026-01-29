import { FileViewList } from "../components/ItemsList/FileViewList";

export const FileView = () => {

  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-full w-full p-3">
      <div className="bg-white p-6">
        <FileViewList />
      </div>
    </div>
  );
}
