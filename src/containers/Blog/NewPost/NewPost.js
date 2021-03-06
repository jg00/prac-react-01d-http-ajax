import React, { Component } from "react";
import axios from "axios";
import classes from "./NewPost.module.css";
// import { Redirect } from "react-router-dom";

export class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "",
    submitted: false
  };

  componentDidMount() {
    // if unauthenticated => this.props.history.replace('/posts') << This is another way to guard user from accessing this page.
    console.log("NewPost.js-componentDidMount", this.props); // this.props here is passed by react-router
  }

  postDataHandler = () => {
    const data = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.author
    };

    axios.post("/posts", data).then(response => {
      console.log(response.data);

      // One way to redirect to another page
      // To render <Redirect conditionally based on state
      // this.setState({
      //   submitted: true
      // });

      // May be all we need is to add to the history stack
      this.props.history.push("/posts");
      // this.props.history.replace("/posts");  // Works as well but you don't go back the previous page of the history stack

      alert(
        `Post request sent to /posts.
           id: ${response.data.id}
           title: ${response.data.title}`
      );
    });
  };

  textChangeHandler = (event, element) => {
    this.setState({
      [element]: event.target.value
    });
  };

  render() {
    // Alternate is to use this.props.history.push('/posts') to add to the history stack
    // let redirect = null;
    // if (this.state.submitted) {
    //   redirect = <Redirect to="/posts" />;
    // }

    return (
      <div className={classes.NewPost}>
        {/* {redirect} */}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.textChangeHandler(event, "title")}
        />
        <label>Content</label>
        <textarea
          rows="4"
          type="text"
          value={this.state.content}
          onChange={event => this.textChangeHandler(event, "content")}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.textChangeHandler(event, "author")}
        >
          <option value="Malone">Malone</option>
          <option value="Sid">Sid</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
