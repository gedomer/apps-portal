import React from 'react'
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    useTheme
  } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Item from 'react-material-ui-carousel'
import { useState } from 'react';
import http from '../http';

function AppSlider(props) {
  const theme = useTheme();
  const [state, setState] = useState({
    app: {},
    loading: true
  })

  const getAppDetail = (appId) => {
    http.GetAppDetail(appId)
      .then((res) => {
        setState({...state, loading:false, app:res.data })
      })
      .catch((err) => {
        setState({...state, loading:false})
      })
  }

  React.useEffect(() => {
    if(props.selectedAppId){
      getAppDetail(props.selectedAppId)
    }
  }, [props.selectedAppId])

  return (
    <Card sx={{ height: '100%', backgroundColor:'#f5f5f5', minHeight:700 }}>
      {!state.app.id ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography align="center" variant="h4" gutterBottom>
            {props.helperText}
          </Typography>
        </Box>
      )
      :
      <>
      <Avatar
        sx={{
          mx: 'auto',
          mb: 1,
          mt: 5,
          width: theme.spacing(12),
          height: theme.spacing(12)
        }}
        src={`${http.BASE_URL}${state.app.logo}`}
      />
      <Typography align="center" variant="h4" gutterBottom>
        {state.app.name}
      </Typography>

      <CardContent>
        {state.app.screenshots.length > 0 ?
        <Carousel autoPlay={false} height={700}>
          {state.app.screenshots.map(ss => (
            <Item>
              <div style={{
                backgroundImage: `url(${http.BASE_URL}${ss.file})`,
                backgroundSize: "100% 100%",
                height:"700px" }}
              />
            </Item>
          ))}
        </Carousel>
        : (
          <Typography align="center" variant="h6" gutterBottom>
            There is no screenshots to display :'(
          </Typography>
        )
        }
      </CardContent>

      </>}
    </Card>
  );
}
  
export default AppSlider;