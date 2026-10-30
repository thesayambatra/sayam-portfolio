import { useState } from 'react'
import './Navbar.css'

const links = [
  { label: 'About',      href: 'about' },
  { label: 'Impact',     href: 'impact' },
  { label: 'Experience', href: 'experience' },
  { label: 'Services',   href: 'services' },
  { label: 'Editing',    href: 'editing' },
  { label: 'Channels',   href: 'channels' },
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
        <div className="nav-cta-wrap">
          <a
            href="https://drive.google.com/uc?export=download&id=1gIQGyCp6sKGjEpqe2Lj_Oyiyac1gRxTW"
            target="_blank"
            rel="noreferrer"
            className="nav-resume"
          >↓ Resume</a>
          <a href="#contact" className="nav-cta">Let's Work</a>
        </div>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
