import { useState } from 'react'
import './EditingPortfolio.css'

const FOLDERS = {
  unacademy: 'https://drive.google.com/drive/folders/1iLkxV2196Ya9aecIiVhbNbfM9Asw2OVm?usp=drive_link',
  freelance:  'https://drive.google.com/drive/folders/1z-G4bxIqAfXX-2phqjY3rAHTuljw6bqV?usp=drive_link',
}

const tabs = [
  {
    key: 'freelance',
    label: 'Freelance Edits',
    badge: 'free',
    layout: 'mixed',
    folder: FOLDERS.freelance,
    portrait: [
      { id: '11TgidDl2NBvyGho4QccCdDbeRPsyqpH-', title: 'Borderplus' },
      { id: '1-WX1CUQBXk1k3pWaRtkaLgtOIaPAeC7V', title: 'Short Edit 2' },
      { id: '1TGGLvoHZyK_UC71ryu74axT_CdxICeqg', title: 'Short Edit 3' },
      { id: '1-Up3nH1AX_SGSdTcR0KhM-4ACwh7TTIN', title: 'Short Edit 4' },
      { id: '1J_S1sBu-8plyOfqxxgEk2t_I9-iiIC_0', title: 'Short Edit 5' },
      { id: '18JHxNKdAnk0QY9ymrZpvI4iHL9Yxvq09', title: 'Short Edit 6' },
    ],
    landscape: [
      { id: '1HdjIODCI-17kzh2t8mFyCDo04RR-sueX', title: 'Long Form Edit 1' },
      { id: '1EiJlhuTkkKuqOWXBtIXJgt98QUjBkvDH', title: 'Long Form Edit 2' },
      { id: '1n-ZDq9dm1a0AIHSY2fi4fYdMAoJY1z7x', title: 'School Annual Function Promo', desc: 'Directed & supported digital media. Full promo video.' },
    ],
  },
  {
    key: 'unacademy',
    label: 'Unacademy Edits',
    badge: 'una',
    layout: 'portrait',
    folder: FOLDERS.unacademy,
    videos: [
      { id: '1X-LreFiTHDMxxNaoBsdAyHsesiotETfs', title: 'Edit 1' },
      { id: '1r6TTHx6_2wPlA6Ghu4s0MPqEUDGpKZvo', title: 'Edit 2' },
      { id: '1rpiw3TAeGu9PzwTE-F5FZhatfjt56yoW', title: 'Edit 3' },
      { id: '1vAhVdQX8hYU1w87_BhOHnTON7vw_5xk4', title: 'Edit 4' },
      { id: '1ac72ni_XTuXv_YnlXBG-jcPq_qQWblGR', title: 'Edit 5' },
      { id: '19YwVlfvu3wU838yr4hZ164sS7Zl7qN51', title: 'Edit 6' },
    ],
  },
]

function thumb(id, size = 'w600') {
  return `https://drive.google.com/thumbnail?id=${id}&sz=${size}`
}

function viewLink(id) {
  return `https://drive.google.com/file/d/${id}/view`
}

function PlayIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.55)" />
      <polygon points="19,14 37,24 19,34" fill="white" />
    </svg>
  )
}

export default function EditingPortfolio() {
  const [active, setActive] = useState('unacademy')
  const tab = tabs.find(t => t.key === active)

  return (
    <section id="editing" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="ep-header">
          <div>
            <h2 className="section-title">Editing <span>Portfolio</span></h2>
            <p className="ep-subtitle">Short-form, long-form, reels, and event productions.</p>
          </div>
          <a href={tab.folder} target="_blank" rel="noreferrer" className="btn-secondary">
            {tab.key === 'unacademy' ? 'Unacademy Edits ↗' : 'Freelance Edits ↗'}
          </a>
        </div>

        {/* Tabs */}
        <div className="ep-tabs">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`ep-tab ep-tab-${t.badge} ${active === t.key ? 'ep-tab-active' : ''}`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Portrait layout — horizontal scroll */}
        {tab.layout === 'portrait' && (
          <div className="ep-portrait-row">
            {tab.videos.map(v => (
              <a key={v.id} href={viewLink(v.id)} target="_blank" rel="noreferrer" className="ep-portrait-card">
                <div className="ep-portrait-thumb">
                  <img src={thumb(v.id, 'w400')} alt={v.title} loading="lazy" />
                  <div className="ep-overlay"><PlayIcon size={44} /></div>
                </div>
                <p className="ep-card-title">{v.title}</p>
              </a>
            ))}
          </div>
        )}

        {/* Mixed layout — short form row + long form grid */}
        {tab.layout === 'mixed' && (
          <>
            <p className="ep-group-label">Short Form · 9:16</p>
            <div className="ep-portrait-row" style={{ marginBottom: '36px' }}>
              {tab.portrait.map(v => (
                <a key={v.id} href={viewLink(v.id)} target="_blank" rel="noreferrer" className="ep-portrait-card">
                  <div className="ep-portrait-thumb">
                    <img src={thumb(v.id, 'w400')} alt={v.title} loading="lazy" />
                    <div className="ep-overlay"><PlayIcon size={44} /></div>
                  </div>
                  <p className="ep-card-title">{v.title}</p>
                </a>
              ))}
            </div>
            <p className="ep-group-label">Long Form · 16:9</p>
            <div className="ep-landscape-grid">
              {tab.landscape.map(v => (
                <a key={v.id} href={viewLink(v.id)} target="_blank" rel="noreferrer" className="ep-landscape-card">
                  <div className="ep-landscape-thumb">
                    <img src={thumb(v.id, 'w800')} alt={v.title} loading="lazy" />
                    <div className="ep-overlay"><PlayIcon size={56} /></div>
                  </div>
                  <div className="ep-landscape-info">
                    <p className="ep-card-title">{v.title}</p>
                    {v.desc && <p className="ep-card-desc">{v.desc}</p>}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {/* Landscape layout — grid */}
        {tab.layout === 'landscape' && (
          <div className="ep-landscape-grid">
            {tab.videos.map(v => (
              <a key={v.id} href={viewLink(v.id)} target="_blank" rel="noreferrer" className="ep-landscape-card">
                <div className="ep-landscape-thumb">
                  <img src={thumb(v.id, 'w800')} alt={v.title} loading="lazy" />
                  <div className="ep-overlay"><PlayIcon size={56} /></div>
                </div>
                <div className="ep-landscape-info">
                  <p className="ep-card-title">{v.title}</p>
                  {v.desc && <p className="ep-card-desc">{v.desc}</p>}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
