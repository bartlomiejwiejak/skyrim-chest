import Scene from './components/webgl';

import ContextProvider from './context/Provider';

function App() {

  return (
    <ContextProvider>
      <Scene />
    </ContextProvider>
  );
}

export default App;