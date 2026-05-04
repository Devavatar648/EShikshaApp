import { Component, inject } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-admindashboard',
  imports: [BaseChartDirective],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css',
})
export class Admindashboard {
  private loadingService = inject(LoadingService);
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56],
        label: 'INSTRUCTOR',
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)'
      },
      {
        data: [28, 48, 40, 19, 86],
        label: 'STUDENT',
        borderColor:'rgba(255,99,132,1)',
        backgroundColor:'rgba(255,99,132,0.2)'
      }
    ]
  }

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {display:true},
      title: {display:true, text:"Monthly Student and Teacher Joining"}
    }
  }


  ngOnInit(){
    this.loadingService.isLoading$.next(false);
  }
}
