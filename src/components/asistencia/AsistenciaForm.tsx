import React, { useState } from 'react';
import type { RegistroAsistencia, EstadoAsistencia } from '../../types/asistencia';

interface AsistenciaFormProps {
  onAgregarRegistro: (registro: RegistroAsistencia) => void;
}

export const AsistenciaForm: React.FC<AsistenciaFormProps> = ({ onAgregarRegistro }) => {
  const [nombreDocente, setNombreDocente] = useState('');
  const [curso, setCurso] = useState('');
  const [estado, setEstado] = useState<EstadoAsistencia>('Presente');
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreDocente.trim() || !curso.trim()) return;

    const nuevoRegistro: RegistroAsistencia = {
      id: Date.now().toString(),
      nombreDocente,
      curso,
      fecha: new Date().toISOString().split('T')[0],
      horaEntrada: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estado,
      observaciones,
    };

    onAgregarRegistro(nuevoRegistro);
    setNombreDocente('');
    setCurso('');
    setObservaciones('');
  };

  return (
    <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155', marginBottom: '25px' }}>
      <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '15px' }}>➕ Registrar Asistencia de Docente</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '13px' }}>Nombre del Docente:</label>
          <input 
            type="text" 
            value={nombreDocente} 
            onChange={(e) => setNombreDocente(e.target.value)} 
            placeholder="Ej. Ing. Pérez"
            required 
            style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '13px' }}>Curso:</label>
          <input 
            type="text" 
            value={curso} 
            onChange={(e) => setCurso(e.target.value)} 
            placeholder="Ej. Programación I"
            required 
            style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '13px' }}>Estado:</label>
          <select 
            value={estado} 
            onChange={(e) => setEstado(e.target.value as EstadoAsistencia)}
            style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
          >
            <option value="Presente">Presente</option>
            <option value="Ausente">Ausente</option>
            <option value="Tardanza">Tardanza</option>
            <option value="Permiso">Permiso</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '13px' }}>Observaciones:</label>
          <input 
            type="text" 
            value={observaciones} 
            onChange={(e) => setObservaciones(e.target.value)} 
            placeholder="Opcional"
            style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <button type="submit" style={{ width: '100%', background: '#22c55e', color: '#fff', padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Guardar Registro
          </button>
        </div>
      </form>
    </div>
  );
};