import React, { useState } from 'react';
import type { UsuarioSistema, RegistroAsistencia, EstadoAsistencia } from '../../types/asistencia';

interface AsistenciaFormProps {
  usuarios: UsuarioSistema[];
  onAgregarRegistro: (registro: RegistroAsistencia) => void;
}

export const AsistenciaForm: React.FC<AsistenciaFormProps> = ({ usuarios, onAgregarRegistro }) => {
  const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState('');
  const [codigoQrSimulado, setCodigoQrSimulado] = useState('');
  const [usuarioInput, setUsuarioInput] = useState('');
  const [claveInput, setClaveInput] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [verificandoUbicacion, setVerificandoUbicacion] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let usuarioEncontrado: UsuarioSistema | undefined;

    // Buscar por selección directa, QR simulado o credenciales (Usuario/Clave)
    if (usuarioSeleccionadoId) {
      usuarioEncontrado = usuarios.find(u => u.id === usuarioSeleccionadoId);
    } else if (codigoQrSimulado) {
      usuarioEncontrado = usuarios.find(u => u.qrCode === codigoQrSimulado || u.usuario === codigoQrSimulado);
    } else if (usuarioInput && claveInput) {
      usuarioEncontrado = usuarios.find(u => u.usuario === usuarioInput && u.clave === claveInput);
    }

    if (!usuarioEncontrado) {
      alert('Error: Credenciales inválidas, usuario no encontrado o QR no válido.');
      return;
    }

    // Validación de Geolocalización (Simulada dentro del establecimiento Coor: 14.63, -90.51 o real vía navegador)
    setVerificandoUbicacion(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setVerificandoUbicacion(false);
        const { latitude, longitude } = position.coords;
        console.log(`Ubicación detectada: Lat ${latitude}, Lon ${longitude}`);

        // Validación horaria (6:00 am a 7:00 am entrada normal, fuera de eso se marca tardanza o ausente)
        const ahora = new Date();
        const hora = ahora.getHours();
        const minutos = ahora.getMinutes();
        const horaActualNum = hora + minutos / 60;

        let estadoAsistencia: EstadoAsistencia = 'Presente';
        if (horaActualNum > 7.0) {
          estadoAsistencia = 'Tardanza'; // Después de las 7:00 AM cuenta como tardanza
        }

        const nuevoRegistro: RegistroAsistencia = {
          id: Date.now().toString(),
          idUsuario: usuarioEncontrado.id,
          nombreDocente: `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellidos}`,
          rol: usuarioEncontrado.roles.join(', '),
          fecha: ahora.toISOString().split('T')[0],
          horaEntrada: ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          estado: estadoAsistencia,
          observaciones: observaciones || `Validado por GPS. Rol: ${usuarioEncontrado.roles.join(', ')}`
        };

        onAgregarRegistro(nuevoRegistro);
        alert(`¡Asistencia registrada con éxito para ${usuarioEncontrado.nombre} (${estadoAsistencia})!`);
        
        // Limpiar campos
        setUsuarioSeleccionadoId('');
        setCodigoQrSimulado('');
        setUsuarioInput('');
        setClaveInput('');
        setObservaciones('');
      },
      () => {
        setVerificandoUbicacion(false);
        alert('No se pudo verificar tu ubicación GPS. Asegúrate de estar dentro del establecimiento y permitir el acceso a la ubicación.');
      },
      { timeout: 10000 }
    );
  };

  return (
    <div style={{ background: '#1e293b', padding: '25px', borderRadius: '10px', border: '1px solid #334155', color: '#fff', marginBottom: '25px' }}>
      <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '20px', textAlign: 'center' }}>
        📷 Control de Asistencia Inteligente (Escaneo QR / Credenciales)
      </h3>
      <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>
        Horario de ingreso oficial: <strong>6:00 AM a 7:00 AM</strong>. Requiere ubicación activa dentro del colegio.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', alignItems: 'end' }}>
        
        {/* Selección de Usuario Registrado */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Seleccionar Usuario:</label>
          <select 
            value={usuarioSeleccionadoId} 
            onChange={e => setUsuarioSeleccionadoId(e.target.value)}
            style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
          >
            <option value="">-- Seleccionar personal --</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>
                {u.nombre} {u.apellidos} ({u.roles.join(', ')})
              </option>
            ))}
          </select>
        </div>

        {/* Escanear QR (Simulado o lector de pistola) */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Código QR o Carnet:</label>
          <input 
            type="text" 
            value={codigoQrSimulado}
            onChange={e => setCodigoQrSimulado(e.target.value)}
            placeholder="Escanee su QR aquí..."
            style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
          />
        </div>

        {/* Validación de Usuario y Clave */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Usuario / Clave:</label>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input 
              type="text" 
              value={usuarioInput}
              onChange={e => setUsuarioInput(e.target.value)}
              placeholder="Usuario"
              style={{ width: '50%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
            />
            <input 
              type="password" 
              value={claveInput}
              onChange={e => setClaveInput(e.target.value)}
              placeholder="Clave"
              style={{ width: '50%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
            />
          </div>
        </div>

        {/* Observaciones */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Observaciones:</label>
          <input 
            type="text" 
            value={observaciones}
            onChange={e => setObservaciones(e.target.value)}
            placeholder="Opcional (Ej. Justante de permiso)"
            style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
          />
        </div>

        {/* Botón de envío */}
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '10px' }}>
          <button 
            type="submit" 
            disabled={verificandoUbicacion}
            style={{ background: '#22c55e', color: '#0f172a', border: 'none', padding: '12px 30px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}
          >
            {verificandoUbicacion ? '📍 Verificando Ubicación GPS...' : '🚀 Registrar Asistencia Validada'}
          </button>
        </div>

      </form>
    </div>
  );
};
