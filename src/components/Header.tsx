import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logoSully from '../assets/logo-sully.png'

type HeaderProps = {
  onOpenContacts: () => void
}

export function Header({ onOpenContacts }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="site-header__glass">
        <div className="container site-header__row">
          <Link to="/" className="brand" onClick={close}>
            <span className="brand__mark brand__mark--logo">
              <img src={logoSully} alt="Sully Tech" />
            </span>
            <span className="brand__text">
              <span className="brand__name">SULLY</span>
              <span className="brand__sub">TECH AND DEVELOPMENT</span>
            </span>
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '×' : '☰'}
          </button>

          <nav className={`nav${open ? ' is-open' : ''}`}>
            <a href="#empresa" className="nav__pip" onClick={close}>
              Empresa
            </a>
            <a href="#sobre" className="nav__pip" onClick={close}>
              Sobre
            </a>
            <a href="#projetos" className="nav__pip" onClick={close}>
              Projetos
            </a>
            <a href="#servicos" className="nav__pip" onClick={close}>
              Serviços
            </a>
            <Link to="/site" className="nav__pip" onClick={close}>
              /site
            </Link>
            <button
              type="button"
              className="nav__pip nav__pip--cta"
              onClick={() => {
                close()
                onOpenContacts()
              }}
            >
              Contatos
            </button>
          </nav>
        </div>
      </div>

      {open && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Fechar menu"
          onClick={close}
        />
      )}
    </header>
  )
}
