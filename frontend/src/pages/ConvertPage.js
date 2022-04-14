import React, { useState } from 'react'
import { Alert, Button, Box, Container, Grid, LinearProgress } from '@mui/material';
import http from "../http";

function ConvertPage(props) {
  const [state, setState] = useState({
    selectedFile: undefined,
    loading: false,
    result: null,
    isError: false
  })

  React.useEffect(() => {
    document.title = "Apps Portal | Webp Convert";
  });

  const selectFile = (event) => {
    setState({ ...state, selectedFile: event.target.files[0]});
  }

  const upload = (event) => {
    event.preventDefault()
    setState({ ...state, loading:true })

    const formData = new FormData();
    formData.append("file", state.selectedFile);

    http.Convert(formData)
      .then(res => {
        setState({ ...state, result: res.data, selectedFile:undefined, loading:false })
      })
      .catch(err => {
        setState({ ...state, selectedFile:undefined, loading:false, isError:true })
      })
  }

  return (
    <div style={{ marginTop: 50, marginBottom:50 }}>
    <Container component="main" maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            accept=".jpg,.png"
            style={{ display: 'none' }}
            type="file"
            onChange={selectFile}
          />
          <Button
            className="btn-choose"
            variant="outlined"
            component="span"
          >
            Choose File
          </Button>
        </label>

        {state.selectedFile && (
          <div style={{ marginLeft:30 }}>
            <Button
              className="btn-upload"
              color="primary"
              variant="contained"
              component="span"
              disabled={!state.selectedFile}
              onClick={upload}
            >
              Upload ({state.selectedFile.name})
            </Button>
          </div>
        )}
      </Grid>
        <div style={{ marginTop: 100 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
          >
            {state.loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}

            {!state.loading && state.result && (
              <div style={{ margin:'auto' }}>
                <img style={{ objectFit:'cover', height: 550, width: '100%' }} src={`${http.BASE_URL}${state.result.result}`} />
              </div>
            )}

            {state.isError && (
              <Alert severity="error">Webp Conversion process failed.</Alert>
            )}

          </Grid>
        </div>
    </Container>
    </div>
  )
}

export default ConvertPage