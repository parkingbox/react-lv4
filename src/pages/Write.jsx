import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __addTodos } from "../redux/modules/todoSlice";
import useInput from "../hook/useInput";
import { Link } from "react-router-dom";

function Write() {
  const [title, titleHandler] = useInput("");
  const [comment, commentHandler] = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (title === "" || comment === "") {
      alert("입력");
    } else {
      dispatch(
        __addTodos({
          id: Date.now(),
          title,
          comment,
          isDone: false,
        })
      );
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>
          제목 :
          <input type="text" value={title} onChange={titleHandler} />
        </label>
        <label>
          내용 :
          <input type="text" value={comment} onChange={commentHandler} />
        </label>
        <button>추가</button>
      </form>

      <Link to="/">홈</Link>
    </div>
  );
}

export default Write;
