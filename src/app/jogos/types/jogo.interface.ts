import { CampeonatoInterface } from "src/app/campeonatos/types/campeonatos.interface";
import { EquipeInterface } from "src/app/equipes/types/equipe.interface";

export interface JogoInterface {
  id?: number | null;
  golMandante: number;
  golVisitante: number;
  mandante: EquipeInterface;
  visitante: EquipeInterface;
  campeonato: CampeonatoInterface;
}
