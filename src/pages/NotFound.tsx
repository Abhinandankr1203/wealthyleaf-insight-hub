import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm text-white max-w-md w-full mx-4">
        <CardHeader className="text-center">
          <img src="/logo.svg" alt="Wealthyleaf Logo" style={{ width: 48, height: 48, margin: '0 auto 8px auto' }} />
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-xl font-bold">Page Not Found</CardTitle>
          <CardDescription className="text-slate-300" role="alert">
            The page you're looking for doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-slate-400">
            You might have typed the wrong address or the page may have moved.
          </p>
          <div className="flex flex-col space-y-2">
            <Link to="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400" aria-label="Go to Home">
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full border-slate-600 text-white hover:bg-slate-700 focus:ring-2 focus:ring-blue-400"
              aria-label="Go Back"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
