import React, { useState, useEffect } from "react";
import apiUrl from "../api/apiConfig";

const UserTableEx = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const storedYear = JSON.parse(localStorage.getItem("selectedYear"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const ownerDepartment = userData?.department || ""; // เพิ่มเพื่อดึง department ของเจ้าของจาก localStorage

  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (Array.isArray(data.users)) {
          const usersWithStatus = await Promise.all(
            data.users.map(async (user) => {
              const statusResponse = await fetch(
                `${apiUrl}/user/getStatus/${user.user_id}/${storedYear}`
              );
              if (!statusResponse.ok) {
                throw new Error("Failed to fetch status");
              }
              const statusData = await statusResponse.json();
              return { ...user, status: statusData };
            })
          );
          setUsers(usersWithStatus);
        } else {
          throw new Error("Data is not an array");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [storedYear]);

  const getStatusClass = (status) => {
    switch (status) {
      case "enrolled":
        return "waiting";
      case "pass":
        return "finish";
      default:
        return "failed";
    }
  };

  const renderTableData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users
      .filter(
        (user) =>
          user.role !== "admin" &&
          user.department === ownerDepartment &&
          (selectedBranch === "" || user.branch === selectedBranch)
      )
      .slice(indexOfFirstItem, indexOfLastItem);

    return currentItems.map((user, index) => (
      <tr key={index}>
        <td>{user.user_id}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.department}</td>
        <td>{user.branch}</td>
        <td>
          <span className={`status ${getStatusClass(user.status)}`}>
            {user.status}
          </span>
        </td>
      </tr>
    ));
  };

  const totalPages = Math.ceil(
    users.filter(
      (user) =>
        user.role !== "admin" &&
        user.department === ownerDepartment &&
        (selectedBranch === "" || user.branch === selectedBranch)
    ).length / itemsPerPage
  );

  const handleBranchChange = (evt) => {
    setSelectedBranch(evt.target.value);
    setCurrentPage(1); // Reset to first page when branch changes
  };

  const filteredBranches = users
    .filter((user) => user.department === ownerDepartment)
    .map((user) => user.branch)
    .filter((branch, index, self) => self.indexOf(branch) === index);

  return (
    <div className="container" style={{ overflowX: "auto" }}>
      <div className="row">
        <div className="col">
          <h2>User Table</h2>
          <div className="col-auto d-flex align-items-center">
            <>
              <select
                id="branchFilter"
                className="form-select me-2"
                value={selectedBranch}
                onChange={handleBranchChange}
                style={{ width: "130px" }}
              >
                <option value="">All Branch</option>
                {filteredBranches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Branch</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : (
                renderTableData()
              )}
            </tbody>
          </table>

          <div>
            <button
              className={`btn previous-btn ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo; Previous
            </button>
            <span className="btn pagination-span">
              {" "}
              {currentPage} of {totalPages}{" "}
            </span>
            <button
              className={`next-btn ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTableEx;
