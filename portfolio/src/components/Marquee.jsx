import './Marquee.css'

const items = [
  '100M+ Views', 'YouTube SEO', 'Content Strategy', 'Adobe Premiere Pro',
  'After Effects', '10+ Channels', 'Short Form', 'Reels', 'YouTube Shorts',
  'Power BI', 'Python', 'SQL', 'AI Videos', 'Brand Building', '50M Views/Month',
  'Thumbnail Design', 'Analytics', 'Creator Growth', 'Unacademy', '3 Years Experience',
]

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
