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
  notFound!: boolean;
  ownerAvatar: string = '';
  loginName: string = '';

  constructor() {
    this.searchUser();
  }

  formatDate(date: string): string {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    return formattedDate;
  }

  async searchUser() {
    const APIResponse = await fetch(`https://api.github.com/users/T0ntow/repos`);

    if (APIResponse.status === 200) {
      const data = await APIResponse.json();

      this.getProjects(data);

      this.ownerAvatar = data[0].owner.avatar_url;
      this.loginName = data[0].owner.login;

      this.notFound = false;

    } else if (APIResponse.status === 404) {
      this.notFound = true;
    } else {
      console.log("Erro ao buscar usuario");
    }
  }

  getProjects(data: any) {
    this.projects = [];

    data.forEach((element: any) => {
      this.projects.push(element);
    });
  }

  sortProjectsDefault(projects: any[]) {
    let sorted = projects.sort((a: any, b: any) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    this.projects = [];
    this.projects = sorted;
    return sorted;
  }

  sortProjectsDate(projects: any[]) {
    let sorted = projects.sort((a: any, b: any) => {
      if (a.created_at < b.created_at) return -1;
      if (a.created_at > b.created_at) return 1;
      return 0;
    });

    this.projects = [];
    this.projects = sorted;
    return sorted;
  }

  onSearchChange() {
    this.searchUser();
  }

  openProject(project: any) {
    const url = project.html_url;
    window.open(url, '_blank');
  }

}
