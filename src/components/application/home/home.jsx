import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <>
      <h4>
        <Link to="/test">Test</Link>
      </h4>

      <h4>
        <Link to="/home">Home</Link>
      </h4>

      <h4>
        <Link to="/console">Console</Link>
      </h4>

      <h4>
        <Link to="/login">login</Link>
      </h4>
    </>
  );
};

const mapStateToProps = (state) => {
  const { account } = state;
  return { account };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps())(Home);
