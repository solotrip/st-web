import React from 'react';

import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import  styles from './Sidebar.module.scss';
import { IconContext } from 'react-icons';
import {useDispatch,useSelector} from "react-redux"
import {selectTab} from "../navigation/slice"

function SideBar() {
  const activeTab   = useSelector(state => state.navigation.activeTab);
 const dispatch = useDispatch();
const handleSelect =(param) => { 
  if(param !== "Preferences" ) { 
    dispatch(selectTab(param))
  }  else { 
    dispatch(selectTab("Recommendations"))
  }
}
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={styles.navMenuActive}>
          <div className={styles.navMenuItems}>
            {SidebarData.map((item, index) => {
              return (
                <Link to={item.path}>
                <button key={index} className={ activeTab === item.title ? styles.navTextActive: styles.navText} onClick={()=>handleSelect(item.title) }>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </button>
                </Link>
              );
            })}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;