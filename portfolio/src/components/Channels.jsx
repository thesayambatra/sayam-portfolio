import './Channels.css'

const unacademyChannels = [
  {
    handle: 'unacademylegends',
    url: 'https://youtube.com/@unacademylegends',
    name: 'Unacademy Legends',
    tag: 'Unacademy',
    desc: '50M+ views in a month. Highest video ~18M views. Full channel management.',
  },
  {
    handle: 'theupscwarriors',
    url: 'https://youtube.com/@theupscwarriors',
    name: 'The UPSC Warriors',
    tag: 'Unacademy',
    desc: 'First UPSC fanpage of Unacademy — built and grown from scratch.',
  },
  {
    handle: 'DhairyaVerse-e9f',
    url: 'https://www.youtube.com/@DhairyaVerse-e9f',
    name: 'DhairyaVerse',
    tag: 'Unacademy',
    desc: 'Content ideas, shoots, fun JEE questions. Managed Mar–Aug.',
  },
  {
    handle: 'queenofmath',
    url: 'https://www.youtube.com/@queenofmath',
    name: 'Queen of Math',
    tag: 'Unacademy',
    desc: 'Quote-based page, AE edits started by me. Motivation & trending songs content.',
  },
  {
    handle: 'DhairyaMamFanpage',
    url: 'https://www.youtube.com/@DhairyaMamFanpage',
    name: 'DhairyaMam Fanpage',
    tag: 'Unacademy',
    desc: 'Fetched from class content, brand content, ideas to educator. Managed Mar–Aug.',
  },
]

const creatorChannels = [
  {
    handle: 'adityakorde',
    url: 'https://youtube.com/@adityakorde',
    name: 'Aditya Korde',
    tag: 'Freelance',
    desc: 'Edits, thumbnails, and content ideas.',
  },
  {
    handle: 'thecodeskool',
    url: 'https://youtube.com/@thecodeskool',
    name: 'The Code Skool',
    tag: 'Freelance',
    desc: 'Video edits and content strategy.',
  },
  {
    handle: 'tavishhomeappliances',
    url: 'https://youtube.com/@tavishhomeappliances',
    name: 'Tavish Home Appliances',
    tag: 'Freelance',
    desc: 'AI videos, festival posters, promos, full brand building online.',
  },
]

const instaPages = [
  {
    handle: '2__of__us_',
    url: 'https://www.instagram.com/2__of__us_',
    name: '2 Of Us',
    tag: 'Instagram',
    desc: 'Managed content, reels, and page growth.',
  },
  {
    handle: 'air29dhairya',
    url: 'https://www.instagram.com/air29dhairya',
    name: 'Dhairya (air29dhairya)',
    tag: 'Instagram',
    desc: 'Content management for educator Dhairya.',
  },
  {
    handle: 'tavishhomeappliances05',
    url: 'https://www.instagram.com/tavishhomeappliances05',
    name: 'Tavish Home Appliances',
    tag: 'Instagram',
    desc: 'Festival posters, AI videos, promos & brand building.',
  },
  {
    handle: 'unacademy_pookie_',
    url: 'https://www.instagram.com/unacademy_pookie_',
    name: 'Unacademy Pookie',
    tag: 'Instagram',
    desc: 'Unacademy fan/community page management.',
  },
]

function ChannelCard({ channel, platform }) {
  const avatarUrl = platform === 'instagram'
    ? `https://unavatar.io/instagram/${channel.handle}`
    : `https://unavatar.io/youtube/${channel.handle}`

  const linkLabel = platform === 'instagram'
    ? `instagram.com/${channel.handle}`
    : `youtube.com/@${channel.handle}`

  return (
    <a href={channel.url} target="_blank" rel="noreferrer" className="channel-card">
      <img
        src={avatarUrl}
        alt={channel.name}
        className="channel-avatar"
        onError={(e) => { e.target.style.background = '#2d2d45'; e.target.src = '' }}
      />
      <div className="channel-info">
        <div className="channel-name-row">
          <span className="channel-name">{channel.name}</span>
          <span className={`channel-tag tag-${channel.tag.toLowerCase()}`}>{channel.tag}</span>
        </div>
        <p className="channel-desc">{channel.desc}</p>
        <span className="channel-link">{linkLabel} ↗</span>
      </div>
    </a>
  )
}

export default function Channels() {
  return (
    <section id="channels">
      <div className="container">
        <h2 className="section-title">Channels <span>& Pages</span></h2>

        <div className="channels-platform-label">
          <span className="platform-icon">▶</span> YouTube · Unacademy
          <span className="channels-period">Mar 2026 – Aug 2026</span>
        </div>
        <div className="channels-list">
          {unacademyChannels.map((c) => <ChannelCard key={c.handle} channel={c} platform="youtube" />)}
        </div>

        <div className="channels-platform-label" style={{ marginTop: '40px' }}>
          <span className="platform-icon">▶</span> YouTube · Freelance
          <span className="channels-period">2024 – 2026</span>
        </div>
        <div className="channels-list">
          {creatorChannels.map((c) => <ChannelCard key={c.handle} channel={c} platform="youtube" />)}
        </div>

        <div className="channels-platform-label" style={{ marginTop: '40px' }}>
          <span className="platform-icon insta-icon">◉</span> Instagram Pages
          <span className="channels-period">Managed</span>
        </div>
        <div className="channels-list">
          {instaPages.map((c) => <ChannelCard key={c.handle} channel={c} platform="instagram" />)}
        </div>
      </div>
    </section>
  )
}
