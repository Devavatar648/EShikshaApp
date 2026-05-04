import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { LoadingService } from './services/loading-service';
import { Loading } from './components/loading/loading';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Loading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('E-Shiksha');
  // Custom services
  private loadingService = inject(LoadingService);

  loading = signal<boolean>(false);

  ngOnInit(){
    this.loadingService.isLoading$.subscribe(res=>{
      this.loading.set(res);
    })
  }


}
