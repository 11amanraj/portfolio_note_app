import React from 'react';
import CreateNote from './components/CreateNote/CreateNote';
import AllNotes from './components/Notes/AllNotes';

function App() {
  return (
    <div>
      <CreateNote />
      <AllNotes />
    </div> 
  );
}

export default App;
