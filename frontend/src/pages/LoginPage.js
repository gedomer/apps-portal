import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux"
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { loginUser } from "../actions";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object({
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});

function LoginPage(props) {
  const onSubmit = (values) => {
    props.loginUser(values.username, values.password);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  if(props.isAuthUser){
    return <Navigate to="/" />
  }

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">Login</Typography>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              error={Boolean(formik.errors.username)}
              required
              fullWidth
              id="username"
              label={"Username"}
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              helperText={formik.errors.username}
            />
            <TextField
              error={Boolean(formik.errors.password)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              helperText={formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

            {props.hasError && <Alert severity="error">Username or password is incorrect!</Alert>}

          </Box>
        </Box>
      </Container>
  );
}

const mapStateToProps = (state) => ({
  isAuthUser: state.auth.isAuthUser,
  hasError: state.auth.hasError
});

export default connect(mapStateToProps, { loginUser })(LoginPage);