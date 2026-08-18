import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MemberList } from "./pages/MemberList";
import { AddMember } from "./pages/AddMember";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <Router>
      <nav className="bg-slate-900 text-white py-4 mb-8">
        <div className="container mx-auto flex gap-4 items-center">
          <h1 className="text-xl font-bold mr-8">ArxcessOne Member Registry</h1>
          <Link to="/"><Button variant="ghost" className="text-white">Members</Button></Link>
          <Link to="/add"><Button variant="ghost" className="text-white">Add Member</Button></Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<MemberList />} />
        <Route path="/add" element={<AddMember />} />
      </Routes>
    </Router>
  );
}

export default App;