import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { Chart as ChartAuto } from "chart.js/auto";

function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:11230/course")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const sortedCourses = data.sort((a, b) => {
          const dateA = new Date(a.start_date);
          const dateB = new Date(b.start_date);
          return dateA - dateB;
        });
        setCourses(sortedCourses);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    const existingChart = ChartAuto.getChart(ctx); // เปลี่ยนจาก Chart เป็น ChartAuto ทั้งสองที่เกี่ยวข้อง
    if (existingChart) {
      existingChart.destroy();
    }
    new ChartAuto(ctx, {
      // เปลี่ยนจาก Chart เป็น ChartAuto
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: "linear",
            beginAtZero: true,
          },
        },
      },
    });
  }, [courses]);

  return (
    <Main>
      <canvas id="myChart"></canvas>
    </Main>
  );
}

export default Dashboard;
