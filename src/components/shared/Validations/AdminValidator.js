import * as Yup from "yup";

export const AddEmployeeValidator = Yup.object().shape({
  first_name: Yup.string().required("Frist Name cannot be blank."),
  last_name: Yup.string().required("Last Name cannot be blank."),
  password: Yup.string().required("Password cannot be blank."),
  email: Yup.string().email().required("Email cannot be blank."),
  gender: Yup.number().required("Gender cannot be blank."),
  create_user: Yup.number().required("Create user cannot be blank."),
  mobile: Yup.number().required("Mobile cannot be blank."),
  designation: Yup.string().required("Designation Name cannot be blank."),
  date_of_birth: Yup.string().required("Date of birth cannot be blank."),
  join_date: Yup.string().required("Join date cannot be blank."),
});

export const EditEmployeeValidator = Yup.object().shape({
  first_name: Yup.string().required("Frist Name cannot be blank."),
  last_name: Yup.string().required("Last Name cannot be blank."),
  // password: Yup.string().required("Password cannot be blank."),
  email: Yup.string().email().required("Email cannot be blank."),
  gender: Yup.number().required("Gender cannot be blank."),
  // create_user: Yup.number().required("Create user cannot be blank."),
  mobile: Yup.number().required("Mobile cannot be blank."),
  designation: Yup.string().required("Designation Name cannot be blank."),
  date_of_birth: Yup.string().required("Date of birth cannot be blank."),
  join_date: Yup.string().required("Join date cannot be blank."),
});

export const AddHolidayValidator = Yup.object().shape({
  holiday_no: Yup.string().required("Holiday No cannot be blank."),
  holiday_name: Yup.string().required("Holiday Name cannot be blank."),
  detail: Yup.string().required("Holiday Details cannot be blank."),
  holiday_date: Yup.string().required("Holiday date cannot be blank."),
  status: Yup.string().required("Holiday Status be blank."),
});

export const AddLeaveValidator = Yup.object().shape({
  comments: Yup.string().required("comments cannot be blank."),
  type: Yup.string().required("Type cannot be blank."),
});

export const AddNoteValidator = Yup.object().shape({
  title: Yup.string().required("title cannot be blank."),
  note_detail: Yup.string().required("note detail cannot be blank."),
});

export const AddProjectValidator = Yup.object().shape({
  project_id: Yup.string().required("Project Id cannot be blank."),
  project_title: Yup.string().required("ProjectTitle cannot be blank."),
  department: Yup.string().required("Department cannot be blank."),
  project_priority: Yup.string().required("Project Priority cannot be blank."),
  price: Yup.number().required("Price cannot be blank."),
  client: Yup.string().required("Client Name cannot be blank."),
  project_start_date: Yup.string().required("Project Start Date cannot be blank."),
  descriptions: Yup.string().required("Description cannot be blank."),
  project_end_date: Yup.string().required("Project End Date cannot be blank."),
  work_status: Yup.string().required("Work Status cannot be blank."),
  team_leader: Yup.string().required("Team Leader cannot be blank."),
});

