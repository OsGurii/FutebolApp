import { EstadioInterface } from 'src/app/estadios/types/estadio.interface';
import { AbrangenciaEnum } from './abrangencia.enum';

export interface CampeonatoInterface {
  id?: number | null;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  abrangencia: AbrangenciaEnum;
  estadio: EstadioInterface;
  equipes: string[];
}
