import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './component/TodoList';
import AdvanceTodo from './component/AdvanceTodo'
import Appbar from "./component/Appbar";

function App() {

  return (
    <>
       <BrowserRouter>
       <Appbar />
      <Routes>
        
          <Route path="/" element={<TodoList />}/>
          <Route path="adv" element={<AdvanceTodo />}/>
   
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
