const PageWrapper = ({ children }) => {
  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {children}
    </div>
  );
};

export default PageWrapper;
