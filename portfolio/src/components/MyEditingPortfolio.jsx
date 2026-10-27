import './MyEditingPortfolio.css'

const shortForm = [
  { id: '11TgidDl2NBvyGho4QccCdDbeRPsyqpH-', title: 'Borderplus' },
  { id: '1-WX1CUQBXk1k3pWaRtkaLgtOIaPAeC7V', title: 'Short Edit 2' },
  { id: '1TGGLvoHZyK_UC71ryu74axT_CdxICeqg', title: 'Short Edit 3' },
  { id: '1-Up3nH1AX_SGSdTcR0KhM-4ACwh7TTIN', title: 'Short Edit 4' },
]

const longForm = [
  { id: '1HdjIODCI-17kzh2t8mFyCDo04RR-sueX', title: 'Long Form Edit 1' },
  { id: '1EiJlhuTkkKuqOWXBtIXJgt98QUjBkvDH', title: 'Long Form Edit 2' },
  { id: '1n-ZDq9dm1a0AIHSY2fi4fYdMAoJY1z7x', title: 'School Annual Function Promo', desc: 'Directed & supported digital media. Full promo video of the annual function.' },
]

const FOLDER = 'https://drive.google.com/drive/folders/1z-G4bxIqAfXX-2phqjY3rAHTuljw6bqV?usp=drive_link'

function thumb(id) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w800`
}

function viewLink(id) {
  return `https://drive.google.com/file/d/${id}/view`
}

export default function MyEditingPortfolio() {
  return (
    <section id="my-editing">
      <div className="container">
        <div className="mep-header">
          <div>
            <h2 className="section-title">My Editing <span>Portfolio</span></h2>
            <p className="mep-subtitle">Personal edits — short-form, long-form, and event productions.</p>
          </div>
          <a href={FOLDER} target="_blank" rel="noreferrer" className="btn-secondary">
            View Full Portfolio ↗
          </a>
        </div>

        {/* Short Form */}
        <div className="mep-group-label">
          <span className="mep-badge mep-badge-red">Short Form · 9:16</span>
        </div>
        <div className="mep-short-row">
          {shortForm.map((v) => (
            <a key={v.id} href={viewLink(v.id)} target="_blank" rel="noreferrer" className="mep-short-card">
              <div className="mep-short-thumb">
                <img src={thumb(v.id)} alt={v.title} loading="lazy" />
                <div className="mep-play-overlay">
                  <svg viewBox="0 0 48 48" width="48" height="48">
                    <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.55)" />
                    <polygon points="19,14 37,24 19,34" fill="white" />
                  </svg>
                </div>
              </div>
              <p className="mep-card-title">{v.title}</p>
            </a>
          ))}
        </div>

        {/* Long Form */}
        <div className="mep-group-label" style={{ marginTop: '40px' }}>
          <span className="mep-badge mep-badge-purple">Long Form · 16:9</span>
        </div>
        <div className="mep-long-grid">
          {longForm.map((v) => (
            <a key={v.id} href={viewLink(v.id)} target="_blank" rel="noreferrer" className="mep-long-card">
              <div className="mep-long-thumb">
                <img src={thumb(v.id)} alt={v.title} loading="lazy" />
                <div className="mep-play-overlay">
                  <svg viewBox="0 0 48 48" width="56" height="56">
                    <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.55)" />
                    <polygon points="19,14 37,24 19,34" fill="white" />
                  </svg>
                </div>
              </div>
              <div className="mep-long-info">
                <p className="mep-card-title">{v.title}</p>
                {v.desc && <p className="mep-card-desc">{v.desc}</p>}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
