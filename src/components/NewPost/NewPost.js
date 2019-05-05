import React, { Component } from "react";
import axios from "axios";
import classes from "./NewPost.module.css";

export class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: ""
  };

  postDataHandler = () => {
    const data = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.author
    };

    axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then(response => {
        console.log(response.data);
      });
  };

  textChangeHandler = (event, element) => {
    this.setState({
      [element]: event.target.value
    });
  };

  render() {
    return (
      <div className={classes.NewPost}>
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
