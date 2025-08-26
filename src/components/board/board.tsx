import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./dragabble-card";
import { BoardTitle, BoardWrapper } from "../../styles/board-styled";

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "red" : "blue"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

// interface
interface IBoardProps {
  todos: string[];
  boardId: string;
}

const Board = ({ todos, boardId }: IBoardProps) => {
  return (
    <>
      <BoardWrapper>
        <BoardTitle>{boardId}</BoardTitle>
        <Droppable droppableId={boardId}>
          {(provided, snapshot) => (
            <Area
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos?.map((todo, index) => (
                <DragabbleCard key={todo} index={index} todo={todo} />
              ))}
              {provided.placeholder}
            </Area>
          )}
        </Droppable>
      </BoardWrapper>
    </>
  );
};

export default Board;
