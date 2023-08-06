
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from './components/navbar';
import CreateExercise from './components/create_exercise';
import CreateUser from './components/create_user';
import EditExercise from './components/edit_exercise';
import ExerciseList from './components/exercise_list';


function App() {
  return (
      <Router className="routes">
      <Navbar/>
      <Routes>
      <Route path="/" element={<ExerciseList/>}/>
      <Route path="/edit/:id" element={<EditExercise/>}/>
      <Route path="/create" element={<CreateExercise/>}/>
      <Route path="/user" element={<CreateUser/>}/>
    </Routes>
    </Router> 
  );
}

export default App;
