import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// styled
const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

// interface
interface IDragabbleCardProps {
  todo: string;
  index: number;
}

const DragabbleCard = ({ todo, index }: IDragabbleCardProps) => {
  return (
    <>
      {/* beautiful-DND를 사용할 경우, key와 draggableId는 같아야 한다. */}
      <Draggable key={todo} draggableId={todo} index={index}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {todo}
          </Card>
        )}
      </Draggable>
    </>
  );
};

//
//
//
export default React.memo(DragabbleCard);
