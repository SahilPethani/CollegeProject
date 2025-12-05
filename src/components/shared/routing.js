export const Routing = {
  Initial: "/",
  Login: "/login",
  Setting: "/setting",

  // admin
  AdminDashboard: "/admin/dashboard",
  AllEmployees: "/admin/employees/all",
  AddEmployees: "/admin/employees/add",
  EditEmployees: "/admin/employees/edit/:id",
  Attendance: "/admin/attendance/employee/:id",
  AttendanceSheet: "/admin/attendance/attendance-sheet",
  AllHolidays: "/admin/holidays/all-holidays",
  AddHoliday: "/admin/holidays/add-holiday",
  EditHoliday: "/admin/holiday/edit/:id",
  TodayAttendance: "/admin/attendance/today-attendance",
  LeaveRequests: "/admin/leaves/leave-requests",
  AdminNotes: "/admin/notes",
  AddNotes: "/admin/note/add",
  EditNote: "/admin/note/edit/:id",
  AllProjects: "/admin/projects/allProjects",
  AddProjects: "/admin/projects/addprojects",
  ProjectDetails: "/admin/projects/projectdetails",
  EditProject: "/admin/projects/editproject/:id",

  // employee
  EmployeeDashboard: "/employee/dashboard",
  EmployeeAttendanceList: "/employee/attendance/list",
  Leave: "/employee/leave",
  AddLeave: "/employee/add-leave",
  EmployeeNotes: "/employee/notes",
  EmployeeNotesDetail: "/notes/:id",
  AllProjectsEmployee: "/employee/projects/allProjects",
};
