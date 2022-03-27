import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Post } from '../post.model';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  chart: any;

  constructor(private trackerService: TrackerService) {}

  ngOnInit(): void {
    this.chart = document.getElementById('my_chart');
    Chart.register(...registerables);
    console.log(this.trackerService.getMoods());
    new Chart(this.chart, {
      type: 'bar',
      data: {
        datasets: [
          {
            data: this.trackerService.getMoodsTallied(),
            label: 'Mood Tally',
            backgroundColor: '#007bff',
            borderColor: '#007bff',
          },
        ],
        labels: [
          'Very Sad',
          'Somewhat Sad',
          'Nuetral',
          'Somewhat Happy',
          'Very Happy',
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              borderDash: [1, 2],
              drawBorder: false,
            },
            beginAtZero: true,
            title: {
              display: true,
              text: 'Tally',
              color: 'black',
              font: {
                family: 'lato',
                size: 20,
                weight: 'bold',
                lineHeight: 1.2,
              },
            },
          },
          x: {
            grid: {
              drawBorder: false,
            },
            title: {
              display: true,
              text: 'Mood',
              color: 'black',
              font: {
                family: 'lato',
                size: 20,
                weight: 'bold',
                lineHeight: 1.2,
              },
            },
          },
        },
      },
    });
  }
}
