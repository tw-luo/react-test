import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Routes, Route } from "react-router-dom";

import $ from "jquery";
import NavBar from "./components/navBar";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import NotFound from "./errors/notFound";
import FocusTest from "./abilityTest/focus";
import MemoryTest from "./abilityTest/memory";
import ReflexTest from "./abilityTest/reflex";

class APP extends Component {
  state = {
    isLogin: false,
    username: "",
    isSuper:false,
  };

  componentDidMount() {
    $.ajax({
      url: "https://tw-luo-opulent-goldfish-w546v5j77gh56xj-8000.preview.app.github.dev/game/api/get_status/",
      type: "get",
      success: (resp) => {
        console.log(resp);
        if (resp.result === "login") {
          this.setState({
            isLogin: true,
            username: resp.username,
            isSuper:resp.is_super,
          });
        } else {
          this.setState({
            isLogin: false,
          });
        }
      },
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <NavBar isLogin={this.state.isLogin} username={this.state.username} isSuper={this.state.isSuper}/>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isLogin={this.state.isLogin}
                  username={this.state.username}
                />
              }
            ></Route>
            <Route
              path="/home"
              element={
                <Home
                  isLogin={this.state.isLogin}
                  username={this.state.username}
                />
              }
            ></Route>
            <Route path="/test">
              <Route
                path="focus"
                element={
                  <FocusTest
                    isLogin={this.state.isLogin}
                    username={this.state.username}
                  />
                }
              ></Route>
              <Route
                path="memory"
                element={
                  <MemoryTest
                    isLogin={this.state.isLogin}
                    username={this.state.username}
                  />
                }
              ></Route>
              <Route
                path="reflex"
                element={
                  <ReflexTest
                    isLogin={this.state.isLogin}
                    username={this.state.username}
                  />
                }
              ></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/404" element={<NotFound />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </React.Fragment>
    );
  }
}

export default APP;
