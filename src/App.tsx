import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { todoState } from "./atoms";
import Board from "./components/board/board";
import { MainWrapper } from "./styles/main-styled";
import { Boards } from "./styles/board-styled";

const App = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;

    // board가 서로 다를 수 있으니 처리법도 달라짐.
    // step 1. source board와 destination board가 서로 같은지 확인
    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      // 같은 보드 영역에서 배열 재정렬
      setTodos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy, // key: value
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      setTodos((allBoards) => {
        // 이동 시작 시점
        const sourceBoard = [...allBoards[source.droppableId]];
        // 목적지 시점
        const destinationBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, draggableId);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <MainWrapper>
          <Boards>
            {Object.keys(todos)?.map((boardId) => (
              <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
            ))}
          </Boards>
        </MainWrapper>
      </DragDropContext>
    </>
  );
};

export default App;
