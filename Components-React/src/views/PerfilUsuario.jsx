import React, { useState } from 'react';
import imagenUsuario from '../assets/img/User.png';
import useUploadServerImg from '../services/useFetchServerImageUpload';
import useChangeImg from '../services/useFetchChangeProfileImage';

function PerfilUserInfo() {
  const [selectedFile, setSelectedFile] = useState(null); // Estado para el archivo seleccionado
  const [imagePreview, setImagePreview] = useState(imagenUsuario); // Vista previa de la imagen
  const [isUploading, setIsUploading] = useState(false); // Estado de carga

  const uploadServerImg = useUploadServerImg(); // Hook para subir imagen al servidor
  const changeImg = useChangeImg(); // Hook para confirmar el cambio de imagen

  // Manejar la selección del archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Mostrar vista previa de la imagen seleccionada
    }
  };

  // Subir la imagen al servidor
  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);
      try {
        // Subir la imagen al servidor
        const response = await uploadServerImg(selectedFile);
        if (response.success) {
          alert('Imagen subida correctamente');
        } else {
          alert('Error al subir la imagen');
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        alert('Hubo un error al subir la imagen');
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Confirmar el cambio de imagen
  const handleChangeProfileImg = async () => {
    try {
      const response = await changeImg();
      if (response.success) {
        alert('Cambio de imagen confirmado');
      } else {
        alert('Error al confirmar el cambio de imagen');
      }
    } catch (error) {
      console.error('Error al confirmar el cambio de imagen:', error);
      alert('Hubo un error al confirmar el cambio');
    }
  };

  return (
    <div className="card">
      <span className="card-enc"><b>Información de Perfil</b></span>
      <svg width="100%" height="2" viewBox="0 0 1093 2" fill="none">
        <path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
      </svg>
      <div className='card-content'>
        <div className='cardHorizontal'>
          <form className="card-50">
            <h4><b>Perfil del Usuario:</b> 000 / usuario</h4>
            {/* Imagen de usuario con vista previa */}
            <img src={imagePreview} alt="Imagen de usuario" />
            <div className='card-form'>
              <span>Cambiar imagen de perfil</span>
              <input type="file" id="uploadFileProblem" onChange={handleFileChange} />
              <label htmlFor="uploadFileProblem" className="btn --btn-azul --btn-sm" id="btn-upload-file-problem">Seleccionar archivo</label>
            </div>
            <button type="button" className='btn --btn-azul --btn-sm' onClick={handleUpload} disabled={isUploading}>
              {isUploading ? 'Subiendo...' : 'Subir imagen'}
            </button>
          </form>
          {/* Resto del formulario */}
          <form className="card-50">
            <span className='tiempo-psw'>Último cambio de contraseña hace 38 días</span>
            <div className='card-form'>
              <span>Antigua contraseña</span>
              <input type="password" id="psw-antique" />
            </div>
            <div className='card-form'>
              <span>Nueva contraseña</span>
              <input type="password" id="uploadpsw" />
            </div>
            <div className='card-form'>
              <span>Confirmar nueva contraseña</span>
              <input type="password" id="uploadpsw-confirm" />
            </div>
            <div className='card-button'>
              <button className='btn --btn-azul'>Confirmar cambio</button>
            </div>
          </form>
        </div>

        <div className='card-button'>
          <button className='btn' onClick={handleChangeProfileImg}>Guardar cambios</button>
        </div>
      </div>
    </div>
  );
}

export default PerfilUserInfo;
