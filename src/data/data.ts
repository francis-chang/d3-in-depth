export interface Data {
  nodes?: NodesEntity[] | null;
  links?: LinksEntity[] | null;
}
export interface NodesEntity {
  id: number;
  name: string;
  gender: string;
}
export interface LinksEntity {
  source: number;
  target: number;
}

export const data: Data = {
  nodes: [
    {
      id: 1,
      name: 'Andy',
      gender: 'male',
    },
    {
      id: 2,
      name: 'Betty',
      gender: 'female',
    },
    {
      id: 3,
      name: 'Cate',
      gender: 'female',
    },
    {
      id: 4,
      name: 'Dave',
      gender: 'male',
    },
    {
      id: 5,
      name: 'Ellen',
      gender: 'female',
    },
    {
      id: 6,
      name: 'Fiona',
      gender: 'female',
    },
    {
      id: 7,
      name: 'Garry',
      gender: 'male',
    },
    {
      id: 8,
      name: 'Holly',
      gender: 'female',
    },
    {
      id: 9,
      name: 'Iris',
      gender: 'female',
    },
    {
      id: 10,
      name: 'Jane',
      gender: 'female',
    },
  ],
  links: [
    {
      source: 1,
      target: 2,
    },
    {
      source: 1,
      target: 5,
    },
    {
      source: 1,
      target: 6,
    },

    {
      source: 2,
      target: 3,
    },
    {
      source: 2,
      target: 7,
    },
    {
      source: 3,
      target: 4,
    },
    {
      source: 8,
      target: 3,
    },
    {
      source: 4,
      target: 5,
    },
    {
      source: 4,
      target: 9,
    },
    {
      source: 5,
      target: 10,
    },
  ],
};
