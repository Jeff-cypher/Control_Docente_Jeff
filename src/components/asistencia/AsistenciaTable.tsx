import React from 'react';
import type { RegistroAsistencia } from '../../types/asistencia';

interface AsistenciaTableProps {
  registros: RegistroAsistencia[];
}

export const AsistenciaTable: React.FC<AsistenciaTableProps> = ({ registros }) => {
  const total = registros.length;
  const presentes = registros.filter(r => r.estado === 'Presente').length;
  const tardanzas = registros.filter(r => r.estado === 'Tardanza').length;
  const ausentes = registros.filter(r => r.estado === 'Ausente').length;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
        <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #38bdf8', textAlign: 'center' }}>
          <p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '13px' }}>Total Registros</p>
          <h2 style={{ margin: 0, color: '#fff' }}>{total}</h2>
        </div>
        <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #22c55e', textAlign: 'center' }}>
          <p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '13px' }}>Presentes</p>
          <h2 style={{ margin: 0, color: '#22c55e' }}>{presentes}</h2>
        </div>
        <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #eab308', textAlign: 'center' }}>
          <p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '13px' }}>Tardanzas</p>
          <h2 style={{ margin: 0, color: '#eab308' }}>{tardanzas}</h2>
        </div>
        <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ef4444', textAlign: 'center' }}>
          <p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '13px' }}>Ausentes</p>
          <h2 style={{ margin: 0, color: '#ef4444' }}>{ausentes}</h2>
        </div>
      </div>

      <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
        <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '15px' }}>📋 Historial de Asistencia Docente</h3>
        {registros.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>No hay registros de asistencia guardados todavía.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#fff' }}>
              <thead>
                <tr style={{ background: '#0f172a', borderBottom: '2px solid #334155' }}>
                  <th style={{ padding: '12px' }}>Docente</th>
                  <th style={{ padding: '12px' }}>Curso</th>
                  <th style={{ padding: '12px' }}>Fecha</th>
                  <th style={{ padding: '12px' }}>Hora</th>
                  <th style={{ padding: '12px' }}>Estado</th>
                  <th style={{ padding: '12px' }}>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((reg) => (
                  <tr key={reg.id} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '12px' }}>{reg.nombreDocente}</td>
                    <td style={{ padding: '12px' }}>{reg.curso}</td>
                    <td style={{ padding: '12px', color: '#94a3b8' }}>{reg.fecha}</td>
                    <td style={{ padding: '12px', color: '#94a3b8' }}>{reg.horaEntrada}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '4px', 
                        fontSize: '12px',
                        fontWeight: 'bold',
                        background: reg.estado === 'Presente' ? 'rgba(34, 197, 94, 0.2)' : reg.estado === 'Tardanza' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: reg.estado === 'Presente' ? '#22c55e' : reg.estado === 'Tardanza' ? '#eab308' : '#ef4444'
                      }}>
                        {reg.estado}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#94a3b8' }}>{reg.observaciones || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};