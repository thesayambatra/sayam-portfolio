import './Certifications.css'

const certs = [
  { name: 'Microsoft Excel', issuer: 'Microsoft DigiSaksham' },
  { name: 'Video Editing', issuer: 'Adobe Premiere Pro & After Effects' },
  { name: 'YouTube Analytics', issuer: 'YouTube Studio & Channel Analytics' },
  { name: 'AWS Academy Graduate', issuer: 'Cloud Foundations' },
  { name: 'AI & Machine Learning', issuer: 'Intel Unnati | CHRIST University' },
  { name: 'Data Science Foundations', issuer: 'IBM' },
]

export default function Certifications() {
  return (
    <section id="certifications" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <h2 className="section-title">Certifi<span>cations</span></h2>
        <div className="cert-grid">
          {certs.map((c, i) => (
            <div key={i} className="card cert-card">
              <div className="cert-icon">🎓</div>
              <div>
                <h3 className="cert-name">{c.name}</h3>
                <p className="cert-issuer">{c.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
