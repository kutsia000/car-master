import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SimpleTable = ({ headers, data, link, onDelete, filterFunction }) => {
  const [filter, setFilter] = useState('');
  const { t } = useTranslation();

  useEffect(() => {}, [data]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target.value;
    filterFunction({ name: name, value: value });
    setFilter(value);
  };

  const handleDelete = (id) => {
    if (window.confirm('are you sure to delete')) {
      onDelete(id);
    }
  };

  const renderTableHeaders = () => {
    return (
      <>
        {headers && headers.map((header) => <th key={header.key}>{header.label}</th>)}
        <th>Actions</th>
      </>
    );
  };

  return (
    <>
      {headers.map((header) => {
        if (header.key !== 'id' && header.key !== 'Edit' && header.key !== 'Delete') {
          return (
            <input
              key={header.label}
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder={`Filter ${header.key}`}
            />
          );
        }
        return null;
      })}
      <table>
        <thead>
          <tr>
            {renderTableHeaders()}
            <th>Edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row) => {
              return (
                <tr key={row.id}>
                  {Object.entries(row).map((key, value, index) => {
                    console.log([key, value, index]);
                    // return <td key={index}>{value}</td>;
                  })}
                  <td>
                    <a href={`${link}/${row.id}`}>Edit</a>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(row.id)}>delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default SimpleTable;
