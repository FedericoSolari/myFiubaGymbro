import './App.css';
import SideBar from './components/SideBar';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <>
      <div className="flex bg-white text-slate-900 min-h-screen">
        <SideBar />
        <div className='lg:mt-0 flex w-full h-full justify-center fade-in'>
          <AppRouter />
        </div> 
      </div>       
    </>
  );

}

export default App;