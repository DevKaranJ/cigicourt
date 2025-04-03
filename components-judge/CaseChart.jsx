import React, { useEffect } from "react";
import * as echarts from "echarts";

const CaseChart = () => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById("caseChart"));
    chart.setOption({
      title: { text: "Case Distribution", textStyle: { color: "#1a237e", fontSize:"1.2rem" } },
      tooltip: { trigger: "item" },
      color: ["red", "#ffd700", "#28a745", "#007bff"],
      series: [
        {
          name: "Cases",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "55%"],
          avoidLabelOverlap: true,
          labelLine: { show: false },
          data: [
            { value: 5, name: "Urgent" },
            { value: 10, name: "Pending" },
            { value: 10, name: "Complete" },
            { value: 20, name: "In Progress" },
          ],
          itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
          label: { show: false, formatter: "{b}: {c}%" }
        },
      ],
    });
  }, []);

  return <div id="caseChart" style={{ width: "100%", height: "200px",marginTop:"10px" }}></div>;
};

export default CaseChart;


