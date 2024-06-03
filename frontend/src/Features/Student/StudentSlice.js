/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const initialState = {
    students: [],
    responseStatus: "",
    responseMessage: "",
};

export const createStudent = createAsyncThunk(
    "students/createStudent",
    async (student, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/store-student`, student);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getStudents = createAsyncThunk(
    "students/getStudents",
    async () => {
        try {
            const response = await axios.get(`${baseURL}/fetch-all-student`);
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const getStudent = createAsyncThunk(
    "students/getStudent",
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseURL}/fetch-student/${studentId}`
            );
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const updateStudent = createAsyncThunk(
    "students/updateStudent",
    async (student, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("studentName", student.get('studentName'));
            formData.append("studentPhone", student.get('studentPhone'));
            formData.append("studentEmail", student.get('studentEmail'));
            formData.append("studentGender", student.get('studentGender'));
            formData.append("studentPhoto", student.get('studentPhoto'));
            formData.append("studentAddress", student.get('studentAddress'));
            formData.append("admissionNumber", student.get('admissionNumber'));
            formData.append("admissionInClass", student.get('admissionInClass'));
            formData.append("admissionFormPhoto", student.get('admissionFormPhoto'));
            formData.append("currentClass", student.get('currentClass'));
            formData.append("studentMedium", student.get('studentMedium'));
            formData.append("birthCertificatePhoto", student.get('birthCertificatePhoto'));
            formData.append("adhaarCard", student.get('adhaarCard'));
            formData.append("samagraId", student.get('samagraId'));
            formData.append("bankAccountPhoto", student.get('bankAccountPhoto'));
            formData.append("domicileCertificatePhoto", student.get('domicileCertificatePhoto'));
            formData.append("casteCertificatePhoto", student.get('casteCertificatePhoto'));
            formData.append("guardianPhoto", student.get('guardianPhoto'));

            const response = await axios.put(
                `${baseURL}/update-student/${student.get('_id')}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateStudentTc = createAsyncThunk(
    "students/updateStudentTc",
    async (student, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("tcNumber", student.get('tcNumber'));
            formData.append("tcFormPhoto", student.get('tcFormPhoto'));

            const response = await axios.put(
                `${baseURL}/update-student/${student.get('_id')}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        resetStudentState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createStudent.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createStudent.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Student created successfully";
        })
        .addCase(createStudent.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get all reducers
        builder
        .addCase(getStudents.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getStudents.fulfilled, (state, action) => {
            state.students = action.payload;
            state.responseStatus = "success";
        })
        .addCase(getStudents.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get reducers
        builder
        .addCase(getStudent.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getStudent.fulfilled, (state, action) => {
            state.students = action.payload;
            state.responseStatus = "success";
        })
        .addCase(getStudent.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateStudent.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateStudent.fulfilled, (state, action) => {
            if (Array.isArray(state.students)) {
            state.students = state.students.map((student) =>
                student.id === action.payload._id ? action.payload : student
            );
            } else {
            state.students = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Student updated successfully";
        })
        .addCase(updateStudent.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
        
        // update reducers
        builder
        .addCase(updateStudentTc.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateStudentTc.fulfilled, (state, action) => {
            if (Array.isArray(state.students)) {
            state.students = state.students.map((student) =>
                student.id === action.payload._id ? action.payload : student
            );
            } else {
            state.students = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Student TC updated successfully";
        })
        .addCase(updateStudentTc.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetStudentState } = studentsSlice.actions;
export default studentsSlice.reducer;
