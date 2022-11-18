import create from "zustand";

const useDOMChange = create((set, get) => ({
  bg: 0,
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  toString: () => {
    const curStat = get().changing;
    return `${curStat}`;
  },
  action: (number) =>
    set((state, number) => ({
      bg: state.number,
    })),
}));

export default useDOMChange;
