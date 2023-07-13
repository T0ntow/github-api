import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  projects: any[] = [];
  searchName: string = '';

  constructor() {
    this.searchUser('Flipesouza16');
  }


  async searchUser(user: string) {

    const APIResponse = await fetch(`https://api.github.com/${user}/repos`)
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();

      this.getProjects(data);
      console.log(data);

      return data;

    } else {
      console.log("BO");

    }
  }

  getProjects(data: any) {
    data.forEach((element: any) => {
      this.projects.push(element);
    });

    console.log(this.projects);
  }

  async onSearchChange() {
    await this.searchUser(this.searchName);
    console.log("this.searchName", this.searchName);
  }

}
