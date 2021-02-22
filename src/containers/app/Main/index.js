import React, { Component } from "react";

import Header from "components/app/Main/Header"
import Posts from "containers/app/Posts"

// const Main = () => (
//   <div>
//     <strong>Hello</strong> World
//   </div>
// )


class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      isError: false,
    }
  }

  componentDidMount() {
    console.log("Main >> componentDidMount");

    // fetchPosts({
    //   cb: ({ isSuccess, data }) => {
    //     if (isSuccess) {
    //       if (!_.isEmpty(data)) {
    //         const ru = {}
    //         _.forEach(data, (error) => {
    //           ru[error.code] = error.translation.ru
    //         })
    //         i18next.addResourceBundle('ru', 'serverError', ru)
    //       }

    //       this.setState({ isLoading: false })
    //     } else {
    //       this.setState({
    //         isLoading: false,
    //         isError: true,
    //       })
    //     }
    //   },
    // })
  }

  render() {
    console.log("Main >> render");

    return (
      <div>
        <Header />
        <Posts />
        <strong>Hello</strong> World
      </div>
    )
  }
};

export default Main
