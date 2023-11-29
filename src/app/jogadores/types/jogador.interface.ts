import { EquipeInterface } from 'src/app/equipes/types/equipe.interface';
import { GeneroEnum } from './genero.enum';
import { PosicaoEnum } from './posicao.enum'

export interface JogadorInterface {
  id?: number | null;
  nome: string;
  dataNascimento: Date;
  genero: GeneroEnum;
  posicao: PosicaoEnum;
  equipe: EquipeInterface;
}
