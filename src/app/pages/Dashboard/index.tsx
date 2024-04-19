import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";

import { 
    Bar, 
    Doughnut, 
    Line ,
    Pie,
} from 'react-chartjs-2';
import { AppContext } from "context";

const Dashboard = () => {
    const { 
        setIsAuthenticated, 
        accessToken, 
        setAccessToken,
        isUserDataLoaded, 
        userData 
    } = useContext(AppContext);
    const barOptions = {};
    const lineOptions = {};
    const pieOptions = {};
    const barChartData = {
        labels : ['Biodegradable', 'Non - Biodegradable', 'Hazardous'],
        datasets :[
            {
                label: 'KG Collected',
                data : [1200,322,121],
                backgroundColor : "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
           
        ]
    };
    const lineData = {
        labels : ['Biodegradable', 'Non - Biodegradable', 'Hazardous'],
        datasets :[
            {
                label: 'Poblacion',
                data : [41,322,1],
                backgroundColor : "rgba(251, 9, 132, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: 'Poblacion',
                data : [33,7,11],
                backgroundColor : "rgba(252, 90, 44, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: 'Poblacion',
                data : [72,15,3],
                backgroundColor : "rgba(253, 99, 22, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: 'Poblacion',
                data : [89,2,2],
                backgroundColor : "rgba(254, 99, 11, 1)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: 'Poblacion',
                data : [21,6,7],
                backgroundColor : "rgba(255, 99, 7, 1)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: 'Poblacion',
                data : [107,99,89],
                backgroundColor : "rgba(25, 99, 90, 1)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: 'Poblacion',
                data : [14,20,11],
                backgroundColor : "rgba(255, 99, 55, 1)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ]
    };
    const pieData = {
      labels : ['Biodegradable', 'Non - Biodegradable', 'Hazardous'],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]}
    useEffect(() => {
        
    }, [])
    return (
        <div className="dashboard-main-container">
            <div className="widget">
                <div className="widget-title">
                    <div>Waste Collections per Kilogram</div>
                    <div>As of 2024</div>
                </div>
                <div className="widget-body">
                    <Bar options={barOptions} data={barChartData} />
                </div>
            </div>
            <div className="widget">
                <div className="widget-title">
                    <div>Waste Collections per Kilogram / Barangay</div>
                    <div>As of 2024</div>
                </div>
                <div className="widget-body">
                    <Line options={lineOptions} data={lineData} />
                </div>
            </div>
            <div className="widget">
                <div className="widget-title">
                    <div>Relationship of Waste Collected</div>
                    <div>As of 2024</div>
                </div>
                <div className="widget-body-pie">
                <Doughnut
                    options={pieOptions}
                    data={pieData}
                />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;