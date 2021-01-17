import React from "react"

import { makeStyles } from '@material-ui/core/styles';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import Plot from 'react-plotly.js';

import SEO from "../components/seo"

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '100',
      },
    },
  }));

function IndexPage() {
    const classes = useStyles();
    const [power, setPower] = React.useState(0.9);
    const [mass, setMass] = React.useState(0.2);
    const [windspeed, setwindspeed] = React.useState(1);
    const [bulletdiam, setbulletdiam] = React.useState(6);
    const [angle, setAngle] = React.useState(0);
    const [height, setHeight] = React.useState(20);
    var ro = 1.225;
    var mu = 1.81e-5;
    var V0 = Math.sqrt(power*2/(mass*1e-3));
    var Re = ro*windspeed*bulletdiam*1e-3/mu;
    var Cd;
    if (Re <= 1){
        Cd = 24/Re;
    } else {
        Cd  = -0.0105*Re+10.98;
    }
    if (Re > 1e3){
        Cd = 0.47;
    }
    var Vy = V0*Math.sin(angle*Math.PI/180);
    var Vx = V0*Math.cos(angle*Math.PI/180);
    var Fdy = 1/2 * ro * (Vy/2)**2 * Cd * Math.PI * (bulletdiam*1e-3/2)**2;
    var Fdx = 1/2 * ro * (Vx/2)**2 * Cd * Math.PI * (bulletdiam*1e-3/2)**2;
    var maxheight = (1/2 * mass*1e-3 * Vy**2) / (9.81 * mass*1e-3 + Fdy) + height*1e-2;
    var aX = Fdx/(mass*1e-3);
    var aYUP = Fdy/(mass*1e-3) + 9.81;
    var aYDOWN = Fdy/(mass*1e-3) - 9.81;
    var timeUp = Vy/(9.81+Fdy/(mass*1e-3));
    console.log(timeUp)
    var timeDown = Math.abs(timeUp) + Math.abs((-Vy + Math.sqrt(Vy**2+2*9.81*height))/2*9.81);
    var time = timeUp+timeDown;
    // var maxDistance = Vx*time+1/2*aX*time**2;
    // var calcheight = (positionX) => (((((-Vx+Math.sqrt(Vx**2+2*aX*positionX))/2*aX)*2*aYUP+Vy)**2-Vy**2)/2*aYUP + height*1e-2);
    // var positionXs = [...Array(parseInt(maxDistance)).keys()];
    // var posXs = [];
    // var posYs = [];
    // for (const posX in positionXs) {
    //     posXs.push(posX);
    //     posYs.push(calcheight(posX));
    //   }
    // console.log(posXs)
    // console.log(posYs)
    return(
        <>
            <SEO title="Home" />
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="power"
                        label="Power [J]"
                        value={power}
                        onChange={(event) => setPower(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">J</InputAdornment>,
                          }}
                    />
                    <TextField
                        id="mass"
                        label="Mass [g]"
                        value={mass}
                        onChange={(event) => setMass(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">g</InputAdornment>,
                          }}
                    />
                    <TextField
                        id="vmax"
                        label="Vmax = V0 [m/s]"
                        value={V0}
                        variant="outlined"
                        size="small"
                        disabled
                        InputProps={{
                            endAdornment: <InputAdornment position="start">m/s</InputAdornment>,
                          }}
                    />
                </div>
                <div>
                    <TextField
                        id="windspeed"
                        label="Wind speed [m/s]"
                        value={windspeed}
                        onChange={(event) => setwindspeed(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">m/s</InputAdornment>,
                          }}
                    />
                    <TextField
                        id="bulletdiam"
                        label="Bullet diameter [mm]"
                        value={bulletdiam}
                        onChange={(event) => setbulletdiam(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">mm</InputAdornment>,
                          }}
                    />
                    <TextField
                        id="drag"
                        label="Drag coeff."
                        value={Cd}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        id="angle"
                        label="Shooting angle [°]"
                        value={angle}
                        onChange={(event) => setAngle(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">°</InputAdornment>,
                          }}
                    />
                    <TextField
                        id="height"
                        label="Height from ground [cm]"
                        value={height}
                        onChange={(event) => setHeight(event.target.value)}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                          }}
                    />
                    <TextField
                        id="maxheight"
                        label="Max height [m]"
                        value={maxheight}
                        variant="outlined"
                        size="small"
                        disabled
                        InputProps={{
                            endAdornment: <InputAdornment position="start">m</InputAdornment>,
                          }}
                    />
                    <TextField
                        id="maxtraveltime"
                        label="Max traveling time [s]"
                        value={time}
                        variant="outlined"
                        size="small"
                        disabled
                        InputProps={{
                            endAdornment: <InputAdornment position="start">s</InputAdornment>,
                          }}
                    />
                </div>
            </form>
            {/* <Plot
                data={[
                {
                    x: posXs,
                    y: posYs,
                    type: 'scatter',
                    mode: 'lines',
                },
                ]}
                layout={ {width: 640, height: 480, title: 'A Fancy Plot'} }
            /> */}
        </>
    )
}

export default IndexPage
