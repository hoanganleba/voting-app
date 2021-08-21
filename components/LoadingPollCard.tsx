export default function LoadingPollCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
      <div className="animate-pulse shadow-lg rounded p-6">
        <div className="flex-1 space-y-2 py-1">
          <div className="h-6 bg-blue-100 rounded w-3/4"></div>
          <div className="h-3 bg-blue-100 rounded w-5/12"></div>
        </div>
        <div className="my-8 h-8 bg-blue-100 rounded w-full"></div>
        <div className="flex justify-center">
          <div className="h-72 w-72 bg-blue-100 rounded-full p-6"></div>
        </div>
      </div>
      <div className="animate-pulse shadow-lg rounded p-6">
        <div className="flex-1 space-y-2 py-1">
          <div className="h-6 bg-blue-100 rounded w-3/4"></div>
          <div className="h-3 bg-blue-100 rounded w-5/12"></div>
        </div>
        <div className="my-8 h-8 bg-blue-100 rounded w-full"></div>
        <div className="flex justify-center">
          <div className="h-72 w-72 bg-blue-100 rounded-full p-6"></div>
        </div>
      </div>
      <div className="animate-pulse shadow-lg rounded p-6">
        <div className="flex-1 space-y-2 py-1">
          <div className="h-6 bg-blue-100 rounded w-3/4"></div>
          <div className="h-3 bg-blue-100 rounded w-5/12"></div>
        </div>
        <div className="my-8 h-8 bg-blue-100 rounded w-full"></div>
        <div className="flex justify-center">
          <div className="h-72 w-72 bg-blue-100 rounded-full p-6"></div>
        </div>
      </div>
    </div>
  );
}
