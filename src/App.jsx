import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Routing } from "./components/shared/routing";
import MainLayout from "./components/layout/MainLayout";
import Spinner from "./components/layout/spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./utils/PrivateRoute";
import { ThemeProvider, createTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";
const Login = lazy(() => import("./components/pages/login/Login"));
const Setting = lazy(() => import("./components/pages/Setting_page/Setting"));

// Admin
const AdminDashboard = lazy(() =>
  import("./components/pages/admin/dashboard/dashboard")
);
const AddEmployees = lazy(() =>
  import("./components/pages/admin/employees/addEmployee")
);
const AllEmployees = lazy(() =>
  import("./components/pages/admin/employees/allEmployee")
);
const EditEmployees = lazy(() =>
  import("./components/pages/admin/employees/editEmployee")
);
const EmployeeAttendance = lazy(() =>
  import("./components/pages/admin/Attendance/EmployeeAttendance")
);
const AttendanceSheet = lazy(() =>
  import("./components/pages/admin/Attendance/AttendanceSheet")
);
const TodayAttendance = lazy(() =>
  import("./components/pages/admin/Attendance/TodayAttendance")
);
const AllHolidays = lazy(() =>
  import("./components/pages/admin/Holidays/AllHolidays")
);
const AddHoliday = lazy(() =>
  import("./components/pages/admin/Holidays/AddHoliday")
);
const EditHoliday = lazy(() =>
  import("./components/pages/admin/Holidays/EditHoliday")
);
const LeaveRequests = lazy(() =>
  import("./components/pages/admin/leaveManagemant/AllLeaves")
);
const AdminNotes = lazy(() => import("./components/pages/admin/notes/Notes"));
const AddNotes = lazy(() => import("./components/pages/admin/notes/AddNotes"));
const EditNote = lazy(() => import("./components/pages/admin/notes/EditNotes"));
const AddProject = lazy(() => import("./components/pages/admin/Projects/AddProject"));
const AllProject = lazy(() => import("./components/pages/admin/Projects/AllProject"));
const EditProject = lazy(() => import("./components/pages/admin/Projects/EditProject"));
const ProjectDetails = lazy(() => import("./components/pages/admin/Projects/ProjectDetails"));


// Employee
const EmployeeDashboard = lazy(() =>
  import("./components/pages/employee/dashboard/dashboard")
);
const EmployeeAttendanceList = lazy(() =>
  import("./components/pages/employee/attendance/attendenceList")
);
const Leave = lazy(() => import("./components/pages/employee/leave/Leave"));
const AddLeave = lazy(() =>
  import("./components/pages/employee/leave/AddLeave")
);
const EmployeeNotes = lazy(() =>
  import("./components/pages/employee/notes/Notes")
);
const EmployeeNotesDetail = lazy(() =>
  import("./components/pages/employee/notes/NotesDeatail")
);
const AllProjectsEmployee = lazy(() => import("./components/pages/employee/project/projectlist"))

const App = () => {

  const routes = [
    {
      path: Routing.Initial,
      component: Login,
      isPrivateRoute: false,
    },
    {
      path: Routing.Login,
      component: Login,
      isPrivateRoute: false,
    },
    {
      path: Routing.Setting,
      component: Setting,
      isPrivateRoute: true,
    },

    // admin
    {
      path: Routing.AdminDashboard,
      component: AdminDashboard,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.AddEmployees,
      component: AddEmployees,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.AllEmployees,
      component: AllEmployees,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.EditEmployees,
      component: EditEmployees,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.Attendance,
      component: EmployeeAttendance,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.AttendanceSheet,
      component: AttendanceSheet,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.TodayAttendance,
      component: TodayAttendance,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.AllHolidays,
      component: AllHolidays,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.AddHoliday,
      component: AddHoliday,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.EditHoliday,
      component: EditHoliday,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.LeaveRequests,
      component: LeaveRequests,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.AdminNotes,
      component: AdminNotes,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.AddNotes,
      component: AddNotes,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.EditNote,
      component: EditNote,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.AllProjects,
      component: AllProject,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.AddProjects,
      component: AddProject,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.EditProject,
      component: EditProject,
      isPrivateRoute: true,
      roal: "admin",
    },
    {
      path: Routing.ProjectDetails,
      component: ProjectDetails,
      isPrivateRoute: true,
      roal: "admin",
    },
    // employee
    {
      path: Routing.EmployeeDashboard,
      component: EmployeeDashboard,
      isPrivateRoute: true,
      roal: "employee",
    },
    {
      path: Routing.EmployeeAttendanceList,
      component: EmployeeAttendanceList,
      isPrivateRoute: true,
      roal: "employee",
    },
    {
      path: Routing.Leave,
      component: Leave,
      isPrivateRoute: true,
      roal: "employee",
    },
    {
      path: Routing.AddLeave,
      component: AddLeave,
      isPrivateRoute: true,
      roal: "employee",
    },
    {
      path: Routing.EmployeeNotes,
      component: EmployeeNotes,
      isPrivateRoute: true,
      roal: "employee",
    },
    {
      path: Routing.EmployeeNotesDetail,
      component: EmployeeNotesDetail,
      isPrivateRoute: true,
      roal: "employee",
    },
    {
      path: Routing.AllProjectsEmployee,
      component: AllProjectsEmployee,
      isPrivateRoute: true,
      roal: "employee",
    },
  ];

  return (
    <>
      <ToastContainer position="top-right" />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <ThemeProvider theme={THEME}>
        <Suspense fallback={<Spinner />}>
          <Router>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    route.isPrivateRoute ? (
                      <PrivateRoute>
                        <MainLayout>
                          <route.component />
                        </MainLayout>
                      </PrivateRoute>
                    ) : (
                      <route.component />
                    )
                  }
                />
              ))}
            </Routes>
          </Router>
        </Suspense>
      </ThemeProvider>
    </>
  );
};

const THEME = createTheme({
  typography: {
    fontFamily: `'Roboto', sans- serif`,
  },
});
export default App;
