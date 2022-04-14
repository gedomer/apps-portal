import * as React from 'react';
import { Container, Grid, TextField, Button, Box, Autocomplete } from '@mui/material';
import AppSlider from '../components/AppSlider';
import http from '../http';


function HomePage(props) {
  const [state, setState] = React.useState({
    loading: true,
    appList: [],
    selectedApp: null,
    selectedApp2: null,
  })

  const getAppList = () => {
    http.GetAppsList()
      .then((res) => {
        setState({...state, loading:false, appList: res.data })
      })
      .catch((err) => {
        setState({...state, loading:false })
      })
  }

  React.useEffect(() => {
    getAppList()
  }, []);

  const getRandomApp = () => {
    const item = state.appList[Math.floor(Math.random()*state.appList.length)];
    return item.id === state.selectedApp2 ? getRandomApp() : item
  }

  const randomize = () => {
    const app = getRandomApp()
    setState({...state, selectedApp2: app.id })
  }

  return (
    <React.Fragment>
      <div style={{ marginTop: 50, marginBottom:50 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {!state.selectedApp ?
            <Autocomplete
              disableClearable
              options={state.appList.map(i => i.name)}
              onInputChange={(e) => {
                const index = e.target.dataset.optionIndex
                const selectedApp = state.appList.splice(index, 1)[0].id
                setState({...state, appList: state.appList, selectedApp })
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Applications" />}
            />
          :
            <Button style={{ marginLeft:10 }} variant="contained" onClick={() => randomize()}>Randomize</Button>
          }
        </Box>
      </div>

      <Container component="main" maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            <AppSlider
              selectedAppId={state.selectedApp}
              helperText={"First, select an application from dropdown."}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <AppSlider
              selectedAppId={state.selectedApp2}
              helperText={"Then, click the Randomize button."}
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default HomePage;