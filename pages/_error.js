import React from 'react';
import Error from 'next/error';

const CustomError = ({ statusCode }) => {
  return (
    <Error statusCode={statusCode} />)
};

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
