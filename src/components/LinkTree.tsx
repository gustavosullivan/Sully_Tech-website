import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CONTACTS } from '../data'
import { ContactIcon } from './ContactIcon'
import logoSully from '../assets/logo-sully.png'

type LinkTreeProps = {
  variant?: 'page' | 'modal'
  onClose?: () => void
}

const entries = [
  CONTACTS.whatsapp,
  CONTACTS.email,
  CONTACTS.linkedin,
  CONTACTS.site,
] as const

export function LinkTree({ variant = 'page', onClose }: LinkTreeProps) {
  const navigate = useNavigate()
  const isModal = variant === 'modal'

  useEffect(() => {
    if (!isModal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    const prevOverflow = document.body.style.overflow
    const prevTouch = document.body.style.touchAction
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.touchAction = prevTouch
      window.removeEventListener('keydown', onKey)
    }
  }, [isModal, onClose])

  const content = (
    <div className={isModal ? 'modal-panel' : 'linktree'}>
      {!isModal && <div className="linktree__bg" aria-hidden />}
      {isModal && (
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
      )}
      <div className="linktree__card">
        <div className="linktree__logo">
          <img src={logoSully} alt="Sully Tech" />
        </div>
        <h1 className="linktree__title">SULLY</h1>
        <p className="linktree__subtitle">TECH AND DEVELOPMENT</p>
        <p className="linktree__heading">Entre em contato</p>
        <p className="linktree__prompt">
          <span>&gt;</span> escolha o canal_
        </p>
        <ul className="linktree__list">
          {entries.map((item) => {
            const isSite = item.icon === 'site'
            if (isSite) {
              return (
                <li key={item.label} className="linktree__item">
                  {isModal ? (
                    <button
                      type="button"
                      onClick={() => {
                        onClose?.()
                        navigate('/')
                      }}
                    >
                      <span className="linktree__icon">
                        <ContactIcon name={item.icon} />
                      </span>
                      <span>
                        <span className="linktree__label">{item.label}</span>
                        <span className="linktree__hint">{item.hint}</span>
                      </span>
                      <span className="linktree__arrow">&gt;</span>
                    </button>
                  ) : (
                    <Link to="/">
                      <span className="linktree__icon">
                        <ContactIcon name={item.icon} />
                      </span>
                      <span>
                        <span className="linktree__label">{item.label}</span>
                        <span className="linktree__hint">{item.hint}</span>
                      </span>
                      <span className="linktree__arrow">&gt;</span>
                    </Link>
                  )}
                </li>
              )
            }

            return (
              <li key={item.label} className="linktree__item">
                <a href={item.href} target="_blank" rel="noreferrer">
                  <span className="linktree__icon">
                    <ContactIcon name={item.icon} />
                  </span>
                  <span>
                    <span className="linktree__label">{item.label}</span>
                    <span className="linktree__hint">{item.hint}</span>
                  </span>
                  <span className="linktree__arrow">&gt;</span>
                </a>
              </li>
            )
          })}
        </ul>
        <p className="linktree__footer">[ READY ] █</p>
      </div>
    </div>
  )

  if (isModal) {
    return createPortal(
      <div
        className="modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Entre em contato — Sully Tech"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose?.()
        }}
      >
        {content}
      </div>,
      document.body,
    )
  }

  return content
}
