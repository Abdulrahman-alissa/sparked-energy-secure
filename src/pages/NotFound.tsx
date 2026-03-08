import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Zap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background relative overflow-hidden px-4">
      
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-electric/30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-2xl opacity-15 bg-electric/20"></div>
      </div>

      <div className="relative z-10 text-center max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Zap className="w-12 h-12 text-electric animate-pulse" />
        </div>

        <h1 className="text-6xl md:text-7xl font-display font-bold text-electric mb-4">
          404
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-6">
          Oops! The page you are looking for does not exist.
        </p>

        <p className="text-sm text-muted-foreground mb-8">
          You may have mistyped the address or the page has moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-electric text-primary-foreground rounded-xl font-semibold shadow-lg hover:bg-electric/90 transition-colors duration-300"
        >
          Return to Home
          <Zap className="w-4 h-4 animate-bounce" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;