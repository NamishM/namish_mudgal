import React, { Component } from "react";
import UserProfile from './UserProfile';

const apiURL = 'https://reqres.in/api/users?page=1&per_page=10';
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
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        let combinedData = this.state.users.concat(data.data); // Point 2 covered till here
        combinedData = combinedData.filter((data, index, self) => // Point 3 covered here
          index === self.findIndex((t) => (
            t.id === data.id && t.first_name === data.first_name && t.last_name === data.last_name
          ))
        );
        this.setState({ users: combinedData, isLoading: false }); // new users from API added at the end of existing data & duplicates are removed
      });
  }

  myCallback = (idToDelete) => {
    const updatedData = this.state.users.filter(user => user.id !== idToDelete);
    this.setState({ users: updatedData });
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
      </div>
    );
  }
}
