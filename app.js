import { about } from './data/about.js';
import { education } from './data/education.js';
import { experience } from './data/experience.js';
import { projects } from './data/projects.js';
import { tutoring } from './data/tutoring.js';
import { contact } from './data/contact.js';

const $ = (id) => document.getElementById(id);

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function renderHero() {
  $('hero').innerHTML = `
    <div>
      <h1>${about.headline}</h1>
      <p>${escapeHtml(about.description)}</p>
    </div>
    <div class="avatar-wrap">
      <img src="${escapeHtml(about.avatar)}" alt="${escapeHtml(about.name)} avatar" />
    </div>
  `;
}

function expItem({ title, subtitle, date, icon }) {
  const iconHtml = icon
    ? `<img src="${escapeHtml(icon)}" alt="" />`
    : '';
  return `
    <div class="exp-item">
      <div class="exp-icon">${iconHtml}</div>
      <div class="body">
        <h3>${escapeHtml(title)}</h3>
        <div class="role">${escapeHtml(subtitle)}</div>
      </div>
      <div class="date">${escapeHtml(date)}</div>
    </div>
  `;
}

function renderEducation() {
  $('education-list').innerHTML = education
    .map((e) => expItem({ title: e.school, subtitle: e.degree, date: e.date, icon: e.icon }))
    .join('');
}

function renderExperience() {
  $('experience-list').innerHTML = experience
    .map((e) => expItem({ title: e.company, subtitle: e.role, date: e.date, icon: e.icon }))
    .join('');
}

function renderProjects() {
  $('carousel').innerHTML = projects
    .map((p) => {
      const [from, to] = p.gradient || ['#d9e8ff', '#ffe6f0'];
      const imgStyle = p.image
        ? `background-image: url('${escapeHtml(p.image)}'); background-size: cover; background-position: center;`
        : `background: linear-gradient(135deg, ${from}, ${to});`;
      const tags = (p.tags || [])
        .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
        .join('');
      const href = p.link || '#';
      const target = p.link && p.link.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
      return `
        <a class="proj" href="${escapeHtml(href)}"${target}>
          <div class="proj-img" style="${imgStyle}">${p.image ? '' : 'image'}</div>
          <div class="proj-body">
            <h3>${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(p.description)}</p>
            <div class="tags">${tags}</div>
          </div>
        </a>
      `;
    })
    .join('');
}

function renderTutoring() {
  $('tutoring-card').innerHTML = `
    <div>
      <h3 style="font-size:18px; font-weight:600; margin-bottom:6px;">${escapeHtml(tutoring.name)}</h3>
      <p>${escapeHtml(tutoring.description)}</p>
    </div>
    <a class="btn" href="${escapeHtml(tutoring.url)}" target="_blank" rel="noopener">${escapeHtml(tutoring.cta)}</a>
  `;
}

const ICONS = {
  email: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  github: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg>',
  resume: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>',
};

function renderContact() {
  const links = contact.links
    .map((l) => {
      const target = l.external ? ' target="_blank" rel="noopener"' : '';
      const icon = l.icon && ICONS[l.icon] ? `<span class="contact-icon">${ICONS[l.icon]}</span>` : '';
      return `<a href="${escapeHtml(l.href)}"${target}>${icon}${escapeHtml(l.label)}</a>`;
    })
    .join('');
  $('contact-card').innerHTML = `
    <p style="color: var(--muted); font-size: 15px; margin-bottom: 16px;">${escapeHtml(contact.intro)}</p>
    <div class="contact-row">${links}</div>
  `;
}

function setupCarousel() {
  $('car-prev').addEventListener('click', () =>
    $('carousel').scrollBy({ left: -300, behavior: 'smooth' }),
  );
  $('car-next').addEventListener('click', () =>
    $('carousel').scrollBy({ left: 300, behavior: 'smooth' }),
  );
}

function setupNav() {
  const navUl = document.querySelector('nav ul');
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const toggle = document.querySelector('.nav-toggle');

  toggle.addEventListener('click', () => navUl.classList.toggle('open'));
  navLinks.forEach((a) =>
    a.addEventListener('click', () => navUl.classList.remove('open')),
  );

  // Map each nav link to its target section, plus any extra section it should "cover"
  // (e.g. Education scrolls past while Experience nav stays active).
  const navTargets = navLinks
    .map((link) => {
      const id = link.getAttribute('href').slice(1);
      const main = document.getElementById(id);
      // The Experience nav points to #education; also cover the Work section below it.
      const extras = id === 'education' ? [document.getElementById('experience-work')] : [];
      return { link, sections: [main, ...extras].filter(Boolean) };
    })
    .filter((t) => t.sections.length);

  function updateActive() {
    // Active = the last nav target whose topmost section has scrolled within `threshold` px of the top.
    // This means short sections (Tutoring) win over tall ones below (Contact) until Contact's own
    // top edge actually enters the upper zone.
    const threshold = 120;
    let bestIdx = 0;
    let bestTop = -Infinity;

    navTargets.forEach((t, i) => {
      const top = Math.min(...t.sections.map((s) => s.getBoundingClientRect().top));
      if (top <= threshold && top > bestTop) {
        bestTop = top;
        bestIdx = i;
      }
    });

    navTargets.forEach((t, i) => t.link.classList.toggle('active', i === bestIdx));
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  window.addEventListener('resize', updateActive);
  updateActive();
}

renderHero();
renderEducation();
renderExperience();
renderProjects();
renderTutoring();
renderContact();
setupCarousel();
setupNav();
