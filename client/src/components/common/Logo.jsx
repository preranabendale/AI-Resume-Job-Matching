const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
        AI
      </div>

      <div>
        <h1 className="font-bold text-xl text-slate-900">
          ResumeAI
        </h1>

        <p className="text-xs text-slate-500">
          Job Matcher
        </p>
      </div>
    </div>
  );
};

export default Logo;