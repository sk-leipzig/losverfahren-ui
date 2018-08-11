export interface Self {
  href: string;
}

export interface Self2 {
  href: string;
  templated: boolean;
}

export interface Profile {
  href: string;
}

export interface Links2 {
  self: Self2;
  profile: Profile;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

