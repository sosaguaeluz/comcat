export interface listCity {
  id: number,
  nome:string,
  sigla: string
};

export interface City {
  id: number,
  nome:string,
  sigla: string
};

export interface listUf  {
  nome:string,
  sigla: string
};

export interface UF {
    states: listUf[]
};

export interface User {
    id: string,
    name: string,
    age: string,
    phone_number: string,
    email: string,
    password: string,
    state: string,
    city: string,
    genre: string,
    breed: string,
    active: true,
    trusted: false,
    role: string,
    first_access: boolean,
    settings: {
      user: string,
      service_notifications: [
        string
      ],
      all_notifications: boolean,
      push_token: string,
      _id: string
    },
    _id: string,
    createdAt: string,
    updatedAt: string
    token: string
};

export interface AllUsers {
  data: [{
    name: string,
    age: string,
    phone_number: string,
    email: string,
    password: string,
    state: string,
    city: string,
    genre: string,
    breed: string,
    active: true,
    trusted: boolean,
    role: string,
    first_access: boolean,
    settings: {
      user: string,
      service_notifications: [
        string
      ],
      all_notifications: boolean,
      push_token: string,
      _id: string
    },
    id: string,
    createdAt: string,
    updatedAt: string
  }],
  meta:[{
    page: any,
    take: any,
    itemCount: any,
    pageCount: any,
    hasPreviousPage: any,
    hasNextPage: any
  }]
}

export interface AllMessages {
  data: [
    {
      name: string,
      email: string,
      reason: string,
      message: string,
      message_reply: string,
      status: string,
      createdAt: string,
      updatedAt: string,
      _id: string
    }
  ],
  meta:{
    page: number,
    take: number,
    itemCount: number,
    pageCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
  }
}

export interface User_setings {
    user: string,
    service_notifications: [
      string
    ],
    all_notifications: boolean,
    push_token: string,
    _id: string
};

interface BreedSummary {
  total: number;
  name: string;
  percent: number;
}

interface GenreSummary {
  total: number;
  name: string;
  percent: number;
}

interface Service {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  image: string;
  background_color: string;
  active: boolean;
  other_option: boolean;
}

interface BreedChart {
  yellow: number;
  white: number;
  indigenous: number;
  brown: number;
  black: number;
}

interface GenreChart {
  male: number;
  female: number;
  nonbinary: number;
  others: number;
}

interface LineChart {
  service: Service;
  value: number;
  breed_chart: BreedChart;
  genre_chart: GenreChart;
}

interface Service3 {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  image: string;
  background_color: string;
  active: boolean;
  other_option: boolean;
}

interface Service2 {
  month: string;
  service: Service3;
  total: number;
}

interface Monthly {
  month: string;
  total: number;
  services: Service2[];
}

interface AnnualOccurrences {
  year: string;
  total: number;
  monthly_rate: number;
  monthly: Monthly[];
}

export interface Dashboard_Occurrences {
  total: number;
  new_today: number;
  approved_today: number;
  disapproved_today: number;
  breed_summary: BreedSummary[];
  genre_summary: GenreSummary[];
  line_charts: LineChart[];
  annual_occurrences: AnnualOccurrences;
}

export interface Dashboard_Users {
    total: number,
    new_today: number,
    active_today: number,
    inactive_today: number,
    line_charts: [
      string
    ],
    annual_users: {
      total: number,
      monthly: number
    }
};

export type State_List = {
    name: string,
    user_total: number
};

export interface Dashboard_region_Users {
  name: string,
  state_list: State_List[]
  user_total: number
};

export interface Dashboard_region_Occurrences{
  name: string,
  state_list: State_List[],
  user_total: number,
  occurrences_total: number
};

export interface Messages {
    name?: string,
    email?: string,
    reason?: string,
    message?: string,
    message_reply?: string,
    status?: string,
    createdAt?: string,
    updatedAt?: string,
    _id?: string
};

export interface Notifications {
    data: [
      title: string,
      message: string,
      occurrence: Occurrences,
      service: string,
      status: string,
      error: string,
      sending_attempts: number,
      _id: string,
      createdAt: string,
      updatedAt: string
    ],
    meta: {
      page:	number,
      take:	number,
      itemCount:	number,
      pageCount:	number,
      hasPreviousPage:	boolean,
      hasNextPage:	boolean
    }
};

export interface Occurrences {
    data: [{
      service: {
        image: string,
        name: string,
        background_color: string,
        active: boolean,
        other_option: boolean,
        sources: [
          string
        ],
        _id: string
      },
      source: string,
      source_name: string,
      date: string,
      restoration_date: string,
      address: string,
      neighborhood: string,
      city: string,
      state: string,
      country: string,
      special_place: string,
      have_energy_meter: string,
      have_hydrometer: string,
      have_reservoir: string,
      type_place: string,
      area: string,
      description: string,
      restoration_description: string,
      agree_share: boolean,
      latitude: string,
      longitude: string,
      status: string,
      finished_status: string,
      user: {
        name: string,
        age: string,
        phone_number: string,
        email: string,
        password: string,
        state: string,
        city: string,
        genre: string,
        breed: string,
        active: boolean,
        trusted: boolean,
        role: string,
        first_access: boolean,
        id: string,
        createdAt: string,
        updatedAt: string
      },
      id: string,
      createdAt: string,
      updatedAt: string,
    }],
    meta: {
      page: any,
      take: any,
      itemCount: any,
      pageCount: any,
      hasPreviousPage: any,
      hasNextPage: any
    }
};

export interface Occurrences_map {
      service: {
        image: string,
        name: string,
        background_color: string,
        active: boolean,
        other_option: boolean,
        sources: [
          string
        ],
        _id: string
      },
      source: string,
      source_name: string,
      date: string,
      restoration_date: string,
      address: string,
      neighborhood: string,
      city: string,
      state: string,
      country: string,
      special_place: string,
      have_energy_meter: string,
      have_hydrometer: string,
      have_reservoir: string,
      type_place: string,
      area: string,
      description: string,
      restoration_description: string,
      agree_share: boolean,
      latitude: string,
      longitude: string,
      status: string,
      finished_status: string,
      user: {
        name: string,
        age: string,
        phone_number: string,
        email: string,
        password: string,
        state: string,
        city: string,
        genre: string,
        breed: string,
        active: boolean,
        trusted: boolean,
        role: string,
        first_access: boolean,
        _id: string,
        createdAt: string,
        updatedAt: string
      },
      _id: string,
      createdAt: string,
      updatedAt: string
};

export interface Services {
    image?: string,
    name?: string,
    background_color?: string,
    active?: boolean,
    other_option?: boolean,
    sources?: Soucers[],
    id?: string
};

export type ServiceFormData = {
  image?: string,
  name: string,
  background_color: string,
  active: boolean,
  other_option: boolean,
  sources?: SourceFormData[],
  id?: string
}

export type SourceFormData = {
  service?: string,
  name?: string,
  id?: string
  _id?: string
}

export interface Soucers {
    service: string,
    name: string,
    id?: string
    _id?: string
};

export interface Uploads {
    file: any,
    id?: string
};

