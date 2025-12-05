import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../layout/spinner';
import { Routing } from '../../../shared/routing';
import { ErrorMessage, Field, Formik } from 'formik';
import { AddNoteValidator } from '../../../shared/Validations/AdminValidator';
import { Box, Button, Grid } from '@mui/material';
import ShowInputError from '../../../shared/Components/ShowInputError';
import FormikInput from '../../../shared/material-ui-formik/FormikInput';
import toast from 'react-hot-toast';
import { addNote } from '../../../services/Employee/note';
import Breadcrumb from '../../../shared/Components/Breadcrumb';

const AddNotes = () => {
    const navigate = useNavigate();
    const initialState = {
        title: "",
        note_detail: ""
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        const result = await addNote(values);
        if (result.status === 201) {
            setLoading(false);
            toast.success(result.message);
            resetForm();
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
                    title="Add Note"
                    sub_page="Notes"
                    curent_page="Add Note"
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

export default AddNotes
