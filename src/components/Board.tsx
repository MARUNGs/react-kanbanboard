import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

// styled
const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 30px;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 200px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

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
      <Wrapper>
        <Title>{boardId}</Title>
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
      </Wrapper>
    </>
  );
};

export default Board;
