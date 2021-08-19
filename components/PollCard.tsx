import React, {FC} from 'react'
import {Pie} from "react-chartjs-2";

interface PollCardProps {
    title: string
}

const state = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Rainfall',
            backgroundColor: [
                '#F87171',
                '#FBBF24',
                '#34D399',
                '#60A5FA',
                '#A78BFA'
            ],
            hoverBackgroundColor: [
                '#EF4444',
                '#F59E0B',
                '#10B981',
                '#3B82F6',
                '#8B5CF6'
            ],
            data: [65, 59, 80, 81, 56]
        }
    ]
}

const PollCard: FC<PollCardProps> = (props) => {
    return (
        <div className="shadow-lg rounded p-6">
            <h5 className="text-2xl font-semibold mb-4">{props.title}</h5>
            <label htmlFor="options">
                <span className="block">Options</span>
                <select className="block w-full mt-2 w-56 border border-gray-300 p-2 rounded" name="options"
                        id="options">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </label>
            <div className="w-full mt-10">
                <Pie
                    data={state}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        }
                    }}
                />
            </div>
        </div>
    )
};

export default PollCard;
