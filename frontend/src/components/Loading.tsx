import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
        <p className="mt-4 text-gray-600 text-lg font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default Loading;
