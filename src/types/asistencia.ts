export type EstadoAsistencia = 'Presente' | 'Ausente' | 'Tardanza' | 'Permiso';

export interface RegistroAsistencia {
  id: string;
  nombreDocente: string;
  curso: string;
  fecha: string;
  horaEntrada: string;
  estado: EstadoAsistencia;
  observaciones?: string;
}