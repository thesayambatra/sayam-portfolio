import './Contact.css'

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Get in <span>Touch</span></h2>
        <div className="contact-wrap">
          <p className="contact-intro">
            Open to freelance work, collaborations, and full-time opportunities. Feel free to reach out.
          </p>
          <div className="contact-cards">
            <a href="mailto:sayambatra20@gmail.com" className="card contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <p className="contact-label">Email</p>
                <p className="contact-value">sayambatra20@gmail.com</p>
              </div>
            </a>
            <a href="tel:+917840025266" className="card contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <p className="contact-label">Phone</p>
                <p className="contact-value">+91 78400 25266</p>
              </div>
            </a>
          </div>
          <div className="edu-section card">
            <h3 className="edu-title">Education</h3>
            <p className="edu-degree">Bachelor of Computer Applications (BCA)</p>
            <p className="edu-school">Christ University, Delhi NCR Campus</p>
            <p className="edu-period">Jul 2023 – Jul 2026</p>
          </div>
        </div>
      </div>
    </section>
  )
}
