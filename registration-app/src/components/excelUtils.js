import * as XLSX from "xlsx";

export const exportToExcel = (data, isPublishStatus) => {
  const dataToExport = data.map((course) => ({
    "Course Name": course.course_detail_name,
    Description: course.train_detail,
    "Start Date": formatDate(course.start_date),
    "End Date": formatDate(course.finish_date),
    Place: course.train_place,
    "Course Type": course.course_id === 1 ? "Basic" : "Retreat",
    "Publish Status": isPublishStatus[course.train_course_id]
      ? "Published"
      : "Not Published",
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");

  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const fileName = "courses.xlsx";
  const file = new Blob([wbout], { type: "application/octet-stream" });
  const url = URL.createObjectURL(file);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 0);
};

export const exportEnrollToExcel = (dataToExport) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");

  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const fileName = "enroll.xlsx";
  const file = new Blob([wbout], { type: "application/octet-stream" });
  const url = URL.createObjectURL(file);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 0);
};


const formatDate = (date) => {
  const thaiYear = (new Date(date).getFullYear() + 543).toString(); // Get the last two digits of the Buddhist Era year
  return new Date(date).toLocaleDateString("en-GB").replace(new Date(date).getFullYear(), thaiYear);
};