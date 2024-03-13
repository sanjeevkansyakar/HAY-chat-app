import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { getLast7Days } from "@/lib/features";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Filler,
    Tooltip,
    Legend
);

const labels = getLast7Days();

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },

    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
        },
    },
};

const LineChart = ({ value = [] }) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "jbkjsdb",
                fill: true,
                backgroundColor: "rgba(75, 12, 192, .2)",
                borderColor: "rgba(75, 12, 192, 1)",
            },
        ],
    };
    return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    cutout: 120,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                backgroundColor: [
                    "rgba(75, 12, 192, .2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: ["rgba(75, 12, 192, 1)", "rgba(255, 206, 86, 1)"],
                offset: 25,
            },
        ],
    };
    return (
        <Doughnut
            style={{ zIndex: 10 }}
            data={data}
            options={doughnutChartOptions}
        />
    );
};

export { LineChart, DoughnutChart };
