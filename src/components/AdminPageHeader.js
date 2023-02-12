import React from 'react'
import { Paper, Card, Typography, makeStyles } from '@material-ui/core'

// Header used on each admin pages.
const useStyles = makeStyles(theme => ({
    root: {
        //header color
        backgroundColor: '#207567'
    },
    pageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2)
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        //header icon color
        color:'#207567'
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        color: '#dbd8ce',
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

// Creates the admin page header.
export default function PageHeader(props) {

    const classes = useStyles();
    const { title, subTitle, icon } = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div">
                        {title}</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                </div>
            </div>
        </Paper>
    )
}


