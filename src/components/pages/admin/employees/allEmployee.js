import React, { useCallback, useState } from "react";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect } from "react";
import { allEmployee, deleteEmployee } from "../../../services/employee";
import { rowsPerPageJsonData } from "../../../../utils/JsonData";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import ConfirmDialog from "../../../shared/Components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../shared/routing";
import { toast } from "react-hot-toast";
import Spinner from "../../../layout/spinner";
import DialogForm from "../../../shared/Components/DialogForm";
import { getSalaryData } from "../../../services/Employee/salary";

const AllEmployees = () => {
  const navigate = useNavigate();

  // set data in data grid
  const [employeeDataGrid, setEmployeeDataGrid] = useState({
    loading: false,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50, 100],
    pageSize: 10,
    page: 1,
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [searchFilters, setSearchFilters] = useState({
    searchText: "",
  });

  const handleEmployeeSearch = (event) => {
    const { value } = event.target;
    if (value.length > 1) {
      setSearchFilters((prev) => ({
        ...prev,
        searchText: value,
      }));
    } else if (value.length == 0) {
      setSearchFilters((prev) => ({
        ...prev,
        searchText: value,
      }));
    }
  };

  const [deleteAddOnId, setDeleteAddOnId] = useState(0);
  // delate
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
  const handleConfirmDeletection = async () => {
    setLoading(true);
    setOpenDeleteDialog(false);
    const result = await deleteEmployee(deleteAddOnId);
    if (result?.status === 200) {
      setLoading(false);
      toast.success(result.message);
      getAllEmployee();
    } else if (result === undefined) {
      setLoading(false);
      toast.error(result.message);
    } else {
      setLoading(false);
      toast.error(result.message);
    }
  };

  // dialog click
  const deleteDialog = useCallback(
    (id) => () => {
      setDeleteAddOnId(id);
      setOpenDeleteDialog(true);
    },
    []
  );

  const salaryDialog = useCallback(
    (id) => () => {
      setDeleteAddOnId(id);
      setOpenSalaryDialog(true);
    },
    []
  );

  const editEmployee = useCallback(
    (id) => () => {
      navigate(`/admin/employees/edit/${id}`);
    },
    []
  );

  const viewAttendence = useCallback(
    (id) => () => {
      navigate(`/admin/attendance/employee/${id}`);
    },
    []
  );

  // get employee data
  const updateEmployeeDataGrid = (k, v) => {
    setEmployeeDataGrid((prev) => ({ ...prev, [k]: v }));
  };

  const getAllEmployee = useCallback(async () => {
    updateEmployeeDataGrid("loading", true);
    const result = await allEmployee({
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      search_text: searchFilters.searchText,
    });
    if (result?.status === 200) {
      updateEmployeeDataGrid("rows", result.data);
      updateEmployeeDataGrid("totalRows", result.pagination.total_items);
      updateEmployeeDataGrid("loading", false);
    } else {
      updateEmployeeDataGrid("rows", []);
      updateEmployeeDataGrid("totalRows", 0);
      updateEmployeeDataGrid("loading", false);
    }
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    searchFilters.searchText,
  ]);

  useEffect(() => {
    getAllEmployee();
  }, [getAllEmployee]);

  // salary
  const [openSalaryDialog, setOpenSalaryDialog] = useState(false);
  const [selectedData, setSelectedData] = useState({
    month: "",
    year: ""
  });
  const handleCloseSalaryDialog = () => {
    setOpenSalaryDialog(false);
    setSalaryData()
    setSelectedData({
      month: "",
      year: ""
    })
  }
  const [salaryData, setSalaryData] = useState()
  const GetSalary = async () => {
    setLoading(true)
    const body = {
      employeeId: deleteAddOnId,
      month: selectedData.month,
      year: selectedData.year
    }

    const result = await getSalaryData(body)
    if (result.status === 200) {
      setSalaryData(result.data)
      setLoading(false)
    } else {
      setSalaryData()
      setLoading(false)
    }
  }

  // datagrid
  const employeeDatagridColumns = [
    {
      field: "avatar",
      headerName: "image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <img
          src={params?.value}
          style={{
            width: "45px",
            height: "45px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "user_id",
      headerName: "User Id",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "first_name",
      headerName: "Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    // { field: "Department", headerName: "Department", flex: 1 ,align: 'center', headerAlign: 'center'},
    {
      field: "designation",
      headerName: "Department",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "education",
      headerName: "Degree",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "join_date",
      headerName: "Joining Date",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      align: "center",
      getActions: (params) => [
        <GridActionsCellItem
          label={"Edit"}
          showInMenu
          onClick={editEmployee(params.id)}
        />,
        <GridActionsCellItem
          label={"Delete"}
          showInMenu
          onClick={deleteDialog(params.id)}
        />,
        <GridActionsCellItem
          label={"Attendence"}
          showInMenu
          onClick={viewAttendence(params.id)}
        />,
        <GridActionsCellItem
          label={"Salary"}
          showInMenu
          onClick={salaryDialog(params.id)}
        />,
      ],
      align: "center",
    },
  ];

  return (
    <div>
      {loading && <Spinner />}
      <Box>
        <Breadcrumb
          title="Add Employee"
          sub_page="Employee"
          curent_page="Add Employee"
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          minHeight: "50px",
          position: "relative",
          borderRadius: "10px",
          marginBottom: "24px",
          boxShadow: "0 0 10px 0 rgba(183,192,206,.2)",
        }}
      >
        <Box>
          <Box
            sx={{
              backgroundColor: "#dae1f3",
              height: "60px",
              px: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography sx={{ fontWeight: "600", color: "#5b626b" }}>
                Employees
              </Typography>
              <TextField
                size="small"
                onChange={(event) => {
                  handleEmployeeSearch(event);
                }}
                variant="outlined"
                placeholder="search"
                sx={{
                  backgroundColor: "#fff",
                  height: "45px",
                  fontSize: "14px",
                  borderRadius: "4px",
                }}
                InputProps={{
                  sx: {
                    border: "none",
                    height: "45px",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <IconButton
                onClick={() => navigate(Routing.AddEmployees)}
                aria-label="delete"
                size="medium"
                sx={{
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  boxShadow:
                    "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    boxShadow:
                      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
                  },
                }}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                onClick={() => getAllEmployee()}
                aria-label="delete"
                size="medium"
                sx={{
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  boxShadow:
                    "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    boxShadow:
                      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
                  },
                }}
              >
                <RefreshIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ p: "20px" }}>
            <DataGrid
              sx={{
                border: "0",
                fontSize: "14px",
                "& .MuiDataGrid-columnHeader": {
                  color: "#000",
                  fontSize: "14px ",
                  minHeight: "49px !important",
                  fontWeight: "bold !important",
                },
                "& .MuiDataGrid-columnHeaders": {
                  maxHeight: "59px !important",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "0",
                },
              }}
              density="compact"
              // autoHeight
              disableColumnMenu
              rowHeight={85}
              enableCellSelect={true}
              getRowId={(row) => row._id}
              pageSizeOptions={[5, 10, 20]}
              rowCount={employeeDataGrid.totalRows}
              loading={employeeDataGrid.loading}
              rows={employeeDataGrid.rows}
              columns={employeeDatagridColumns}
              paginationModel={paginationModel}
              paginationMode="server"
              checkboxSelection={true}
              onPaginationModelChange={(newPage) => {
                setPaginationModel({
                  page: newPage.page,
                  pageSize: newPage.pageSize,
                });
              }}
            />
          </Box>
        </Box>
        <ConfirmDialog
          scroll="paper"
          maxWidth="sm"
          title="Confirm The Action"
          message="Do you really want to delete the Add-On data?"
          cancelButtonText="Cancel"
          confirmButtonText="Delete"
          openDialog={openDeleteDialog}
          handleDialogClose={handleCloseDeleteDialog}
          handleDialogAction={handleConfirmDeletection}
        />
      </Box>
      <Box className="employeelistpopup">
        <DialogForm
          scroll="paper"
          maxWidth="sm"
          className={"employeelistpopup"}
          title="Salary Detail"
          openDialog={openSalaryDialog}
          handleDialogClose={handleCloseSalaryDialog}
          bodyContent={
            <Box sx={{ minHeight: "100%" }}>
              <Grid container spacing={2} padding="20px" alignItems="center">
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Year
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Year"
                      placeholder="Select Year"
                      onChange={(e) => setSelectedData({ ...selectedData, year: e.target.value })}
                      value={selectedData.year}
                    >
                      <MenuItem value={"2022"}>2022</MenuItem>
                      <MenuItem value={"2023"}>2023</MenuItem>
                      <MenuItem value={"2024"}>2024</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select month
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Month"
                      placeholder="Select Month"
                      onChange={(e) => setSelectedData({ ...selectedData, month: e.target.value })}
                      value={selectedData.month}
                    >
                      {[...Array(12)].map((items, index) => (
                        <MenuItem value={index + 1}>{index + 1}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={GetSalary}
                    variant="contained"
                    sx={{
                      height: "70%",
                      width: "100%",
                      backgroundColor: "#3f51b5",
                      textTransform: "capitalize",
                    }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
              <Divider />
              {
                salaryData &&
                <>
                  <Grid container spacing={2} padding="20px" alignItems="center">
                    <Grid item xs={12}>
                      <Typography fontSize={14}>Count Only 27 Days in month</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize={16} fontWeight={600}>Name</Typography>
                      <Typography fontSize={14} fontWeight={400}>{salaryData.employee.first_name + " " + salaryData.employee.last_name} </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize={16} fontWeight={600}>Mobile Number</Typography>
                      <Typography fontSize={14} fontWeight={400}>{salaryData.employee.mobile}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize={16} fontWeight={600}>Designation</Typography>
                      <Typography fontSize={14} fontWeight={400}>{salaryData.employee.designation}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize={16} fontWeight={600}>salary</Typography>
                      <Typography fontSize={14} fontWeight={400}>{salaryData.employee.salary}</Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={2} padding="20px" alignItems="center">
                    <Grid item xs={6}>
                      <Typography fontSize={16} fontWeight={600}>Month</Typography>
                      <Typography fontSize={14} fontWeight={400}>{salaryData.month}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize={16} fontWeight={600}>Year</Typography>
                      <Typography fontSize={14} fontWeight={400}>{salaryData.year}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize={16} fontWeight={600}>Monthly salary</Typography>
                      <Typography fontSize={14} color={"blue"} fontWeight={400}>{salaryData.monthly_salary}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize={16} fontWeight={600}>Totale Present day</Typography>
                      <Typography fontSize={14} color={"green"} fontWeight={400}>{salaryData.present_days}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize={16} fontWeight={600}>Totale Absent day</Typography>
                      <Typography fontSize={14} color={"red"} fontWeight={400}>{salaryData.absent_days}</Typography>
                    </Grid>
                  </Grid>
                </>
              }
            </Box>
          }
        />
      </Box>
    </div>
  );
};

export default AllEmployees;
