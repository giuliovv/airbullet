import React from "react"

import { makeStyles } from '@material-ui/core/styles';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

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
    var maxheight = 1/2 * (V0*Math.sin(angle*Math.PI/180))**2/9.81 + height*1e-2;
    var time = Math.sqrt(2*(2*maxheight - height*1e-2)/9.81);
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
        </>
    )
}

export default IndexPage
