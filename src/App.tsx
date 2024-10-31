import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import DragabbleCard from "./components/DragabbleCard";

const App = () => {
  const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `;

  const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  `;

  const Board = styled.div`
    background-color: ${(props) => props.theme.boardColor};
    padding-top: 30px;
    padding: 20px 10px;
    border-radius: 5px;
    min-height: 200px;
  `;

  const [todos, setTodos] = useRecoilState(todoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    /* 
      args = {
        destination -> 어떤 요소에게 드랍했는지에 대한 드랍대상의 정보
        draggableId -> 현재 드래그한 요소의 고유 ID
        source -> 어떤 요소를 드랍 시작하려 했는지에 대한 드랍대상의 정보
      }
    */

    // 유저가 같은 index에 요소를 그대로 둘 수도 있으므로 분기처리로 해결하자
    if (!destination) return;

    setTodos((oldTodos) => {
      // todos는 직접 수정하면 불변성 규칙에 어긋나므로 복사하여 사용하자
      const copyTodos = [...oldTodos];
      // step 1. find source.index and pop tempData
      copyTodos.splice(source.index, 1);
      // step 2. find destination.index and push tempData
      copyTodos.splice(destination?.index, 0, draggableId);
      return copyTodos;
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(provided) => (
                <Board ref={provided.innerRef} {...provided.droppableProps}>
                  {todos?.map((todo, index) => (
                    <DragabbleCard key={todo} index={index} todo={todo} />
                  ))}
                  {provided.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
};

export default App;
