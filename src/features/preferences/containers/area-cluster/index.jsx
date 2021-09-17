import React, { useState } from 'react'
import styles from './cluster.module.scss'
import ImageShadow from "react-image-shadow";
import "react-image-shadow/assets/index.css";

import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";


import {useDispatch,useSelector} from "react-redux"

import { addToClusters,removeFromClusters } from "../../../preferences/containers/area-cluster/slice"




let areas = [
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster0_SyGahw35Ix.jpg?tr=w-400,h-300",
      cluster: "c0", title: "Mathura 🇮🇳",
    },
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster1_ZGKTFYuW3R.jpg?tr=w-400,h-300",
      cluster: "c1", title: "Matara 🇵🇱",
    },
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster2_XKyJ0UANo.jpg?tr=w-400,h-300",
      cluster: "c2", title: "Cancun 🇲🇽",
    },
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster3_H7MKluEVN.png?tr=w-400,h-300",
      cluster: "c3", title: "Geneva 🇨🇭",
    },
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster4_xGLusmCWR.png?tr=w-400,h-300",
      cluster: "c4", title: "Phuket 🇹🇭",
    },
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster5_FKKzRyfNT.png?tr=w-400,h-300",
      cluster: "c5", title: "Nice 🇫🇷",
    },
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster6_nhuLO62dE.png?tr=w-400,h-300",
      cluster: "c6", title: "Valencia 🇪🇸",
    },
  
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster7_laI6ReOvO.jpg?tr=w-400,h-300",
      cluster: "c7", title: "Changwon 🇰🇷",
    },
  
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster8_DksRdaCNx.jpg?tr=w-400,h-300",
      cluster: "c8", title: "Kaila Kona Hawaii 🇺🇸",
    },
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster9_GWsQgB8AcG.png?tr=w-400,h-300",
      cluster: "c9", title: "Montreal 🇨🇦",
    },
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster10_usDtBojMm.jpg?tr=w-400,h-300",
      cluster: "c10", title: "San Pedro 🇨🇮",
    },
  
    {
      link:
        "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster11_pZtN1OMiL.jpg?tr=w-400,h-300",
      cluster: "c11", title: "Palm Coast 🇺🇸",
    },
    {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster12_Ql29Afnn4.png?tr=w-400,h-300",
        cluster: "c12", title: "Baku 🇦🇿",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster13_zCIVpjDF5dT1.png?tr=w-400,h-300",
        cluster: "c13", title: "Minoh 🇯🇵",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster14_Jk-HS629s.png?tr=w-400,h-300",
        cluster: "c14", title: "Örebro 🇸🇪",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster15_JvyBGJ7TE.png?tr=w-400,h-300",
        cluster: "c15", title: "Salamina 🇬🇷",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster16_pcfPUCfg_Ts.jpg?tr=w-400,h-300",
        cluster: "c16", title: "Okinawa 🇯🇵",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster17__QQ7qXpj5v.png?tr=w-400,h-300",
        cluster: "c17", title: "Helsinki 🇫🇮",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster18_3gj7yH9Bd.png?tr=w-400,h-300",
        cluster: "c18", title: "Caracas 🇻🇪",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster19_flU5I2VtZTv.png?tr=w-400,h-300",
        cluster: "c19", title: "Aberdeen 🇬🇧",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster20_d4tfjXvGG29.png?tr=w-400,h-300",
        cluster: "c20", title: "Shanghai 🇨🇳",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster21_ru42dOmCY.jpg?tr=w-400,h-300",
        cluster: "c21", title: "Graz 🇦🇹",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster22_zioH14HE6.jpg?tr=w-400,h-300",
        cluster: "c22", title: "Leon 🇪🇸",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster23_qJ55Sd28g.webp?tr=w-400,h-300",
        cluster: "c23", title: "Palmas 🇧🇷",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster24_kNAi2uAs95i.png?tr=w-400,h-300",
        cluster: "c24", title: "Amsterdam 🇳🇱",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster25_LCMKu641u.jpg?tr=w-400,h-300",
        cluster: "c25", title: "Volgograd 🇷🇺",
      },

      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster26_7QE_dd9bq.png?tr=w-400,h-300",
        cluster: "26c", title: "Cosenza 🇮🇹",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster27_EJ5Vdqp5b.png?tr=w-400,h-300",
        cluster: "c27", title: "Huntington Beach California 🇺🇸",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster28_hKG1_8-bq.png?tr=w-400,h-300",
        cluster: "c28", title: "Rionegro 🇨🇴",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster29_DeF8X2BKaz.png?tr=w-400,h-300",
        cluster: "c29", title: "Miami Florida 🇺🇸",
      },
      
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster30_V4sQ9sbN3.png?tr=w-400,h-300",
        cluster: "c30", title: "Taketa 🇯🇵",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster31_j2RWrXD2P.png?tr=w-400,h-300",
        cluster: "c31", title: "Hangzhou 🇨🇳",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster32_sFlhbycJkn.png?tr=w-400,h-300",
        cluster: "c32", title: "Gothenburg 🇸🇪",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster33_zEQaQHXAf2.png?tr=w-400,h-300",
        cluster: "c33", title: "Mar del Plata 🇦🇷",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster34_0AlgZfEHbR.png?tr=w-400,h-300",
        cluster: "c34", title: "Tromso 🇳🇴",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster35_JqsbPeXsO.jpg?tr=w-400,h-300",
        cluster: "c35", title: "Rzeszow 🇵🇱",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster36_57mAth1pVe.png?tr=w-400,h-300",
        cluster: "c36", title: "Istanbul 🇹🇷",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster37_80wJ7YAxvz.jpg?tr=w-400,h-300",
        cluster: "c37", title: "Gyumri 🇦🇲",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster38_lGjOp5DnB.png?tr=w-400,h-300",
        cluster: "c38", title: "Tottori 🇯🇵",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster39_7gbQ9ue19.png?tr=w-400,h-300",
        cluster: "c39", title: "Kuwait City 🇰🇼",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster40_T9bWFTLPb.png?tr=w-400,h-300",
        cluster: "c40", title: "Paris 🇫🇷",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster41_cvbr8IO6VJ5.jpg?tr=w-400,h-300",
        cluster: "c41", title: "Mülheim 🇩🇪",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster42_p6S8O8ol09r.png?tr=w-400,h-300",
        cluster: "c42", title: "Kerry 🇮🇪",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster43_agH4m4cVO.jpg?tr=w-400,h-300",
        cluster: "c43", title: "Jackson Missisipi 🇺🇸",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster44_e4RCIOhhW2y.jpg?tr=w-400,h-300",
        cluster: "c44", title: "Porirua 🇳🇿",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster45_hbN8Ua-JF.jpg?tr=w-400,h-300",
        cluster: "c45", title: "Eskisehir 🇹🇷",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster46_z9L2k9VTFd.png?tr=w-400,h-300",
        cluster: "c46", title: "Monza 🇮🇹",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster47_Jny3AxxLv_.png?tr=w-400,h-300",
        cluster: "c47", title: "Santiago 🇨🇱",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster48_p5fpOCWZHrm.jpg?tr=w-400,h-300",
        cluster: "c48", title: "Melitopol 🇺🇦",
      },
      {
        link:
          "https://ik.imagekit.io/7zlqc1cmihe/area-clusters/cluster49_x1jzHKvPz.png?tr=w-400,h-300",
        cluster: "c49", title: "Kamloops 🇨🇦",
      },
  ];

  

