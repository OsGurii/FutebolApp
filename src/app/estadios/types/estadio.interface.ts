import { GramadoEnum } from './gramado.enum';

export interface EstadioInterface {
  id?: number | null;
  nome: string;
  dataFundacao: Date;
  endereco: string;
  capacidade: number;
  gramado: GramadoEnum;
}
