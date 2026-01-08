interface Areaitem {
  id: string;
  name: string;
  parent_id: string;
  utc_offset: string;
  areas: [];
}

export interface Area {
  areas: Array<Areaitem>;
  id: string;
  name: string;
  parent_id: null | string;
}
