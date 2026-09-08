import React, { useState } from 'react';
import type { UsuarioSistema, RolUsuario } from '../../types/asistencia';

interface UsuarioFormProps {
  onAgregarUsuario: (usuario: UsuarioSistema) => void;
}

export const UsuarioForm: React.FC<UsuarioFormProps> = ({ onAgregarUsuario }) => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  
  // Roles seleccionados por defecto Docente
  const [roles, setRoles] = useState<Record<RolUsuario, boolean>>({
    Docente: true,
    Coordinador: false,
    Limpieza: false,
    Seguridad: false,
    Administracion: false,
  });

  const [resena, setResena] = useState('');

  const handleRolChange = (rol: RolUsuario) => {
    setRoles(prev => ({ ...prev, [rol]: !prev[rol] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !usuario.trim() || !clave.trim()) return;

    const rolesSeleccionados = (Object.keys(roles) as RolUsuario[]).filter(r => roles[r]);

    const nuevoUsuario: UsuarioSistema = {
      id: Date.now().toString(),
      nombre,
      apellidos,
      email,
      telefono,
      usuario,
      clave,
      roles: rolesSeleccionados,
      resena,
      qrCode: `VDS-USER-${usuario}-${Date.now()}` // Identificador único para el QR
    };

    onAgregarUsuario(nuevoUsuario);

    // Limpiar formulario
    setNombre('');
    setApellidos('');
    setEmail('');
    setTelefono('');
    setUsuario('');
    setClave('');
    setResena('');
    alert('¡Usuario registrado con éxito y código QR generado!');
  };

  return (
    <div style={{ background: '#1e293b', padding: '25px', borderRadius: '10px', border: '1px solid #334155', color: '#fff', marginBottom: '25px' }}>
      <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
        ✏️ Nuevo usuario (Registro de Personal VDS)
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: '20px' }}>
        
        {/* Columna Izquierda y Central: Inputs */}
        <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Nombre</label>
            <input 
              type="text" 
              value={nombre} 
              onChange={e => setNombre(e.target.value)} 
              required 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
              placeholder="Ej. Juan Carlos"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Apellidos</label>
            <input 
              type="text" 
              value={apellidos} 
              onChange={e => setApellidos(e.target.value)} 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
              placeholder="Ej. Pérez Gómez"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
              placeholder="correo@valledelsaber.edu.gt"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Teléfono</label>
            <input 
              type="text" 
              value={telefono} 
              onChange={e => setTelefono(e.target.value)} 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
              placeholder="Ej. 5555-5555"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Usuario</label>
            <input 
              type="text" 
              value={usuario} 
              onChange={e => setUsuario(e.target.value)} 
              required 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
              placeholder="jperez"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Clave</label>
            <input 
              type="password" 
              value={clave} 
              onChange={e => setClave(e.target.value)} 
              required 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Columna Derecha: Roles tipo Switch */}
        <div style={{ background: '#0f172a', padding: '15px', borderRadius: '8px', border: '1px solid #334155' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '12px' }}>Roles del Sistema</label>
          {(['Docente', 'Coordinador', 'Limpieza', 'Seguridad', 'Administracion'] as RolUsuario[]).map(rol => (
            <div key={rol} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px' }}>{rol}</span>
              <input 
                type="checkbox" 
                checked={roles[rol]} 
                onChange={() => handleRolChange(rol)}
                style={{ accentColor: '#38bdf8', width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>

        {/* Archivos y Reseña */}
        <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Foto actual</label>
            <input type="file" style={{ fontSize: '12px', color: '#94a3b8' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Reseña profesional</label>
            <input 
              type="text" 
              value={resena} 
              onChange={e => setResena(e.target.value)} 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
              placeholder="Breve descripción o especialidad"
            />
          </div>
        </div>

        <div style={{ gridColumn: 'span 3', display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '15px' }}>
          <button type="button" style={{ background: '#475569', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Cerrar</button>
          <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Guardar Usuario</button>
        </div>

      </form>
    </div>
  );
};