import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";
import { deleteUser } from "../../actions/user.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();
  let message = "";
  let deleteQuote;

  if (props.action) {
    if (props.action === "deleteUser") {
      message = "Supprimer ce compte ?";
      deleteQuote = () => dispatch(deleteUser(props.id));
    } else if (props.action === "deletePost") {
      deleteQuote = () => dispatch(deletePost(props.id));
      message = "Supprimer se poste ?";
    }
  }

  return (
    <div
      onClick={() => {
        if (window.confirm(message)) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="delete-profil" />
    </div>
  );
};

export default DeleteCard;
