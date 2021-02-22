import React, { Component } from "react"
import { connect } from 'react-redux'
import { compose } from 'utils/funcs'
import Post from "components/app/Post"
import { fetchPosts } from '../../../redux/modules/app'
import _ from 'lodash'

// const Posts = () => (
//   <div>
//     <Post />
//     <Post />
//   </div>
// )

class Posts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      isError: false,
    }
  }

  componentDidMount() {
    console.log("Posts >> componentDidMount");

    const {
      // eslint-disable-next-line no-shadow
      fetchPosts,
    } = this.props


    fetchPosts({
      cb: ({ isSuccess, data }) => {
        if (isSuccess) {
          if (!_.isEmpty(data)) {
            // const ru = {}
            // _.forEach(data, (error) => {
            //   ru[error.code] = error.translation.ru
            // })
            // i18next.addResourceBundle('ru', 'serverError', ru)
          }

          console.log(data)
          console.log(isSuccess)

          this.setState({ isLoading: false })
        } else {
          this.setState({
            isLoading: false,
            isError: true,
          })
        }
      },
    })
  }

  render() {
    console.log("Posts >> render");

    return (
      <div>
        <Post />
      </div>
    )
  }
}

//export default Posts;

export default compose(
  connect(
    // (state) => ({
    //   ...state.auth,
    // }),
    null,
    {
      fetchPosts,
    },
  ),
  //withRouter,
  //translate('errors'),
)(Posts)

