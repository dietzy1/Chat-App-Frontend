import React from "react";

import { ChatroomType } from "../types/interfaces";

//Needs to display chatserver name and icon and notifications
const Card = ({ chatroom }: { chatroom: ChatroomType }) => {
  //require that password length is at least 8 characters
  //require that password has at least three number




  return (
    <div>
      <section className="card-list">
        <article className="card">
          <header className="heading">
            <h2>Bobs chatserver</h2>
          </header>

          <div className="card-author">
            <a className="author-avatar" href="#">
              <img src="avatar.png" />
            </a>
            <svg className="half-circle" viewBox="0 0 106 57">
              <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
            </svg>

            <div className="author-name/">
              <div className="/* author-name-prefix */ text-customOrange text-2xl underline underline-offset-4">
                1
              </div>
              <div className="text-textGray">Notifications</div>
            </div>
          </div>
          <div className="tags flex flex-row flex-wrap">
            <a href="#">Gaming</a>
            <a href="#">Golang</a>
            <a href="#">Snowboarding</a>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Card;
