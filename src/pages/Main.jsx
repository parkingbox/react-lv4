import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { __getTodos } from "../redux/modules/todoSlice";

function Main() {
  const { todos, isLoading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);
  if(isLoading) {
    
  }
  return (
    <div>
      <header>헤더입니다</header>
      <Link to="/write">글작성</Link>
      <h1>할일</h1>
      <div>
        {todos.map((todo) => {
          return !todo.isDone && <Card todo={todo} key={todo.id}></Card>;
        })}
      </div>
      <h1>완료한 일</h1>
      <div>
        {todos.map((todo) => {
          return todo.isDone && <Card todo={todo} key={todo.id}></Card>;
        })}
      </div>
    </div>
  );
}

export default Main;
