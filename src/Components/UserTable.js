import React from 'react';

const UserTable = ({ userData }) => {
  return (
    <table>
      <tbody>
        {Object.entries(userData).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;