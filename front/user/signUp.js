import React, { useState } from 'react';
import axios from 'axios';
import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';

const Signup = () => {
  return (
    <AuthTemplate>
      <AuthForm type="signup" />
    </AuthTemplate>
  )
}

export default Signup;