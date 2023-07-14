import { Component } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  projects: any[] = [];
  searchName: string = '';
  notFound!: boolean ;
  ownerAvatar: string = '';
  loginName: string = '';

  constructor() {
  }

  formatDate(date: string): string {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    return formattedDate;
  }

  async searchUser() {
    this.projects = [];
    const APIResponse = await fetch(`https://api.github.com/users/${this.searchName} /repos`);

    console.log(APIResponse);


    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      this.getProjects(data);

      this.ownerAvatar = data[0].owner.avatar_url;
      this.loginName = data[0].owner.login;

      this.notFound = false;

    } else if (APIResponse.status === 404) {
      this.notFound = true;
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

  onSearchChange() {
    this.searchUser();
    console.log("this.searchName", this.searchName);
  }

  openProject(project: any) {
    const url = project.html_url;
    window.open(url, '_blank');
  }

}
