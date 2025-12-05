import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { editNote, getOneNote } from '../../../services/Employee/note';
import { Routing } from '../../../shared/routing';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ErrorMessage, Field, Formik } from 'formik';
import ShowInputError from '../../../shared/Components/ShowInputError';
import Spinner from '../../../layout/spinner';
import Breadcrumb from '../../../shared/Components/Breadcrumb';
import FormikSelect from '../../../shared/material-ui-formik/FormikSelect';
import FormikInput from '../../../shared/material-ui-formik/FormikInput';
import { AddNoteValidator } from '../../../shared/Validations/AdminValidator';
import dayjs from 'dayjs';

const EditNotes = () => {
    const note_id = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [notesData, setNotesData] = useState({
        date: "",
        note_detail: "",
        status: 0,
        title: "",
        show_dash: 0
    });

    const show_dash = [
        {
            name: "Yes",
            value: 1,
        },
        {
            name: "No",
            value: 0,
        },
    ];

    const initialState = {
        title: notesData.title,
        note_detail: notesData.note_detail,
        show_dash: notesData.show_dash
    };

    const getAllNotes = async () => {
        const result = await getOneNote(note_id.id);
        if (result?.status === 200) {
            setNotesData(result.data);
        } else {
            console.error("Failed to fetch Holiday data");
        }
    };

    useEffect(() => {
        getAllNotes();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        const result = await editNote(note_id.id, values);
        if (result.status === 200) {
            setLoading(false);
            resetForm();
            toast.success(result.message);
            navigate(Routing.AdminNotes);
        } else {
            setLoading(false);
            toast.error(result.message);
        }
    };

    return (
        <>
            {loading && <Spinner />}
            <Box>
                <Breadcrumb
                    title="Edit Note"
                    sub_page="Notes"
                    curent_page="Edit Note"
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
                <Box sx={{ margin: "1.5rem" }}>
                    <Formik
                        initialValues={initialState}
                        onSubmit={handleSubmit}
                        validateOnBlur={false}
                        validateOnChange={true}
                        enableReinitialize={true}
                        validationSchema={AddNoteValidator}
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
                                        <Grid container spacing={4}>
                                            <Grid item sm={12}>
                                                <Typography
                                                    style={{
                                                        color: "#1E1E1E",
                                                        fontSize: "16px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    Date : {dayjs(notesData.date).format("DD/MM/YYYY")}
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <Field
                                                    label="Title*"
                                                    name="title"
                                                    placeHolder="Title*"
                                                    component={FormikInput}
                                                />
                                                <ErrorMessage
                                                    name="title"
                                                    component={ShowInputError}
                                                />
                                            </Grid>
                                            <Grid item sm={12}>
                                                <Field
                                                    label="Note Detail"
                                                    name="note_detail"
                                                    placeHolder="Note Detail"
                                                    component={FormikInput}
                                                />
                                                <ErrorMessage
                                                    name="note_detail"
                                                    component={ShowInputError}
                                                />
                                            </Grid>
                                            <Grid item sm={12}>
                                                <Typography
                                                    style={{
                                                        marginBottom: "11px",
                                                        color: "#1E1E1E",
                                                        fontSize: "16px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    Show employee
                                                </Typography>
                                                <Field
                                                    name="show_dash"
                                                    options={show_dash?.map((type) => ({
                                                        title: type.name,
                                                        value: type.value,
                                                    }))}
                                                    component={FormikSelect}
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
                                                onClick={() => navigate(Routing.AdminNotes)}
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
        </>
    )
}

export default EditNotes
