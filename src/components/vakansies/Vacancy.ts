// Вспомогательный интерфейс для простых объектов {id, name}
export interface DictionaryItem {
  id: string;
  name: string;
}

interface Area {
  id: string;
  name: string;
  url: string;
}

interface Salary {
  from: number | null;
  to: number | null;
  currency: string;
  gross: boolean;
}

interface SalaryRange extends Salary {
  mode: DictionaryItem;
  frequency: DictionaryItem;
}

interface Address {
  city: string | null;
  street: string | null;
  building: string | null;
  lat: number | null;
  lng: number | null;
  description: string | null;
  raw: string | null;
  metro: null; 
  metro_stations: unknown[]; 
  id: string;
}

interface LogoUrls {
  original: string;
  [key: string]: string; 
}

interface Employer {
  id: string;
  name: string;
  url: string;
  alternate_url: string;
  logo_urls: LogoUrls | null;
  vacancies_url: string;
  country_id: number;
  accredited_it_employer: boolean;
  trusted: boolean;
}

interface Snippet {
  requirement: string | null;
  responsibility: string | null;
}


export interface Vacancy {
  id: string;
  premium: boolean;
  name: string;
  department: null; 
  has_test: boolean;
  response_letter_required: boolean;
  area: Area;
  salary: Salary | null;
  salary_range: SalaryRange | null;
  type: DictionaryItem;
  address: Address | null;
  response_url: string | null;
  sort_point_distance: number | null;
  published_at: string;
  created_at: string;
  archived: boolean;
  apply_alternate_url: string;
  show_logo_in_search: boolean | null;
  show_contacts: boolean;
  insider_interview: null;
  url: string;
  alternate_url: string;
  relations: unknown[];
  employer: Employer;
  snippet: Snippet;
  contacts: null;
  schedule: DictionaryItem;
  working_days: DictionaryItem[];
  working_time_intervals: DictionaryItem[];
  working_time_modes: DictionaryItem[];
  accept_temporary: boolean;
  fly_in_fly_out_duration: unknown[];
  work_format: DictionaryItem[];
  working_hours: DictionaryItem[];
  work_schedule_by_days: DictionaryItem[];
  night_shifts: boolean;
  professional_roles: DictionaryItem[];
  accept_incomplete_resumes: boolean;
  experience: DictionaryItem;
  employment: DictionaryItem;
  employment_form: DictionaryItem | null;
  internship: boolean;
  adv_response_url: string | null;
  is_adv_vacancy: boolean;
  adv_context: null;
}