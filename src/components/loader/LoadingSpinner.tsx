const LoadingSpinner = () => (
  <div className="absolute top-0 left-0 right-0 h-full flex items-center justify-center bg-black dark:bg-black z-50">
  <div className="h-30 w-30 animate-spin rounded-full border-4 border-solid border-amber-400 border-t-transparent"></div>
</div>
  );

  export default LoadingSpinner;
