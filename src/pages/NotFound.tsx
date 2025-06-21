import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm text-white max-w-md w-full mx-4">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription className="text-slate-300">
            The page you're looking for doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-slate-400">
            You might have typed the wrong address or the page may have moved.
          </p>
          <div className="flex flex-col space-y-2">
            <Link to="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full border-slate-600 text-white hover:bg-slate-700"
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
