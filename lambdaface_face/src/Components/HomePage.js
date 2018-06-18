import React from "react";
// import Topbar from './TopBar';
import LeftNav from "./LeftNav";

class HomePage extends React.Component {
  state = {
    // user: {},
    posts: [
      {
        title: "Announcements Title",
        content: "Content Test 1",
        User: "Matt",
        updown: [55, 3],
        category: "Announcements",
        Date: Date.now,
        comments: ["hi", "ok"]
      },
      {
        title: "Announcements Title2",
        content: "Content Test 2",
        User: "Matt",
        updown: [55, 3],
        category: "Announcements",
        Date: Date.now,
        comments: ["hi", "ok"]
      },
      {
        title: "Dev Team Title2",
        content: "Content Test 3",
        User: "John",
        updown: [88, 43],
        category: "Dev Team",
        Date: Date.now,
        comments: ["red", "oak"]
      },
      {
        title: "Dev Team Title",
        content: "Content Test 4",
        User: "John",
        updown: [88, 43],
        category: "Dev Team",
        Date: Date.now,
        comments: ["red", "oak"]
      }
    ],
    postOptions: [
      "All Posts",
      "Announcements",
      "Dev Team",
      "Design Team",
      "Marketing",
      "HR",
      "Product Managers",
      "QA"
    ]
  };
  render() {
    return (
      <div>
        {/* <div className="Topbar">
            <Topbar />
          </div> */}
        <div className="LeftNav">
          <LeftNav options={this.state.postOptions} posts={this.state.posts} />
        </div>
      </div>
    );
  }
}

export default HomePage;
