import './Quote.css'

export default function Quote() {
  return (
    <section className="quote-section">
      <div className="container">
        <div className="quote-card">
          <div className="quote-mark">"</div>
          <p className="quote-text">
            I don't just manage channels — I obsess over why some videos get 18M views and others get 18K. That gap is where I work.
          </p>
          <div className="quote-author">
            <span className="quote-name">Sayam Batra</span>
            <span className="quote-role">YouTube Growth Specialist</span>
          </div>
        </div>
      </div>
    </section>
  )
}
