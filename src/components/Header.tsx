import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-primary">Redington</span>
            <span className="text-xs text-muted-foreground">RiskSense Platform</span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Overview
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
