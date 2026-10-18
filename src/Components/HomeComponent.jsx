import React, { useState } from 'react'

const galleryItems = [
  {
    id: 1,
    title: 'El escenario',
    meta: 'Santiago Bernabeu',
    category: 'atmósfera',
    className: 'gallery-card gallery-card--wide',
    image:
      'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 2,
    title: 'Ritmo de partido',
    meta: '90 minutos de tensión',
    category: 'acción',
    className: 'gallery-card gallery-card--tall',
    image:
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    title: 'La grada',
    meta: 'Dos colores. Una rivalidad.',
    category: 'afición',
    className: 'gallery-card gallery-card--standard',
    image:
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 4,
    title: 'Noche de clásico',
    meta: 'Donde todo puede pasar',
    category: 'atmósfera',
    className: 'gallery-card gallery-card--standard',
    image:
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1000&q=85',
  },
]

const filters = ['todos', 'acción', 'afición', 'atmósfera']



export default function HomeComponent() {
  const [activeFilter, setActiveFilter] = useState('todos')

  const visibleItems =
    activeFilter === 'todos'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <main>
      <section className="hero" id="inicio">
        <div className="hero__texture" aria-hidden="true" />
        <div className="hero__content">
          <p className="hero__kicker">La rivalidad que lo detiene todo</p>
          <h1>
            EL
            <span>CLÁSICO</span>
          </h1>
          <p className="hero__intro">
            Dos escudos. Una ciudad dividida. La historia del fútbol español
            contada en imágenes.
          </p>
          <a className="button button--light" href="#galeria">
            Explorar el collage
            <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="hero__matchup" aria-label="Real Madrid contra Barcelona">
          <div className="club club--madrid">
            <span className="club__crest">RM</span>
            <strong>REAL<br />MADRID</strong>
          </div>
          <div className="versus">
            <span>EL</span>
            VS
          </div>
          <div className="club club--barca">
            <span className="club__crest">FCB</span>
            <strong>FC<br />BARCELONA</strong>
          </div>
        </div>
        <div className="hero__stamp" aria-hidden="true">
          <span>DESDE</span>
          <strong>1902</strong>
          <span>PARA SIEMPRE</span>
        </div>
      </section>

      <section className="intro" id="historia">
        <div className="section-label">01 / LA HISTORIA</div>
        <div className="intro__copy">
          <h2>Más que un partido.<br /><em>Un estado de ánimo.</em></h2>
          <p>
            Cuando Madrid y Barcelona se encuentran, el fútbol deja de ser
            solo fútbol. Es memoria, orgullo y una colección de instantes que
            se quedan a vivir en la grada.
          </p>
        </div>
        <div className="intro__line" aria-hidden="true" />
        <div className="intro__fact">
          <span className="intro__fact-number">∞</span>
          <span>Una rivalidad<br />sin final</span>
        </div>
      </section>

      <section className="gallery-section" id="galeria">
        <div className="gallery-heading">
          <div>
            <div className="section-label">02 / EL COLLAGE</div>
            <h2>Momentos<br /><em>inmortales.</em></h2>
          </div>
          <div className="gallery-controls" aria-label="Filtrar imágenes">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? 'filter filter--active' : 'filter'}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="gallery-grid">
          {visibleItems.map((item) => (
            <article className={item.className} key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="gallery-card__overlay">
                <span>{item.meta}</span>
                <h3>{item.title}</h3>
              </div>
              <span className="gallery-card__number">0{item.id}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <p className="quote-section__mark">“</p>
        <blockquote>
          El fútbol no es una cuestión de vida o muerte.
          <span>Es mucho más importante que eso.</span>
        </blockquote>
        <cite>— Bill Shankly</cite>
      </section>

      <footer className="site-footer">
        <div className="site-footer__brand">CLÁSICO<span>/26</span></div>
        <p>Una mirada visual a la rivalidad más grande del mundo.</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </main>
  )
}
