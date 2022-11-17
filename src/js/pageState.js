import create from "zustand";

const useDOMChange = create((set, get) => ({
  changing: false,
  toString: () => {
    const curStat = get().changing;
    return `${curStat}`;
  },
  action: () =>
    set((state) => ({
      changing: !state.changing,
    })),
}));

export default useDOMChange;
