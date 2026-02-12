type UserStatusBadgeProps = {
  isPremium: boolean;
};

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({
  isPremium,
}) => {
  const badgeBaseClass =
    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold";

  const badgeToneClass = isPremium
    ? "bg-amber-100 text-amber-800"
    : "bg-green-100 text-black";

  const statusLabel = isPremium ? "Premium user" : "Free user";

  return (
    <p className={`${badgeBaseClass} ${badgeToneClass}`}>
      {isPremium && <span aria-hidden="true">{"\u2605"}</span>}
      {statusLabel}
    </p>
  );
};
