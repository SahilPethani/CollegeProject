import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import Breadcrumb from '../../../shared/Components/Breadcrumb'
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getAdminAllleaveData, updateLeaveStatus } from '../../../services/AdminLeaves';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import DialogForm from '../../../shared/Components/DialogForm';
import FormikSelect from '../../../shared/material-ui-formik/FormikSelect';
import { Field, Formik } from 'formik';
import Spinner from '../../../layout/spinner';
import toast from 'react-hot-toast';
import { deleteLeaveData } from '../../../services/Employee/Leave';
import ConfirmDialog from '../../../shared/Components/ConfirmDialog';

const AllLeaves = () => {
    const [adminLeaveDataGrid, setAdminLeaveDataGrid] = useState({
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

    const [loading, setLoading] = useState(false);
    const [openStatusDialog, setOpenStatusDialog] = useState(false);
    const [selectdLeave, setSelectedLeave] = useState('');
    const handleDialogOutClose = () => setOpenStatusDialog(false);

    const handleAdminLeaveSearch = (event) => {
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

    const updateAdminLeaveDataGrid = (k, v) => {
        setAdminLeaveDataGrid((prev) => ({ ...prev, [k]: v }));
    };

    const getAllEmployee = useCallback(async () => {
        updateAdminLeaveDataGrid("loading", true);
        const result = await getAdminAllleaveData({
            page: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
            search_text: searchFilters.searchText,
        });
        if (result?.status === 200) {
            updateAdminLeaveDataGrid("rows", result.data.reverse());
            updateAdminLeaveDataGrid("totalRows", result.pagination.total_items);
            updateAdminLeaveDataGrid("loading", false);
        } else {
            updateAdminLeaveDataGrid("rows", []);
            updateAdminLeaveDataGrid("totalRows", 0);
            updateAdminLeaveDataGrid("loading", false);
        }
    }, [
        paginationModel.page,
        paginationModel.pageSize,
        searchFilters.searchText,
    ]);

    useEffect(() => {
        getAllEmployee();
    }, [getAllEmployee]);

    const updateStatus = useCallback(
        (id) => () => {
            setSelectedLeave(id)
            setOpenStatusDialog(true)
        },
        []
    );


    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
    const [deleteLeaveId, setDeleteLeaveId] = useState(0);
    const handleConfirmDeletection = async () => {
        setLoading(true);
        setOpenDeleteDialog(false);
        const result = await deleteLeaveData(deleteLeaveId);
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

    const deleteDialog = useCallback(
        (id) => () => {
            setDeleteLeaveId(id);
            setOpenDeleteDialog(true);
        },
        []
    );


    const adminLeaveDatagridColumns = [
        {
            field: "avatarColumn",
            headerName: "image",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <img
                    src={params?.row?.employeeId?.avatar}
                    alt={`${params?.row?.employeeId?.first_name} Avatar`}
                    style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "cover",
                        borderRadius: "50%",
                    }}
                />
            ),
        },
        {
            field: "employeeId",
            headerName: "Name",
            flex: 1,
            align: "center",
            headerAlign: "center",
            valueGetter: (params) =>
                `${params?.row?.employeeId?.first_name} ${params?.row?.employeeId?.last_name}`,
        },
        {
            field: "type",
            headerName: "Leave Type ",
            flex: 1,
            align: "center",
            headerAlign: "center",
            valueGetter: (params) => `${params.row.type ? params.row.type : "-"}`,
        },
        {
            field: "one_day_leave_type",
            headerName: "One Day Leave Type",
            flex: 1,
            align: "center",
            headerAlign: "center",
            valueGetter: (params) => `${params.row.one_day_leave_type ? params.row.one_day_leave_type : "-"}`,
        },
        {
            field: "hours",
            headerName: "Hours",
            flex: 1,
            align: "center",
            headerAlign: "center",
            valueGetter: (params) => `${params.row.hours ? params.row.hours : "-"}`,
        },
        {
            field: "fromDate",
            headerName: "From Date",
            flex: 1,
            align: "center",
            headerAlign: "center",
            valueGetter: (params) => `${dayjs(params.row.fromDate).format('DD-MMM-YYYY')}`,
        },
        {
            field: "toDate",
            headerName: "To Date",
            flex: 1,
            align: "center",
            headerAlign: "center",
            valueGetter: (params) => `${dayjs(params.row.toDate).format('DD-MMM-YYYY')}`,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <Typography
                    color={params?.row.status === "Pending" ? "#F7D636" : params?.row.status === "Approved" ? "green" : "red"}
                >
                    {params?.row.status}
                </Typography>
            ),
        },
        {
            field: "reason",
            headerName: "Reason",
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
                    onClick={updateStatus(params.row)}
                    label={"Update Status"}
                    showInMenu
                />,
                <GridActionsCellItem
                    label={"Delete"}
                    onClick={deleteDialog(params.id)}
                    showInMenu
                />,
            ],
            align: "center",
        },
    ];

    const status = [
        {
            name: "Approved",
            value: "Approved"
        },
        {
            name: "Rejected",
            value: "Rejected"
        },
        {
            name: "Pending",
            value: "Pending"
        }
    ]

    const initialState = {
        status: selectdLeave.status
    }

    const handleSubmit = async (values) => {
        setLoading(true)
        const formData = {
            leaveId: selectdLeave?._id,
            newStatus: values?.status
        }

        const result = await updateLeaveStatus(formData)
        if (result.status === 200) {
            toast.success(result.message)
            getAllEmployee();
            handleDialogOutClose()
            setLoading(false)
        } else {
            setLoading(false)
            toast.error(result.message)
        }
    }

    return (
        <>
            {loading && <Spinner />}
            <Box>
                <Breadcrumb
                    title="Leave Requests"
                    sub_page="Leaves"
                    curent_page="Leave Requests"
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
                                Leave Requests
                            </Typography>
                            <TextField
                                size="small"
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
                                backgroundColor: "",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "0",
                            },
                        }}
                        density="compact"
                        // autoHeight
                        disableColumnMenu
                        rowHeight={85}
                        enableCellSelect={false}
                        getRowId={(row) => row._id}
                        pageSizeOptions={[3, 10, 20]}
                        rowCount={adminLeaveDataGrid.totalRows}
                        loading={adminLeaveDataGrid.loading}
                        rows={adminLeaveDataGrid.rows}
                        columns={adminLeaveDatagridColumns}
                        paginationModel={paginationModel}
                        paginationMode="server"
                        disableRowSelectionOnClick
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
                message="Do you really want to delete the Leave data?"
                cancelButtonText="Cancel"
                confirmButtonText="Delete"
                openDialog={openDeleteDialog}
                handleDialogClose={handleCloseDeleteDialog}
                handleDialogAction={handleConfirmDeletection}
            />

            <Box className="employeelistpopup">
                <DialogForm
                    scroll="paper"
                    maxWidth="sm"
                    className={"employeelistpopup"}
                    title="Update Leave Status"
                    openDialog={openStatusDialog}
                    handleDialogClose={handleDialogOutClose}
                    bodyContent={
                        <>
                            <Box >
                                <Box sx={{ padding: "20px" }}>
                                    <Formik
                                        initialValues={initialState}
                                        onSubmit={handleSubmit}
                                        validateOnBlur={false}
                                        validateOnChange={true}
                                        enableReinitialize={true}
                                    >
                                        {(props) => {
                                            const { handleSubmit } = props;
                                            return (
                                                <>
                                                    <form
                                                        onSubmit={handleSubmit}
                                                        noValidate
                                                        style={{ paddingBottom: "32px" }}
                                                    >
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={3}>
                                                                <Typography sx={{ fontSize: "16px" }}>
                                                                    Name
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item sm={6}>
                                                                <Typography sx={{ fontSize: "16px" }}>
                                                                    From - To
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item sm={3}>
                                                                <Typography sx={{ fontSize: "16px" }}>
                                                                    Type
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item sm={3}>
                                                                <Typography sx={{ fontSize: "16px" }}>
                                                                    {selectdLeave.employeeId.first_name} {selectdLeave.employeeId.last_name}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item sm={6}>
                                                                <Typography sx={{ fontSize: "16px" }}>
                                                                    {dayjs(selectdLeave.fromDate).format('DD-MMM-YYYY')} - {dayjs(selectdLeave.toDate).format('DD-MMM-YYYY')}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item sm={3}>
                                                                <Typography sx={{ fontSize: "16px" }}>
                                                                    {selectdLeave.type}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item sm={9}>
                                                                <Field
                                                                    label="Status"
                                                                    name="status"
                                                                    options={status?.map((type) => ({
                                                                        title: type.name,
                                                                        value: type.value,
                                                                    }))}
                                                                    component={FormikSelect}
                                                                />
                                                            </Grid>
                                                            {
                                                                props.values.status !== "Pending" &&
                                                                <Grid item sm={3} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                                                    <Button
                                                                        variant="contained"
                                                                        size="medium"
                                                                        type="submit"
                                                                        sx={{ backgroundColor: "#3f51b5" }}
                                                                    >
                                                                        Submit
                                                                    </Button>
                                                                </Grid>
                                                            }
                                                        </Grid >
                                                    </form>
                                                </>
                                            )
                                        }}
                                    </Formik>
                                </Box>
                            </Box>

                        </>
                    }
                />
            </Box>
        </>
    )
}

export default AllLeaves
