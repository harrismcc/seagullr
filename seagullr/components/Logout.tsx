import React from 'react';
import { Button, View, Text, Alert } from 'react-native';
import * as firebase from 'firebase';

export class Logout extends React.Component<
  {},
  { user: firebase.User | null }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    //async-ly fill the state with the current user. for logout purposes
    this.getCurrentUser().then((user) => {
      if (user != null) {
        this.setState({ user: user });
        console.log(user);
      }
    });
  }

  async getCurrentUser() {
    //Get the current firebase user from firebase.auth()
    const user = await firebase.auth().currentUser;
    return user;
  }

  render() {
    return (
      <View>
        <Button title="Sign-out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}
