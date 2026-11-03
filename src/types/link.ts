export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  category?: "all" | "project" | "blog" | "contact";
  badge?: string;
  color?: string; // custom accent gradient
}

export interface ProfileData {
  name: string;
  title?: string;
  bio: string;
  status?: string;
  avatarUrl: string;
  links: LinkItem[];
  socials?: {
    github?: string;
    blog?: string;
    instagram?: string;
    email?: string;
    linkedin?: string;
  };
}
