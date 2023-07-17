import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { AlgorithmsAndMitigationComponent } from './components/algorithms-and-mitigation/algorithms-and-mitigation.component';
import { WellPerformanceComponent } from './components/well-performance/well-performance.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AlertListComponent } from './components/alert-list/alert-list.component';

const routes: Routes = [
  { path: '', component: FeatureComponent, 
    children: [
    {path: '', component: SidenavComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'alert-list', component: AlertListComponent }
      ]
    },
    {path: 'well-performance', component: WellPerformanceComponent},
    {path: 'algorithm-mitigations', component: AlgorithmsAndMitigationComponent}

  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
