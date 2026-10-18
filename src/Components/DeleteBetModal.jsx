import React, { Component } from 'react'

export default class DeleteBetModal extends Component {
  render() {
    const { apuesta, isDeleting, onCancel, onConfirm } = this.props

    return (
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-bet-title"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id="delete-bet-title">
                Eliminar apuesta
              </h2>
              <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={onCancel}
                disabled={isDeleting}
              />
            </div>
            <div className="modal-body">
              <p className="mb-0">
                ¿Seguro que quieres eliminar la apuesta de{' '}
                <strong>{apuesta.usuario}</strong>?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar apuesta'}
              </button>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" onClick={onCancel} />
      </div>
    )
  }
}
