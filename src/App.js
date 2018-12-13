import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, setProfile } from './redux/actions';
import './App.css';
import UserProfile from './components/UserProfile';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profile,
    };
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.isFetching && !this.props.profile.isFetching) {
      this.setState({ profile: this.props.profile });
    }
  }

  handleChange = (value, to) => {
    this.setState(prevState => ({
      profile: { ...prevState.profile, [to]: value },
    }));
  };

  handleSubmit = () => {
    this.props.setProfile(this.state.profile);
  };

  render() {
    const { profile } = this.state;
    return (
      <div className="container-fluid">
        <div className="greet">
          <h1>Welcome !</h1>
          <img alt="Welcome!" src={require('./assets/image.svg')} className="image" />
        </div>
        <UserProfile
          profile={profile}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { fetchProfile, setProfile },
)(App);
