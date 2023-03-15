import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../hook/useInput";
import { updateTodos, __updateTodos } from "../redux/modules/todoSlice";

function Edit() {
  const { todos } = useSelector((state) => state.todos);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = todos.find((todo) => {
    return todo.id === parseInt(params.id);
  });
  const [title, titlehandler] = useInput(data.title);
  const [comment, commenthandler] = useInput(data.comment);
  const Todo = {
    id: data.id,
    title,
    comment,
    isDone: data.isDone,
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (title === "" || comment === "") {
      alert("입력");
    } else {
      dispatch(
        __updateTodos({
          id: data.id,
          data: Todo,
        })
      );
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          제목:
          <input type="text" value={title} onChange={titlehandler} />
        </label>
        <label>
          내용:
          <input type="text" value={comment} onChange={commenthandler} />
        </label>
        <button>수정</button>
      </form>
      <Link to="/">홈</Link>
    </div>
  );
}

export default Edit;
