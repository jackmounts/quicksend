import { create } from "zustand";

type UserStoreType = {
  user: string | null;
  setUser: (user: string | null) => void;
};

type LoadingStoreType = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

const useStore = create<UserStoreType & LoadingStoreType>((set) => ({
  user: null,
  setUser: (user: string | null) => set({ user }),
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));

export default useStore;
