import React from 'react';
import Error from 'next/error';

function ProposalUpdateError({ statusCode }) {
  return (
    <div>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
      <Error statusCode={statusCode} />
    </div>
  );
}

ProposalUpdateError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ProposalUpdateError;
