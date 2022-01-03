import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({ comment, postId }) => {
  
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment.id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => dispatch(deleteComment(postId, comment.id));

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.userId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.userId]);

  return (
    <>
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg " alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit  && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          
          <div className="btn" >
            
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
      
    </div>
    {(isAuthor  || userData.isAdmin) && (
    <span id="container-supp-com"
    onClick={() => {
      if (window.confirm("Voulez-vous supprimer se commentaire ?")) {
        handleDelete();
      }
    }}
  ><img src="./img/icons/trash.svg" alt="edit-comment" id="supprimer-commenteire" />
    
  </span>)}</>
  );
};

export default EditDeleteComment;
