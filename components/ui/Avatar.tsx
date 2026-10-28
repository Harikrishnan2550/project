import React from "react";
import Image from "next/image";
import { cn, getInitials } from "@/lib/utils";

export interface AvatarProps {
  name: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
  status?: "online" | "away" | "offline";
  className?: string;
}

export function Avatar({
  name,
  src,
  size = "md",
  showStatus = false,
  status = "online",
  className,
}: AvatarProps) {
  const sizeStyles = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-14 h-14 text-lg",
  };

  const statusSizeStyles = {
    xs: "w-1.5 h-1.5 right-0 bottom-0",
    sm: "w-2 h-2 right-0 bottom-0",
    md: "w-2.5 h-2.5 right-0.5 bottom-0.5",
    lg: "w-3 h-3 right-0.5 bottom-0.5",
    xl: "w-3.5 h-3.5 right-1 bottom-1",
  };

  const statusColors = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    offline: "bg-slate-400",
  };

  // Generate a soft deterministic gradient for initials based on the user's name
  const getGradientByName = (str: string) => {
    const gradients = [
      "from-indigo-500 to-purple-600 text-white",
      "from-blue-600 to-indigo-700 text-white",
      "from-violet-600 to-indigo-600 text-white",
      "from-slate-700 to-slate-900 text-white",
      "from-emerald-600 to-teal-700 text-white",
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  };

  return (
    <div className={cn("relative inline-block shrink-0", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-semibold overflow-hidden shadow-xs ring-1 ring-slate-200/60 select-none",
          sizeStyles[size],
          !src && `bg-gradient-to-tr ${getGradientByName(name)}`
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {showStatus && (
        <span
          className={cn(
            "absolute rounded-full ring-2 ring-white",
            statusColors[status],
            statusSizeStyles[size]
          )}
        />
      )}
    </div>
  );
}
