
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-advice-600 flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="text-xl font-bold text-advice-800">Advice Hub</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/submit">
            <Button variant="default" className="bg-advice-600 hover:bg-advice-700">Submit Problem</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
