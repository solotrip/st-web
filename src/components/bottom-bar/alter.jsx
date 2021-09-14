import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { CircleEdit24Regular,Alert28Regular,BoardSplit28Regular,Heart28Regular,Bookmark28Regular } from "@fluentui/react-icons";
import styles from "./bottom-bar.module.scss"


const useStyles = makeStyles({
  root: {
    width: "100%",
    color: "white"
  },
});

export default function BottomBar() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (<div className={styles.holder}>
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      //showLabels
      className={classes.root}
    >
      <BottomNavigationAction className={styles.element} label="Recommendations" icon={<BoardSplit28Regular />} />
      <BottomNavigationAction  className={styles.element} label="Saved" icon={<Bookmark28Regular/>} />
      <BottomNavigationAction  className={styles.element} label="Notifications" icon={<Alert28Regular />} />
      <BottomNavigationAction className={styles.element} label="Preferences" icon={<CircleEdit24Regular />} />

    </BottomNavigation>
    </div>);
}