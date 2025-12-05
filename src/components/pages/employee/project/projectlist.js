import React, { useCallback, useState } from "react";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import {
    Box,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../shared/routing";
import { allProjectEmployee } from "../../../services/Employee/project";
import DialogForm from "../../../shared/Components/DialogForm";
import Spinner from "../../../layout/spinner";
import { getProject } from "../../../services/project";
import dayjs from "dayjs";

export default function ProjectList() {
    const navigate = useNavigate();

    const employeeId = JSON.parse(
        window.localStorage.getItem("employeeDetail")
    )._id;

    const [loading, setLoading] = useState(false);
    const [projectDataGrid, setProjectDataGrid] = useState({
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

    const handleProjectSearch = (event) => {
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

    const updateProjectDataGrid = (k, v) => {
        setProjectDataGrid((prev) => ({ ...prev, [k]: v }));
    };

    const getAllProject = useCallback(async () => {
        updateProjectDataGrid("loading", true);
        const result = await allProjectEmployee({
            _id: employeeId,
            page: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
            search_text: searchFilters.searchText,
        });
        if (result?.status === 200) {
            updateProjectDataGrid("rows", result.data);
            updateProjectDataGrid("totalRows", result.pagination.total_items);
            updateProjectDataGrid("loading", false);
        } else {
            updateProjectDataGrid("rows", []);
            updateProjectDataGrid("totalRows", 0);
            updateProjectDataGrid("loading", false);
        }
    }, [
        paginationModel.page,
        paginationModel.pageSize,
        searchFilters.searchText,
    ]);

    useEffect(() => {
        getAllProject();
    }, [getAllProject]);


    const [openProjectDialog, setOpenProjectDialog] = useState(false);
    const [projectData, setProjectData] = useState()
    const handleCloseProjectDialog = () => { setOpenProjectDialog(false); }

    const getProjectData = async (id) => {
        setLoading(true)
        const result = await getProject(id)
        if (result.status === 200) {
            setProjectData(result.data)
            setOpenProjectDialog(true);
            setLoading(false)
        } else {
            setLoading(false)
        }
    }


    const projectDialog = useCallback(
        (id) => () => {
            getProjectData(id)
        },
        []
    );

    // datagrid
    const projectDatagridColumns = [
        {
            field: "project_id",
            headerName: "Project Id",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "project_title",
            headerName: "Name",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "department",
            headerName: "Department",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "project_priority",
            headerName: "Project Priority",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "work_status",
            headerName: "Work Status",
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
                    label={"View"}
                    showInMenu
                    onClick={projectDialog(params.id)}
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
                    title="Project's"
                    sub_page="project"
                    curent_page="project list"
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
                                Projects
                            </Typography>
                            <TextField
                                size="small"
                                onChange={(event) => {
                                    handleProjectSearch(event);
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
                                onClick={() => getAllProject()}
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
                            rowCount={projectDataGrid.totalRows}
                            loading={projectDataGrid.loading}
                            rows={projectDataGrid.rows}
                            columns={projectDatagridColumns}
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
            </Box>

            <Box className="employeelistpopup">
                <DialogForm
                    scroll="paper"
                    maxWidth="sm"
                    className={"employeelistpopup"}
                    title="Project Detail"
                    openDialog={openProjectDialog}
                    handleDialogClose={handleCloseProjectDialog}
                    bodyContent={
                        <Box>
                            <Grid container spacing={2} padding="20px" alignItems="center">
                                <Grid item xs={12}>
                                    <Typography fontSize={14} fontWeight={700}>{projectData?.project_id}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography fontSize={14} fontWeight={500}>Project Name</Typography>
                                    <Typography fontSize={14} color={"#00000099"} fontWeight={400}>{projectData?.project_title}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontSize={14} fontWeight={500}>Department</Typography>
                                    <Typography fontSize={14} color={"#00000099"} fontWeight={400}>{projectData?.department}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontSize={14} fontWeight={500}>Client</Typography>
                                    <Typography fontSize={14} color={"#00000099"} fontWeight={400}>{projectData?.client}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontSize={14} fontWeight={500}>Work Status</Typography>
                                    <Typography fontSize={14} color={"#00000099"} fontWeight={400}>{projectData?.work_status}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontSize={14} fontWeight={500}>Project Start Date</Typography>
                                    <Typography fontSize={14} color={"#00000099"} fontWeight={400}>{dayjs(projectData?.project_start_date).format("YYYY/MM/DD")}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontSize={14} fontWeight={500}>Project End Date</Typography>
                                    <Typography fontSize={14} color={"#00000099"} fontWeight={400}>{dayjs(projectData?.project_end_date).format("YYYY/MM/DD")}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontSize={14} fontWeight={500}>Team Leader</Typography>
                                    <Typography fontSize={14} color={"#00000099"} fontWeight={400}> - {projectData?.team_leader?.first_name + " " + projectData?.team_leader?.last_name}, {projectData?.team_leader?.designation}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontSize={14} fontWeight={500}>Team</Typography>
                                    {
                                        projectData?.team?.map((item, index) => (
                                            <>
                                                <Typography fontSize={14} color={"#00000099"} fontWeight={400}> - {item?.first_name + " " + item?.last_name}, {item?.designation}</Typography>
                                            </>
                                        ))
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography fontSize={14} fontWeight={500}>Descriptions</Typography>
                                    <Typography fontSize={14} color={"#00000099"} fontWeight={400}>{projectData?.descriptions}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                />
            </Box>
        </div>
    )
}
