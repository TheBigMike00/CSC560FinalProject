import { Component, OnInit } from '@angular/core';
import { PropertyService } from './property.service';
import { Property } from './property';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PropertyService]
})
export class AppComponent implements OnInit {
  title = 'My Property Management';
  properties?: Property[];
  property?: Property;
  address?: string;
  propertyValue?: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties()
  {
    this.propertyService.getProperties().subscribe(properties => {
      this.properties = properties;
    });
  }

  addProperty()
  {
    const newProperty = {
      address: this.address ?? "Unknown Address",
      propertyValue: this.propertyValue ?? 0,
      monthlyIncome: this.monthlyIncome ?? 0,
      monthlyExpenses: this.monthlyExpenses ?? 0,
    }

    this.propertyService.addProperties(newProperty)
      .subscribe(property =>
        this.properties?.push(property));

    this.propertyService.getProperties().subscribe(properties => {
      this.properties = properties;
    });
  }

  deleteProperty(id:any)
  {
    var properties = this.properties;
    this.propertyService.deleteProperty(id)
      .subscribe(data => {
        if(data.n==1)
        {
          for(var i = 0; i<(properties?.length ?? 0); i++)
          {
            if(properties![i]._id == id)
            {
              properties!.splice(i,1);
            }
          }
        }
      });

      this.propertyService.getProperties().subscribe(properties => {
        this.properties = properties;
      });
  }

  updateProperty(id:any)
  {
    const updatedProperty = {
      address: this.address ?? "Unknown Address",
      propertyValue: this.propertyValue ?? 0,
      monthlyIncome: this.monthlyIncome ?? 0,
      monthlyExpenses: this.monthlyExpenses ?? 0,
    }

    this.propertyService.updateProperty(id, updatedProperty).subscribe();

    this.propertyService.getProperties().subscribe(properties => {
      this.properties = properties;
    });
  }

  getMostValuableProperty()
  {
    this.propertyService.getMostValuableProperty().subscribe(properties => {
      this.properties = properties;
    });
  }

  sortByMonthlyIncome()
  {
    this.propertyService.sortGreatestMonthlyIncome().subscribe(properties => {
      this.properties = properties;
    });
  }
  
}
