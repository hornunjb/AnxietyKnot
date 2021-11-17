import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chart:any;

  constructor() { }

  ngOnInit(): void {
    this.chart = document.getElementById('my_chart')
    Chart.register(...registerables);
    this.loadChart();
  }

  loadChart(): void{
    new Chart(this.chart, {
      type: 'line',
      data:{
        datasets:[{
          data:[12,65,44,56,42,59,80,61,77,54,76,100],
          label:'Mood Rate',
          backgroundColor: '#007bff',
          tension:0.2,
          borderColor: '#007bff',
        },
      ],  
      labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],

      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        scales:{
          y:{
            grid:{
              borderDash:[1,2],
              drawBorder:false,
            },
            beginAtZero:true,
          },
          x:{
            grid:{
              drawBorder:false,
            }
          }
        },
      },
    })
  }
}
