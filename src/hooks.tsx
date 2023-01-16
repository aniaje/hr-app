import { useEffect, RefObject } from "react";

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export enum FavouriteType {
  JOBS = "JOBS",
  CANDIDATES = "CANDIDATES",
}

export const useFavorites = (type: FavouriteType) => {
  const update = (data: number[]) => {
    localStorage.setItem(type, JSON.stringify(data));
  };
  const get = (): number[] => {
    return JSON.parse(localStorage.getItem(type) || "[]");
  };
  return { update, get };
};
