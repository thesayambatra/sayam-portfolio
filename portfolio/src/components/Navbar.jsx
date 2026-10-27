import { useState } from 'react'
import './Navbar.css'

const links = [
  { label: 'About',      href: 'about' },
  { label: 'Experience', href: 'experience' },
  { label: 'Skills',     href: 'skills' },
  { label: 'Editing',    href: 'editing' },
  { label: 'Channels',   href: 'channels' },
  { label: 'Certs',      href: 'certifications' },
  { label: 'Contact',    href: 'contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#hero" className="nav-logo">Sayam<span>.</span></a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a href={`#${l.href}`} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
