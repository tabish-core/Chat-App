const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200/40 p-16 border-l border-base-200/30">
      <div className="max-w-xs text-center space-y-8">
        {/* Geometric grid decoration */}
        <div className="grid grid-cols-3 gap-2.5 mx-auto w-fit">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`size-12 rounded-2xl transition-all duration-300 ${i === 4
                  ? "bg-base-content/10 scale-110"
                  : i % 2 === 0
                    ? "bg-base-content/[0.06]"
                    : "bg-base-content/[0.03]"
                }`}
            />
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-base-content tracking-tight">{title}</h2>
          <p className="text-sm text-base-content/40 leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;