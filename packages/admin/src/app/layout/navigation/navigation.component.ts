import { Component, OnInit } from '@angular/core';

interface INavigationTreeElementBase {
  name: string;
  expanded?: boolean;
  external?: string;
}

interface INavigationTreeElementChild extends INavigationTreeElementBase {
  route?: string;
}

interface INavigationTreeElement extends INavigationTreeElementBase {
  icon: string;
  route?: string;
  children?: INavigationTreeElementChild[]
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  async ngOnInit(): Promise<void> {
  }

  domainsRoutes: INavigationTreeElementChild[] = [];

  navExpanded = true;

  navigationTree: INavigationTreeElement[] = [
    {
      name: "Dashboard",
      icon: "dashboard-outline",
      route: "dashboard"
    },
    {
      name: "Users",
      icon: "users",
      route: "users"
    },
    {
      name: "Series",
      icon: "play",
      route: "series"
    },
    {
      name: "Reports",
      icon: "warning-filled",
      route: "reports"
    },
    {
      name: "Uploads health",
      icon: "flame",
      route: "health"
    },
    {
      name: "Settings",
      icon: "gear-small",
      route: "settings",
      children: [
        {
          name: "Config",
          route: "settings/config"
        },
        {
          name: "Permissions",
          route: "settings/permisions"
        }
      ]
    },
    {
      name: "Source code",
      icon: "html-code",
      external: "https://github.com/ScuroGuardiano/moonlight"
    }
  ];

  get logo() {
    return this.navExpanded ? "Moonlight Admin" : "MA";
  }

  trackByName(_index: number, item: any): string {
    return item.name;
  }

}
