import Layout from "./components/Layout";
import KanbanBoard from "./components/KanbanBoard";

import "./App.css";

function App() {
  return (
    <div className="w-full h-full bg-gray-100">
      <Layout>
        <KanbanBoard />
      </Layout>
    </div>
  );
}

export default App;

// import "./App.css";

// function App() {
//   return (
//     <h1 className="text-3xl font-bold underline text-amber-400">
//       Hello world!
//     </h1>
//   );
// }

// export default App;
