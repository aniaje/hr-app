import { useEffect, RefObject, useState } from "react";
import {IJob, ICandidate } from 'types'

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
  const [favorites, setFavorites] = useState<number[]>(JSON.parse(localStorage.getItem(type) || "[]"));


  const update = (data: number[]) => {
    setFavorites(data)
    localStorage.setItem(type, JSON.stringify(data));
  };

  return { update, favorites };
};
