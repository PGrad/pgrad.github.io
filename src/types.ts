export interface Project {
  name: string;
  link: string;
  external: boolean;
  idx: number;
}

export interface Category {
  name: string;
  projects: Project[];
}
