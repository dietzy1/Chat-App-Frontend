import React from "react";

import { ChatroomType } from "../types/interfaces";

//Needs to display chatserver name and icon and notifications
const Card = ({ chatroom }: { chatroom: ChatroomType }) => {
  //require that password length is at least 8 characters
  //require that password has at least three number
  return (
    <div>
      <section className="card-list">
        <article className="h-64 w-64 rounded-2xl flex flex-col card">
          <header className="heading">
            <h2>{chatroom.name}</h2>
          </header>

          <div className="card-author">
            <a className="author-avatar" href="#">
              <img src={chatroom.icon} />
            </a>
            <svg className="half-circle" viewBox="0 0 106 57">
              <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
            </svg>

            <div className="author-name/">
              <div className="text-textGray">Notifications</div>
            </div>
          </div>
          <div className="tags flex flex-row flex-wrap">
            <a href="#">{chatroom.tags[0]}</a>
            <a href="#">{chatroom.tags[1]}</a>
            <a href="#">{chatroom.tags[2]}</a>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Card;
