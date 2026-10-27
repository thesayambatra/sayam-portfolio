import { useEffect, useRef, useState } from 'react'
import './Impact.css'

const stats = [
  { value: 100, suffix: 'M+', label: 'Cumulative Views', color: 'red', desc: 'Across all managed platforms' },
  { value: 40,  suffix: 'M+', label: 'Views in One Month', color: 'purple', desc: 'July 2026, Unacademy JEE' },
  { value: 10,  suffix: '+',  label: 'YouTube Channels', color: 'green', desc: 'Managed simultaneously' },
  { value: 3,   suffix: 'yrs', label: 'Experience', color: 'orange', desc: 'Content, branding & editing' },
  { value: 5,   suffix: '+',  label: 'Interns Led', color: 'purple', desc: 'JEE content team at Unacademy' },
  { value: 8,   suffix: '+',  label: 'Instagram Pages', color: 'red', desc: 'Managed & grown' },
]

function Counter({ value, suffix, active }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const duration = 1500
    const step = Math.ceil(value / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [active, value])

  return <>{count}{suffix}</>
}

export default function Impact() {
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="impact" ref={ref} style={{ background: 'var(--bg)' }}>
      <div className="container">
        <h2 className="section-title">Impact & <span>Numbers</span></h2>
        <p className="impact-sub">Results that speak — built across 3 years of consistent work.</p>
        <div className="impact-grid">
          {stats.map((s, i) => (
            <div key={i} className={`impact-card impact-${s.color}`}>
              <div className={`impact-num impact-num-${s.color}`}>
                <Counter value={s.value} suffix={s.suffix} active={active} />
              </div>
              <div className="impact-label">{s.label}</div>
              <div className="impact-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
