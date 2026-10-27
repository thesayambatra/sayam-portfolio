import './Footer.css'

const socials = [
  { label: 'Email',     href: 'mailto:sayambatra20@gmail.com', icon: '✉' },
  { label: 'Phone',     href: 'tel:+917840025266',             icon: '☏' },
  { label: 'YouTube',   href: 'https://youtube.com/@unacademylegends', icon: '▶' },
  { label: 'Instagram', href: 'https://www.instagram.com/2__of__us_', icon: '◉' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <p className="footer-logo">Sayam<span>.</span></p>
          <p className="footer-tagline">YouTube Growth · Creator Management · Video Editing</p>
        </div>
        <div className="footer-socials">
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="footer-social" aria-label={s.label}>
              <span>{s.icon}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 Sayam Batra. All rights reserved.</p>
        <a href="#hero" className="back-top">Back to top ↑</a>
      </div>
    </footer>
  )
}
