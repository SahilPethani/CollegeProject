import {
    Autocomplete,
    Box,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ErrorMessage, Field, Formik } from "formik";

import React, { useEffect, useState } from "react";
import { AddEmployeeValidator } from "../../../shared/Validations/AdminValidator";
import FormikInput from "../../../shared/material-ui-formik/FormikInput";
import ShowInputError from "../../../shared/Components/ShowInputError";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { Routing } from "../../../shared/routing";
import FormikSelect from "../../../shared/material-ui-formik/FormikSelect";
import Spinner from "../../../layout/spinner";
import { allEmployee } from "../../../services/employee";
import { addProject, getProject, updateProject } from "../../../services/project";

const EditProject = () => {

    const Project = useParams();
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    const [allUser, setAllUser] = useState([{
        name: "",
        value: 0,
    },]);
    const [projectData, setProjectData] = useState({
        project_id: "",
        project_title: "",
        department: "",
        project_priority: "",
        client: "",
        price: "",
        project_start_date: "",
        descriptions: "",
        project_end_date: "",
        work_status: "",
        team_leader: "",
    });

    console.log(projectData, "project data");
    const project_start_date =
        projectData.project_start_date !== ""
            ? dayjs(projectData.project_start_date, { format: "YYYY-MM-DD" })
            : null;

    const project_end_date =
        projectData.project_end_date !== ""
            ? dayjs(projectData.project_end_date, { format: "YYYY-MM-DD" })
            : null;
    const initialState = {
        project_id: projectData.project_id,
        project_title: projectData.project_title,
        department: projectData.department,
        project_priority: projectData.project_priority,
        client: projectData.client,
        price: projectData.price,
        project_start_date: projectData.project_start_date,
        project_end_date: projectData.project_end_date,
        descriptions: projectData.descriptions,
        work_status: projectData.work_status,
        team_leader: projectData.team_leader.first_name + " " + projectData.team_leader.last_name,
    };

    const getAllProject = async () => {
        const result = await getProject(Project.id);
        if (result?.status === 200) {
            setProjectData(result.data);
            const user = []
            for (var j in result.data.team) {
                user.push(result.data.team[j].first_name + " " + result.data.team[j].last_name)
            }
            setPersonName(user)
        } else {
            console.error("Failed to fetch employee data");
        }
    };
    useEffect(() => {
        getAllProject();
    }, []);

    const department = [
        {
            name: "Designing",
            value: "Designing",
        },
        {
            name: "Development",
            value: "Development",
        },
        {
            name: "Testing",
            value: "Testing",
        },
        {
            name: "Marketing",
            value: "Marketing",
        },
        {
            name: "Accounts",
            value: "Accounts",
        },
    ];

    const project_priority = [
        {
            name: "Low",
            value: "Low",
        },
        {
            name: "Medium",
            value: "Medium",
        },
        {
            name: "High",
            value: "High",
        },
    ];

    const work_status = [
        {
            name: "Not Started",
            value: "Not Started",
        },
        {
            name: "In Progress",
            value: "In Progress",
        },
        {
            name: "Completed",
            value: "Completed",
        },
    ];

    // update user
    const handleSubmit = async (values) => {
        setLoading(true);
        const body = {
            project_id: values.project_id,
            project_title: values.project_title,
            department: values.department,
            project_priority: values.project_priority,
            client: values.client,
            price: values.price,
            project_start_date: dayjs(values.project_start_date).format("YYYY-MM-DD"),
            project_end_date: values.project_end_date,
            descriptions: values.descriptions,
            work_status: values.work_status,
            team_leader: allUser.find((item) => item.name === values.team_leader).value,
            team: allUser.filter((item) => personName.indexOf(item.name) > -1).map(item => item.value)
        }
        const result = await updateProject(Project.id, body);
        if (result.status === 200) {
            setLoading(false);
            toast.success(result.message);
            navigate(Routing.AllProjects);
        } else {
            setLoading(false);
            toast.error(result.message);
        }
    };

    const getAllUser = async () => {
        const result = await allEmployee({
            page: 1,
            pageSize: 100,
            search_text: '',
        });
        if (result?.status === 200) {
            const user = []
            for (var j in result.data) {
                user.push({
                    name: result.data[j].first_name + " " + result.data[j].last_name,
                    value: result.data[j]._id
                })
            }
            setAllUser(user)
        }
    }

    useEffect(() => {
        getAllUser()
    }, [])

    const [personName, setPersonName] = React.useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            {loading && <Spinner />}
            <Box>
                <Breadcrumb
                    title="Add Project"
                    sub_page="project"
                    curent_page="Add Project"
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
                <Box sx={{ padding: "15px" }}>
                    <Box sx={{ margin: "1.5rem" }}>
                        <Formik
                            initialValues={initialState}
                            onSubmit={handleSubmit}
                            validateOnBlur={false}
                            validateOnChange={true}
                            enableReinitialize={true}
                            // validationSchema={AddEmployeeValidator}
                        >
                            {(props) => {
                                const { handleSubmit } = props;
                                return (
                                    <>
                                        <form onSubmit={handleSubmit} noValidate>
                                            <Grid container spacing={4}>
                                                <Grid item md={6}>
                                                    <Field
                                                        label="Project ID"
                                                        name="project_id"
                                                        placeHolder="User Id"
                                                        component={FormikInput}
                                                        readOnly={"readOnly"}
                                                    />
                                                    <ErrorMessage
                                                        name="project_id"
                                                        component={ShowInputError}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Field
                                                        label="Project Name"
                                                        name="project_title"
                                                        placeHolder="Enter Project Name"
                                                        component={FormikInput}
                                                    />
                                                    <ErrorMessage
                                                        name="project_title"
                                                        component={ShowInputError}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography
                                                        style={{
                                                            marginBottom: "11px",
                                                            color: "#1E1E1E",
                                                            fontSize: "16px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        Department
                                                    </Typography>
                                                    <Field
                                                        label="Select Department"
                                                        name="department"
                                                        options={department?.map((type) => ({
                                                            title: type.name,
                                                            value: type.value,
                                                        }))}
                                                        component={FormikSelect}
                                                    />
                                                    <ErrorMessage
                                                        name="department"
                                                        component={ShowInputError}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Field
                                                        label="Client"
                                                        name="client"
                                                        placeHolder="Enter your Client Name"
                                                        component={FormikInput}
                                                    />
                                                    <ErrorMessage
                                                        name="client"
                                                        component={ShowInputError}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography
                                                        style={{
                                                            marginBottom: "11px",
                                                            color: "#1E1E1E",
                                                            fontSize: "16px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        Project Start Date
                                                    </Typography>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            sx={{ width: "100%" }}
                                                            label="Project Start Date"
                                                            value={project_start_date}
                                                            name="project_start_date"
                                                            onChange={(date) => {
                                                                props.setFieldValue(
                                                                    "project_start_date",
                                                                    date ? dayjs(date).format("YYYY/MM/DD") : ""
                                                                );
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                    <ErrorMessage
                                                        name="project_start_date"
                                                        component={ShowInputError}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography
                                                        style={{
                                                            marginBottom: "11px",
                                                            color: "#1E1E1E",
                                                            fontSize: "16px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        Project End Date
                                                    </Typography>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            sx={{ width: "100%" }}
                                                            label="Project End Date"
                                                            value={project_end_date}
                                                            name="project_end_date"
                                                            onChange={(date) =>
                                                                props.setFieldValue(
                                                                    "project_end_date",
                                                                    date ? dayjs(date).format("YYYY-MM-DD") : ""
                                                                )
                                                            }
                                                        />
                                                    </LocalizationProvider>
                                                    <ErrorMessage
                                                        name="project_end_date"
                                                        component={ShowInputError}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Field
                                                        label="Price"
                                                        name="price"
                                                        placeHolder="Enter price"
                                                        component={FormikInput}
                                                    />
                                                    <ErrorMessage
                                                        name="price"
                                                        component={ShowInputError}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography
                                                        style={{
                                                            marginBottom: "11px",
                                                            color: "#1E1E1E",
                                                            fontSize: "16px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        Work Status
                                                    </Typography>
                                                    <Field
                                                        label="Work Status"
                                                        name="work_status"
                                                        options={work_status?.map((type) => ({
                                                            title: type.name,
                                                            value: type.value,
                                                        }))}
                                                        component={FormikSelect}
                                                    />
                                                    <ErrorMessage
                                                        name="work_status"
                                                        component={ShowInputError}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography
                                                        style={{
                                                            marginBottom: "11px",
                                                            color: "#1E1E1E",
                                                            fontSize: "16px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        Project Priority
                                                    </Typography>
                                                    <Field
                                                        label=" Project Priority"
                                                        name="project_priority"
                                                        options={project_priority?.map((type) => ({
                                                            title: type.name,
                                                            value: type.value,
                                                        }))}
                                                        component={FormikSelect}
                                                    />
                                                    <ErrorMessage
                                                        name="project_priority"
                                                        component={ShowInputError}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography
                                                        style={{
                                                            marginBottom: "11px",
                                                            color: "#1E1E1E",
                                                            fontSize: "16px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        Select Team
                                                    </Typography>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-multiple-checkbox-label">select employee</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            value={personName}
                                                            input={<OutlinedInput label="select employee" />}
                                                            onChange={handleChange}
                                                            renderValue={(selected) => selected.join(', ')}
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    style: {
                                                                        maxHeight: 48 * 4.5 + 8,
                                                                        width: 250,
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            {allUser.map((name) => (
                                                                <MenuItem key={name.value} value={name.name}>
                                                                    <Checkbox checked={personName.indexOf(name.name) > -1} />
                                                                    <ListItemText primary={name.name} />
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography
                                                        style={{
                                                            marginBottom: "11px",
                                                            color: "#1E1E1E",
                                                            fontSize: "16px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        Team Leader
                                                    </Typography>
                                                    <Field
                                                        label="Select Team Leader"
                                                        name="team_leader"
                                                        options={personName?.map((type) => ({
                                                            title: type,
                                                            value: type,
                                                        }))}
                                                        component={FormikSelect}
                                                    />
                                                    <ErrorMessage
                                                        name="team_leader"
                                                        component={ShowInputError}
                                                    />
                                                </Grid>
                                                <Grid item md={12}>
                                                    <Field
                                                        label="Description"
                                                        name="descriptions"
                                                        multiline
                                                        rows={3}
                                                        placeHolder="Enter descriptions"
                                                        component={FormikInput}
                                                    />
                                                    <ErrorMessage
                                                        name="descriptions"
                                                        component={ShowInputError}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    mt: "16px",
                                                }}
                                            >
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    size="medium"
                                                    type="submit"
                                                    sx={{ backgroundColor: "#3f51b5" }}
                                                    onClick={() => handleSubmit()}
                                                >
                                                    Submit
                                                </Button>
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    size="medium"
                                                    sx={{ backgroundColor: "#f44336" }}
                                                    onClick={() => navigate(Routing.AllProjects)}
                                                >
                                                    Cancle
                                                </Button>
                                            </Box>
                                        </form>
                                    </>
                                );
                            }}
                        </Formik>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default EditProject