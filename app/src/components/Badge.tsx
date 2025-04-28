const Badge = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`rounded-xl border-[1px] border-white px-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
