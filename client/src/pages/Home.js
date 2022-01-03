import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Log from "../components/Log";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <>
      <div className="img-container-home">
        <img src="./img/icon-left-font-monochrome-black.svg" alt="img-log" />
      </div>
      <div className="home">

      {uid &&<LeftNav />  }
      {!uid && <div></div>  }
        <div className="main">
          <div className="home-header">
            {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
          </div>
          {uid && <Thread />}
        </div>
      </div>
    </>
  );
};

export default Home;
