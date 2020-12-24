import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import * as firebase from 'firebase';

interface LoginState {
  email: string;
  password: string;
  error: string;
  loading: boolean;
  loginMode: boolean;
  isSignedIn: boolean;
}

export class AuthWrapperAlt extends React.Component<any, LoginState> {
  unregisterAuthObserver: firebase.Unsubscribe | undefined;

  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: 'No Error',
      loading: false,
      loginMode: true,
      isSignedIn: false
    };
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
    });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    if (this.unregisterAuthObserver != undefined) {
      this.unregisterAuthObserver();
    }
  }

  switchButtonHandler() {
    if (this.state.loginMode) {
      this.setState({ loginMode: false });
    } else {
      this.setState({ loginMode: true });
    }
  }

  getCorretButton() {
    if (this.state.loginMode) {
      //Login mode is selected, display create account button
      return (
        <View>
          <Text
            style={{ color: 'blue' }}
            onPress={() => this.switchButtonHandler()}
          >
            Create Account
          </Text>
        </View>
      );
    } else {
      //Create mode is selected, display back to login button
      return (
        <View>
          <Text
            style={{ color: 'blue' }}
            onPress={() => this.switchButtonHandler()}
          >
            Sign In
          </Text>
        </View>
      );
    }
  }

  getCorrectForm() {
    if (this.state.loginMode) {
      return <Login></Login>;
    } else {
      return <CreateAccount></CreateAccount>;
    }
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <View style={styles.authboxContainer}>
          <Text>
            Gullr
          </Text>
          <View>{this.getCorrectForm()}</View>
          {this.getCorretButton()}
        </View>
      );
    } else {
      return this.props.children;
    }
  }
}

export class CreateAccount extends React.Component<
  any,
  LoginState & { passwordCheck: string }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      loginMode: true,
      isSignedIn: false,
      passwordCheck: ''
    };
  }

  onLoginSuccess() {
    //call onLogin Callback function (if defined)
    if (this.props.onLoginSuccess() != undefined) {
      this.props.onLoginSuccess();
    }
  }

  onLoginFail(reason: any) {
    //Run this if the login fails, and display the reason
    this.setState({ error: reason.message });
  }

  onLoginPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });

    if (password == this.state.passwordCheck) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFail.bind(this));
    } else {
      this.setState({
        password: '',
        passwordCheck: '',
        error: "Passwords Don't match"
      });
    }
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text>Create Account</Text>
        <Text style={styles.errorText}>{this.state.error}</Text>
        <View>
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
            value={this.state.email}
            placeholder={'Email Address'}
          />
        </View>
        <SafeAreaView>
          <TextInput
            secureTextEntry={true}
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
            value={this.state.password}
            placeholder={'Password'}
          />
        </SafeAreaView>
        <SafeAreaView>
          <TextInput
            secureTextEntry={true}
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ passwordCheck: text });
            }}
            value={this.state.passwordCheck}
            placeholder={'Confirm Password'}
          />
        </SafeAreaView>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onLoginPress()}
          >
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class Login extends React.Component<any, LoginState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      loginMode: true,
      isSignedIn: false
    };

    this.passwordCheck = '';
  }

  onLoginSuccess() {
    //console.log("Login Success")
    this.props.onLoginSuccess();
  }

  onLoginFail(reason: any) {
    console.log('Login fail:', reason);
    this.setState({ error: reason.message });
  }

  onLoginPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text>Login</Text>
        <Text style={styles.errorText}>{this.state.error}</Text>
        <View>
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
            value={this.state.email}
            placeholder={'Email Address'}
          />
        </View>
        <SafeAreaView>
          <TextInput
            secureTextEntry={true}
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
            value={this.state.password}
            placeholder={'Password'}
          />
        </SafeAreaView>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onLoginPress()}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer : {
    width : '100%'
  },
  button: {
    margin: 2,
    backgroundColor: '#d01b77',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%'
  },
  buttonText: {
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  inputBox: {
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    borderWidth: 2,
    width : '100%',
    borderColor: 'black',
    borderRadius: 10,
    margin: 5,
    backgroundColor : 'white'
  },
  errorText : {
    width : '75%',
    color : 'red'
  },
  authboxContainer : {
    width : '80%',
    maxWidth : '400px',
    backgroundColor : "#f3f3f3",
    padding : 10,
    borderRadius : 10
  }
});
