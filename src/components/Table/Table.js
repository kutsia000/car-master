import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Select from 'react-select';

const Table = ({ headers, data }) => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(parseInt(queryParams.get('pageSize')) || 10);
  const [totalCount, setTotalCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState(null);

  const handleEditChange = (rowId, columnKey, value) => {
    // Handle edit change
  };

  const handleEdit = (rowId) => {
    setIsEditing(true);
    setEditedRow(rowId);
  };

  const handleSave = (rowId) => {
    setIsEditing(false);
    setEditedRow(null);
    // Save the edited data
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRow(null);
  };

  const handleRoleChange = (rowId, selectedOption) => {
    // Handle role selection change
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1);
  };

  useEffect(() => {
    // Simulating an API call to fetch data
    const fetchData = async () => {
      // Replace with your actual API call to fetch data
      // Simulating the filtering on the backend based on the query parameters
      const filtered = data.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(queryParams.get('filter').toLowerCase())
        )
      );
      const totalCount = filtered.length;

      // Paginate the filtered data
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedData = filtered.slice(start, end);

      setFilteredData(paginatedData);
      setTotalCount(totalCount);
    };

    fetchData();
  }, [data, page, pageSize, queryParams]);

  useEffect(() => {
    // Update the URL query parameters when page or pageSize change
    queryParams.set('page', page);
    queryParams.set('pageSize', pageSize);
    history.replace({ search: queryParams.toString() });
  }, [page, pageSize, history, queryParams]);

  const renderTableHeaders = () => {
    return (
      <tr>
        {headers.map((header) => (
          <th key={header.key}>
            {header.label}
            <input type="text" onChange={(e) => handleFilterChange(header.key, e.target.value)} />
          </th>
        ))}
        <th>Actions</th>
      </tr>
    );
  };

  const renderTableRows = () => {
    return filteredData.map((row) => (
      <tr key={row.id}>
        {headers.map((header) => (
          <td key={header.key}>
            {isEditing && editedRow === row.id ? (
              <input
                type="text"
                value={row[header.key]}
                onChange={(e) => handleEditChange(row.id, header.key, e.target.value)}
                onFocus={() => handleEdit(row.id)}
                onBlur={handleCancel}
              />
            ) : (
              row[header.key]
            )}
          </td>
        ))}
        <td>
          {isEditing && editedRow === row.id ? (
            <Select
              options={[
                { value: 'Admin', label: 'Admin' },
                { value: 'User', label: 'User' },
              ]}
              value={row.role}
              onChange={(selectedOption) => handleRoleChange(row.id, selectedOption)}
            />
          ) : (
            row.role
          )}
        </td>
        <td>
          {isEditing && editedRow === row.id ? (
            <>
              <button onClick={() => handleSave(row.id)}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={() => handleEdit(row.id)}>Edit</button>
          )}
        </td>
      </tr>
    ));
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const pageNumbers = [];
    const maxDisplayedPages = 6;

    if (totalPages <= maxDisplayedPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button key={i} onClick={() => handlePageChange(i)} disabled={page === i}>
            {i}
          </button>
        );
      }
    } else {
      const currentPageGroup = Math.ceil(page / maxDisplayedPages);
      const lastPageGroup = Math.ceil(totalPages / maxDisplayedPages);
      let startPage = (currentPageGroup - 1) * maxDisplayedPages + 1;
      let endPage = Math.min(currentPageGroup * maxDisplayedPages, totalPages);

      pageNumbers.push(
        <button key={1} onClick={() => handlePageChange(1)} disabled={page === 1}>
          1
        </button>
      );

      if (currentPageGroup > 1) {
        pageNumbers.push(<span key="ellipsis-start">...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button key={i} onClick={() => handlePageChange(i)} disabled={page === i}>
            {i}
          </button>
        );
      }

      if (currentPageGroup < lastPageGroup) {
        pageNumbers.push(<span key="ellipsis-end">...</span>);
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <table className="table">
        <thead>{renderTableHeaders()}</thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <div className="pagination">{renderPageNumbers()}</div>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === Math.ceil(totalCount / pageSize)}
        >
          Next
        </button>
        <select value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))}>
          <option value={10}>10 per page</option>
          <option value={15}>15 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>
    </div>
  );
};

export default Table;
