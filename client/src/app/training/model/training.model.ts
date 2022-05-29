export interface Training {
  id: number;
  jacina: number;
  naziv: string;
  opis: string;
  omiljeni: string;
  slika: string;
  spreman: boolean;
  brojvezbi?: number;
  trajanje?:number;
  kalorije?: number;
}

export function compareTrainings(t1: Training, t2: Training) {
    const compare = t1.id - t2.id;
    if (compare > 0) {
      return -1;
    } else if (compare < 0) {
      return 1;
    } else return 0;
}
