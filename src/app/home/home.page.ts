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
  userName: string = '';

  followersCount?: number;
  followingCount?: number;
  location?: string;

  buttonActive: boolean = true;

  constructor() {
  }

  formatDate(date: string): string {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    return formattedDate;
  }

  async searchUser() {
    const APIResponse = await fetch(`https://api.github.com/users/${this.searchName}/repos`);
    const APIReponseUser = await fetch(`https://api.github.com/users/${this.searchName}`);

    if (APIReponseUser.status === 200) {
      const data = await APIResponse.json();
      const dataUser = await APIReponseUser.json();

      this.getProjects(data);

      this.ownerAvatar = dataUser.avatar_url;
      this.userName = dataUser.name;
      this.followersCount = dataUser.followers;
      this.followingCount = dataUser.following;
      this.location = dataUser.location;

      this.notFound = false;

    } else if (APIResponse.status === 404) {
      this.notFound = true;
      this.projects = [];
    }
    else if (APIResponse.status === 403) {
      console.error("Muitas requisições");

    } else {
      console.error("Erro ao buscar usuario");
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

    this.buttonActive = true;

    return sorted;
  }

  sortProjectsDate(projects: any[]) {
    let sorted = projects.sort((a: any, b: any) => {
      if (a.created_at < b.created_at) return 1;
      if (a.created_at > b.created_at) return -1;
      return 0;
    });

    this.projects = [];
    this.projects = sorted;

    this.buttonActive = false;

    return sorted;
  }

  openProject(project: any) {
    const url = project.html_url;
    window.open(url, '_blank');
  }

}
