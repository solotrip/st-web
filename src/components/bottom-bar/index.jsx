import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { CircleEdit24Regular,Alert28Regular,BoardSplit28Regular,Heart28Regular,Bookmark28Regular } from "@fluentui/react-icons";
import styles from "./bottom-bar.module.scss"

import MenuBar from "./MenuBar"

import {useDispatch,useSelector} from "react-redux"
import {selectTab} from "../navigation/slice"


export default function BottomBar() {
    //const [active, setActive] = useState('recommendations')

    const activeTab   = useSelector(state => state.navigation.activeTab);
    

  return (<div className={styles.holder}>
    <MenuBar
        active={activeTab}
        //setActive={setActive}
      />
    </div>);
}