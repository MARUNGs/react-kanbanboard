import { atom } from "recoil";

// 유저가 투두리스트를 직접 만들 것을 예상하여
// 타입을 key: value가 되도록 설정하였음.
interface ITodoState {
  [key: string]: string[];
}

export const todoState = atom<ITodoState>({
  key: "todo",
  default: {
    todo: ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"],
  },
});
