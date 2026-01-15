
'use client';
import React from 'react';
import { Area,XAxis, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

interface ChartData {
    week: string;
    products: number;

}

export default function ProductsChart({ data }: { data: ChartData[] }) {

console.log("Products Chart Data:", data);

    return (
       <div className="h-48 w-full ">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke='#f0f0f0' />
<XAxis dataKey="week" stroke="#666"  fontSize={12} tickLine={false} axisLine={false}/>
<YAxis stroke="#666" fontSize={12} tickLine={false} allowDecimals={false} />

<Area type="monotone" dataKey="products" stroke="#666"  fontSize={12}
//  axisLine={false} tickLine={false} allowDecimals={false}  
 /> 
<Tooltip contentStyle={{ background:"white", border:"1px solid e5e5e5", borderRadius:"8px", boxShadow:"0 4px 6px -1px rgba(0,0,0,0.1)"}}
                    labelStyle={{ color: "#374151", fontWeight: "500" }}
/>

            </AreaChart>
        </ResponsiveContainer>

       </div>
    );
}