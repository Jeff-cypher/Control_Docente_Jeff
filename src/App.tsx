import { useState } from 'react';
import { Login } from './components/auth/Login';
import type { RegistroAsistencia } from './types/asistencia';
import { AsistenciaForm } from './components/asistencia/AsistenciaForm';
import { AsistenciaTable } from './components/asistencia/AsistenciaTable';

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<string | null>(null);
  const [seccionActiva, setSeccionActiva] = useState<'asistencia' | 'cursos' | 'parqueo'>('asistencia');
  const [registrosAsistencia, setRegistrosAsistencia] = useState<RegistroAsistencia[]>([]);

  const handleCerrarSesion = () => {
    setUsuarioAutenticado(null);
  };

  const agregarRegistroAsistencia = (nuevo: RegistroAsistencia) => {
    setRegistrosAsistencia([nuevo, ...registrosAsistencia]);
  };

  // Si no está autenticado, muestra el login con tema oscuro y acentos institucionales
  if (!usuarioAutenticado) {
    return <Login onLoginExitoso={(nombre) => setUsuarioAutenticado(nombre)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Barra de Navegación Superior con Tema Oscuro y acentos institucionales */}
      <header style={{ background: '#1e293b', borderBottom: '3px solid #38bdf8', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h2 style={{ margin: 0, color: '#38bdf8', fontSize: '20px' }}>Colegio Valle del Saber</h2>
          <span style={{ background: '#eab308', color: '#0f172a', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>VDS Admin</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>👤 <b>{usuarioAutenticado}</b></span>
          <button 
            onClick={handleCerrarSesion}
            style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Menú de Módulos (Navegación Interna) */}
      <nav style={{ background: '#111827', padding: '12px 30px', display: 'flex', gap: '15px', borderBottom: '1px solid #334155' }}>
        <button 
          onClick={() => setSeccionActiva('asistencia')}
          style={{ 
            background: seccionActiva === 'asistencia' ? '#22c55e' : 'transparent', 
            color: seccionActiva === 'asistencia' ? '#fff' : '#94a3b8', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          📊 Control de Asistencia
        </button>

        <button 
          onClick={() => setSeccionActiva('cursos')}
          style={{ 
            background: seccionActiva === 'cursos' ? '#22c55e' : 'transparent', 
            color: seccionActiva === 'cursos' ? '#fff' : '#94a3b8', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          📅 Asignación de Cursos y Horarios
        </button>

        <button 
          onClick={() => setSeccionActiva('parqueo')}
          style={{ 
            background: seccionActiva === 'parqueo' ? '#22c55e' : 'transparent', 
            color: seccionActiva === 'parqueo' ? '#fff' : '#94a3b8', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🚗 Control de Parqueo
        </button>
      </nav>

      {/* Contenido Principal según la Sección Activa */}
      <main style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>
        {seccionActiva === 'asistencia' && (
          <div>
            <h2 style={{ color: '#eab308', marginBottom: '20px' }}>Módulo de Seguimiento de Asistencia Inteligente</h2>
            <AsistenciaForm onAgregarRegistro={agregarRegistroAsistencia} />
            <AsistenciaTable registros={registrosAsistencia} />
          </div>
        )}

        {seccionActiva === 'cursos' && (
          <div style={{ background: '#1e293b', padding: '40px', borderRadius: '10px', textAlign: 'center', border: '1px solid #334155' }}>
            <h3 style={{ color: '#38bdf8' }}>Módulo de Asignación de Cursos y Horarios</h3>
            <p style={{ color: '#94a3b8' }}>Este módulo está listo para desarrollarse a continuación con la configuración de lunes a viernes.</p>
          </div>
        )}

        {seccionActiva === 'parqueo' && (
          <div style={{ background: '#1e293b', padding: '40px', borderRadius: '10px', textAlign: 'center', border: '1px solid #334155' }}>
            <h3 style={{ color: '#38bdf8' }}>Módulo de Control de Parqueo</h3>
            <p style={{ color: '#94a3b8' }}>Este módulo estará conectado próximamente para la gestión de espacios.</p>
          </div>
        )}
      </main>

    </div>
  );
}

export default App;