const AreaClusterContainer = () => {


    const dispatch = useDispatch();
    const clusters   = useSelector(state => state.clusters.selectedClusters)
    //const [clusters, setClusters] = useState([])

    const handleCluster = (cluster) => { 
        let cls =[]
        console.log("area is: ", cluster)
        if(clusters.includes(cluster)) {

            //console.log("remove from clusters")
            //cls = clusters.filter((element) => { return element !== cluster  })
            //setClusters(cls)
            dispatch(removeFromClusters(cluster))


        } else { 
  
          // cls = [...clusters,cluster]
         // setClusters(cls)
         dispatch(addToClusters(cluster))
          
          //console.log("added to clusters and clusters are: ", cls)
  
        }
       
  
  
    }
  
  return (
    <div className={styles.wrapper}>
     
    <div className={styles.title}> Select some destinations you like.</div>
      <div className={styles.arrowHolder}>
         
              <div className={styles.arrowLeft3}>
              <FaChevronLeft />
            </div>
            <div className={styles.arrowRight3}>
              <FaChevronRight />
            </div>
          </div>
            
          <div className={styles.slideHolder}>
            {areas.map((area) => (
              <button className={ clusters.includes(area.cluster) ? styles.selected :  styles.notSelected} onClick={() => {handleCluster(area.cluster)}}> 
                <ImageShadow
                  src={area.link}
                  className={styles.slideElement}
                  shadowBlur={10}
                  width={300}
                  alt="a"
                  
                />
                <div className={styles.slideText2}>
                  {area.title}
                </div>
              </button>
            ))}
          </div>
    </div>
  )
}




export default AreaClusterContainer
