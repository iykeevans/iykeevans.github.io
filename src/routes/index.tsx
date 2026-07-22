import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

const PROJECTS = [
  {
    num: "01",
    name: "Nerve V2",
    stack: "REACT · TS",
    desc: "Core banking software powering Kuda, the money app for Africans — plus a component library built on the company design system that boosted frontend productivity by up to 50%.",
  },
  {
    num: "02",
    name: "ChefJoy",
    stack: "NEXT.JS",
    desc: "Web app that lets users book private chefs with the tap of a button — from discovery to booking in one smooth flow.",
  },
  {
    num: "03",
    name: "ANSPPB",
    stack: "VUE",
    desc: "Digitized the Anambra State Physical Planning Board — moving written petitions and contraventions into a fully online workflow for the state government.",
  },
  {
    num: "04",
    name: "Optima",
    stack: "NUXT",
    desc: "Inventory management platform that tracks stock and handles accounting and taxes for small businesses.",
  },
];

const JOBS = [
  {
    period: "2021 — NOW",
    company: "Kuda",
    role: "Senior Frontend Engineer",
    tech: "REACT",
    highlight:
      "Building Nerve V2 core banking + a design-system component library (+50% FE productivity).",
  },
  {
    period: "2021",
    company: "Crestsage",
    role: "Principal Frontend Engineer",
    tech: "VUE",
    highlight:
      "Led frontend architecture and set engineering standards for the team.",
  },
  {
    period: "2021",
    company: "BFree",
    role: "Senior Frontend Engineer",
    tech: "VUE",
    highlight:
      "Built customer-facing debt-management flows used across multiple markets.",
  },
  {
    period: "2019 — 2021",
    company: "Scelloo",
    role: "Senior Frontend Engineer",
    tech: "VUE · NUXT",
    highlight:
      "Shipped Optima inventory + accounting platform for small businesses.",
  },
  {
    period: "2019",
    company: "Techbarn",
    role: "Frontend Engineer",
    tech: "REACT",
    highlight: "Delivered client web products on tight timelines.",
  },
  {
    period: "2017 — 2019",
    company: "Brindocorp",
    role: "Frontend Engineer",
    tech: "VUE",
    highlight:
      "Started the journey — production Vue apps and internal tooling.",
  },
];

const SKILLS = [
  "React",
  "Vue",
  "TypeScript",
  "Next.js",
  "Nuxt.js",
  "GraphQL",
  "Node.js",
  "Express",
  "Fastify",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "AWS",
  "Sass",
  "Figma",
];

const POSTS = [
  {
    title: "Building a component library your team will actually use",
    tag: "DESIGN SYSTEMS",
    href: "#writing",
  },
  {
    title: "Lessons from building banking software at scale",
    tag: "FRONTEND",
    href: "#writing",
  },
  {
    title: "Digitizing government workflows with Vue",
    tag: "CASE STUDY",
    href: "#writing",
  },
];

const NAME_LINES = ["IKENNA", "EZEANI"];
const MARQUEE =
  "REACT  ✦  VUE  ✦  TYPESCRIPT  ✦  NEXT.JS  ✦  NUXT  ✦  GRAPHQL  ✦  NODE.JS  ✦  POSTGRESQL  ✦  MONGODB  ✦  AWS  ✦  ";

