import Layout from "./shared/components/Layout";
import KanbanBoard from "./feature/components/KanbanBoard";

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
