import React, { Component } from "react";
import UserProfile from './UserProfile';

const apiURL = 'https://reqres.in/api/users';
const concat = (...args) => {
  return args.reduce((acc, val) => [...acc, ...val]);
};

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ],
      isLoading : false,
      page: 1,
      totalPage: null,
      isDeleted: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    let query = `?page=${this.state.page}&per_page=10`;
    fetch(apiURL+query)
      .then(response => response.json())
      .then(data => {
        let combinedData = this.state.users.concat(data.data); // Point 2 covered till here
        combinedData = combinedData.filter((data, index, self) => // Point 3 covered here
          index === self.findIndex((t) => (
            t.id === data.id && t.first_name === data.first_name && t.last_name === data.last_name
          ))
        );
        this.setState({ users: combinedData, isLoading: false, totalPage: data.total_pages }); // new users from API added at the end of existing data & duplicates are removed
      }).catch(error => {
        console.log(apiURL + ' error: ', error);
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.page !== nextState.page || this.state.users.length !== nextState.users.length;
  }

  componentDidUpdate() {
    if (!this.state.isDeleted) {
      let query = `?page=${this.state.page}&per_page=10`;
      fetch(apiURL+query)
        .then(response => response.json())
        .then(data => {
          let combinedData = this.state.users.concat(data.data); // Point 2 covered till here
          combinedData = combinedData.filter((data, index, self) => // Point 3 covered here
            index === self.findIndex((t) => (
              t.id === data.id && t.first_name === data.first_name && t.last_name === data.last_name
            ))
          );
          this.setState({ users: combinedData }); // new users from API added at the end of existing data & duplicates are removed
        }).catch(error => {
          console.log(apiURL + ' error: ', error);
        });
    }    
  }

  myCallback = (idToDelete) => {
    this.setState({ isDeleted: true }, () => {
      const updatedData = this.state.users.filter(user => user.id !== idToDelete);
      this.setState({ users: updatedData });
    });    
  }

  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return <p style={{ fontSize: '20px' }}>Loading ...</p>;
    }

    return (
      <div className="pearon-users">
        <h1>Pearson User Management</h1>
        <ul>
        {
          users.map((user, index) =>
            <li key={index}>
              <UserProfile
                first_name={user.first_name}
                last_name={user.last_name}
                avatar={user.avatar}
                id={user.id}
                callbackFromParent={this.myCallback}
              />
            </li>  
          )
        }
        </ul>
        {
          this.state.page < this.state.totalPage ?
            <button
              onClick={
                () => this.setState({ isDeleted: false, page: this.state.page + 1 })
              }
              className="loading-button"
            >
              Load More
            </button> : null
        }        
      </div>
    );
  }
}
