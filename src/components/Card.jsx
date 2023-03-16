import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { __deleteTodos, __switchTodos } from "../redux/modules/todoSlice";

function Card({ todo }) {
  const dispatch = useDispatch();
  const deleteBtn = () => {
    dispatch(__deleteTodos(todo.id));
  };

  const switchBtn = () => {
    dispatch(
      __switchTodos({
        ...todo,
        isDone: !todo.isDone,
      })
    );
  };

  return (
    <div>
      <div>
        <h4>{todo.title}</h4>
        <h4>{todo.comment}</h4>
        <button onClick={deleteBtn}>삭제</button>
        <button onClick={switchBtn}>완료</button>
        <Link to={`/edit/${todo.id}`}>수정하기</Link>
      </div>
    </div>
  );
}

export default Card;