function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const cleanup: Array<() => void> = [];
    const on = <K extends keyof (WindowEventMap & HTMLElementEventMap)>(
      el: Window | HTMLElement,
      ev: string,
      fn: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions,
    ) => {
      el.addEventListener(ev, fn, opts);
      cleanup.push(() => el.removeEventListener(ev, fn, opts));
    };

    // reveals + masked headings + counters
    const countUp = (el: HTMLElement) => {
      const target = parseInt(el.dataset.count || "0", 10);
      const dur = 600;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        el.textContent = String(Math.round(t * target)).padStart(2, "0");
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t = e.target as HTMLElement;
          if (t.classList.contains("mask")) {
            const inner = t.querySelector("h2");
            if (inner) inner.style.transform = "translateY(0)";
          } else {
            t.classList.add("in");
            const c = t.querySelector<HTMLElement>("[data-count]");
            if (c) countUp(c);
          }
          io.unobserve(t);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    root.querySelectorAll<HTMLElement>(".reveal, .mask").forEach((n, i) => {
      if (n.classList.contains("reveal")) {
        const d = (i % 3) * 0.07;
        n.style.transitionDelay = `${d}s`;
      }
      io.observe(n);
    });

    // scroll progress + percentage + parallax
    const bar = root.querySelector<HTMLElement>(".progress-bar");
    const pct = root.querySelector<HTMLElement>(".scrollpct");
    const parallax = Array.from(
      root.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (bar) bar.style.width = `${p * 100}%`;
        if (pct)
          pct.textContent = String(Math.round(p * 100)).padStart(3, "0") + "%";
        if (!reduce)
          parallax.forEach((el) => {
            const sp = parseFloat(el.dataset.parallax || "0");
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2 - window.innerHeight / 2;
            el.style.transform = `rotate(-1.2deg) translateY(${-center * sp}px)`;
          });
        ticking = false;
      });
    };
    on(window, "scroll", onScroll, { passive: true });
    on(window, "resize", onScroll);
    onScroll();

    if (!reduce && finePointer) {
      // custom cursor
      const dot = document.createElement("div");
      dot.className = "cursor-dot";
      const ring = document.createElement("div");
      ring.className = "cursor-ring";
      document.body.append(dot, ring);
      cleanup.push(() => {
        dot.remove();
        ring.remove();
      });
      let mx = innerWidth / 2,
        my = innerHeight / 2,
        rx = mx,
        ry = my;
      on(window, "mousemove", ((e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = `${mx}px`;
        dot.style.top = `${my}px`;
      }) as EventListener);
      let raf = 0;
      const loop = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
        raf = requestAnimationFrame(loop);
      };
      loop();
      cleanup.push(() => cancelAnimationFrame(raf));
      root
        .querySelectorAll<HTMLElement>(
          "a, .card, [data-magnetic], .exp-row, .flip",
        )
        .forEach((t) => {
          on(t, "mouseenter", () => {
            ring.style.width = ring.style.height = "56px";
            ring.style.borderColor = "#c96f3f";
            dot.style.background = "#c96f3f";
          });
          on(t, "mouseleave", () => {
            ring.style.width = ring.style.height = "34px";
            ring.style.borderColor = "rgba(20,17,14,0.4)";
            dot.style.background = "#14110e";
          });
        });

      // magnetic buttons
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
        on(btn, "mousemove", ((e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          btn.style.transform = `translate(${dx * 0.3}px, ${dy * 0.4}px)`;
        }) as EventListener);
        on(btn, "mouseenter", () => {
          btn.style.transition = "transform 0.1s ease";
        });
        on(btn, "mouseleave", () => {
          btn.style.transition = "transform 0.4s cubic-bezier(0.22,1,0.36,1)";
          btn.style.transform = "translate(0,0)";
        });
      });

      // card tilt + glow + arrow
      root.querySelectorAll<HTMLElement>(".card").forEach((card) => {
        const glow = card.querySelector<HTMLElement>(".card-glow");
        const arrow = card.querySelector<HTMLElement>(".card-arrow");
        on(card, "mousemove", ((e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          card.style.transform = `perspective(800px) rotateY(${(px - 0.5) * 7}deg) rotateX(${(0.5 - py) * 7}deg) translateY(-4px)`;
          if (glow) {
            glow.style.setProperty("--gx", `${px * 100}%`);
            glow.style.setProperty("--gy", `${py * 100}%`);
          }
        }) as EventListener);
        on(card, "mouseenter", () => {
          card.style.transition = "transform 0.12s ease, box-shadow 0.3s ease";
          if (glow) glow.style.opacity = "1";
          if (arrow) {
            arrow.style.opacity = "1";
            arrow.style.transform = "translateX(0)";
          }
        });
        on(card, "mouseleave", () => {
          card.style.transition =
            "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease";
          card.style.transform =
            "perspective(800px) rotateY(0) rotateX(0) translateY(0)";
          if (glow) glow.style.opacity = "0";
          if (arrow) {
            arrow.style.opacity = "0";
            arrow.style.transform = "translateX(-8px)";
          }
        });
      });

      // avatar cursor parallax
      const avatar = root.querySelector<HTMLElement>(".avatar-wrap");
      const hero = root.querySelector<HTMLElement>(".hero");
      if (avatar && hero) {
        on(hero, "mousemove", ((e: MouseEvent) => {
          const r = hero.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          avatar.style.transform = `translate(${dx * 22}px, ${dy * 18}px) rotate(${dx * 4}deg)`;
        }) as EventListener);
        on(hero, "mouseenter", () => {
          avatar.style.transition = "transform 0.15s ease";
        });
        on(hero, "mouseleave", () => {
          avatar.style.transition = "transform 0.5s ease";
          avatar.style.transform = "translate(0,0)";
        });
      }
    }

    return () => {
      io.disconnect();
      cleanup.forEach((fn) => fn());
    };
  }, []);

  let letterDelay = 1.3;

  return (
    <div className="wrap" ref={rootRef}>
      <div className="curtain">
        <span className="mono">IKENNA&nbsp;EZEANI</span>
      </div>

      <div className="progress-rail">
        <div className="progress-bar" />
      </div>
      <div className="scrollpct mono">000%</div>

      <nav className="nav">
        <a className="nav-brand" href="#top">
          <img src="/avatar.jpeg" alt="Ikenna" />
          <span>IKENNA.E</span>
        </a>
        <div className="nav-links mono">
          <a href="#work">WORK</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#writing">WRITING</a>
          <a className="nav-cta" href="#contact" data-magnetic>
            CONTACT
          </a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-grid" />
        <div className="hero-inner">
          <div className="badge mono">
            <i />
            AVAILABLE FOR WORK — LAGOS, NG
          </div>
          <div className="avatar-wrap">
            <img src="/avatar.jpeg" alt="Cartoon portrait of Ikenna Ezeani" />
          </div>
          <h1>
            {NAME_LINES.map((line) => (
              <span className="line" key={line}>
                {line.split("").map((ch, i) => {
                  const d = letterDelay;
                  letterDelay += 0.04;
                  return (
                    <b key={i} style={{ animationDelay: `${d}s` }}>
                      {ch}
                    </b>
                  );
                })}
              </span>
            ))}
          </h1>
          <p>
            Software engineer with nearly a decade of experience building
            banking systems, design tooling &amp; products used across Africa.
          </p>
          <div className="hero-cta">
            <a className="btn btn-solid" href="#work" data-magnetic>
              See my work ↓
            </a>
            <a
              className="btn btn-ghost"
              href="https://github.com/iykeevans"
              target="_blank"
              rel="noopener"
              data-magnetic
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      <div className="marquee" data-parallax="0.06">
        <div className="marquee-track">
          <span className="mono">{MARQUEE}</span>
          <span className="mono">{MARQUEE}</span>
        </div>
      </div>

      <section className="section" id="work">
        <div className="head">
          <div className="mask">
            <h2>Selected Work</h2>
          </div>
          <span className="num mono reveal">
            <span data-count="1">00</span> — PROJECTS
          </span>
        </div>
        <div className="cards">
          {PROJECTS.map((p) => (
            <div className="card reveal" key={p.num}>
              <div className="card-glow" />
              <div className="card-top">
                <span className="card-num mono">{p.num}</span>
                <span className="card-stack mono">{p.stack}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <span className="card-arrow mono">VIEW CASE →</span>
            </div>
          ))}
        </div>
        <div className="lab reveal">
          <span className="k mono">THE LAB / SIDE PROJECTS —</span>
          <span className="p">Digital Journal</span>
          <span className="p">SendIT API</span>
          <span className="p">Humanar</span>
          <span className="p">Banka API</span>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="head">
          <div className="mask">
            <h2>Experience</h2>
          </div>
          <span className="num mono reveal">
            <span data-count="2">00</span> — CAREER
          </span>
        </div>
        <div className="exp-list">
          {JOBS.map((job, i) => (
            <div className="exp-row reveal" key={i}>
              <span className="exp-period mono">{job.period}</span>
              <div className="exp-mid">
                <span className="flip">
                  <span className="flip-track">
                    <span>{job.company}</span>
                    <span className="role">{job.role}</span>
                  </span>
                </span>
                <span className="exp-hl">{job.highlight}</span>
              </div>
              <span className="exp-tech mono">{job.tech}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="skills">
        <div className="head">
          <div className="mask">
            <h2>Stack</h2>
          </div>
          <span className="num mono reveal">
            <span data-count="3">00</span> — SKILLS
          </span>
        </div>
        <div className="chips reveal">
          {SKILLS.map((s) => (
            <span className="chip mono" key={s}>
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="section" id="writing">
        <div className="head">
          <div className="mask">
            <h2>Writing</h2>
          </div>
          <span className="num mono reveal">
            <span data-count="4">00</span> — BLOG
          </span>
        </div>
        <div className="posts">
          {POSTS.map((post) => (
            <a className="post reveal" href={post.href} key={post.title}>
              <span className="post-title">{post.title}</span>
              <span className="post-tag mono">{post.tag}</span>
            </a>
          ))}
        </div>
        <p className="posts-note mono reveal">
          // Placeholder titles — link these to your real posts when ready.
        </p>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner">
          <img src="/avatar.jpeg" alt="Ikenna avatar" />
          <span className="k mono">GOT A PROJECT IN MIND?</span>
          <h2>
            Let's build
            <br />
            something.
          </h2>
          <a
            className="contact-mail"
            href="mailto:elochi238@gmail.com"
            data-magnetic
          >
            elochi238@gmail.com
          </a>
          <div className="contact-social mono">
            <a
              href="https://github.com/iykeevans"
              target="_blank"
              rel="noopener"
            >
              GITHUB ↗
            </a>
            <a
              href="https://linkedin.com/in/iykeevans"
              target="_blank"
              rel="noopener"
            >
              LINKEDIN ↗
            </a>
          </div>
        </div>
        <div className="foot mono">
          <span>© 2026 IKENNA EZEANI</span>
          <span>LAGOS, NIGERIA — GMT+1</span>
        </div>
      </section>
    </div>
  );
}
