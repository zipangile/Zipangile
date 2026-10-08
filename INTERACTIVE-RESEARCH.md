# Interactive Website Research — for Zipangile

Researched 2026-10-08. Sources: Snaper Digital's top-10 roundup, reverse-engineering
write-ups (dev.to/ddw-x teardowns of lusion.co and activetheory.net), public case
studies, and library documentation.

Method note: studied via technical documentation and published teardowns rather than
live browser sessions. Techniques below are verified against multiple sources.

---

## 1. lusion.co — the craft benchmark

**Stack:** Three.js + custom GLSL shaders, post-processing composer, Astro SSG.

**How it works:**
- **Lerp everything.** The cardinal rule: never apply raw cursor/scroll values directly.
  `current += (target - current) * 0.05–0.1` gives every movement weight and inertia.
- **Post-processing composer**, not raw rendering: bloom/glow, chromatic aberration at
  edges, animated film grain (kills banding, adds organic texture), depth of field.
- **GPU particles:** InstancedMesh / point clouds displaced in the vertex shader with
  simplex/curl noise — never CPU-side per-particle math.
- **Zero-allocation render loops:** no `new` inside the frame loop; pre-allocated
  scratchpads, typed arrays mapped straight to GL attributes.
- Sections transition by shifting 3D geometry around the viewer; hover states on
  project cards are physical (lift + glow), not just color changes.

**How interaction serves content:** The site IS the portfolio — clients experience the
craft before any sales call. Every animation carries meaning; nothing is decorative.

**Performance:** GPGPU fluid passes, reduced sim resolution on mobile, pause when tab
hidden.

**Steal for Zipangile:**
- Apply the lerp rule to the fluid sim's palette transitions and all cursor-reactive
  elements (magnetic buttons, tilt cards). Raw values feel twitchy; lerped values feel
  expensive.
- Add a lightweight post-processing pass over the fluid canvas: subtle bloom + film
  grain. This is the single strongest "everything belongs together" lever — one
  unified grade makes disparate layers feel like one world.

---

## 2. stripe.com — restraint as a feature

**Stack:** Next.js, WebGL (three.js), Framer Motion.

**How it works:**
- Hero: slow-flowing gradient ribbons (orange/pink/violet) on a WebGL canvas behind
  the headline. The motion sets mood without competing with copy.
- Animated counters (e.g. "Global GDP running on Stripe" ticking), scroll-driven
  product reveals, 3D card interactions on hover.
- Motion philosophy from their design system: **restraint** (one hero moment, the
  rest is supporting motion), **choreography** (primary element moves first,
  secondaries stagger), **physical but not cartoony** easing.
- Respects `prefers-reduced-motion`: gradient holds still, CSS transitions switch off.

**How interaction serves content:** Payments are abstract and invisible. The
animations make the invisible tangible — you *see* money move. Motion does
communication work that copy alone can't.

**Performance:** ~2.1 MB in the first 8 seconds. Motion is cheap because it's mostly
one canvas + CSS transforms.

**Steal for Zipangile:**
- **Restraint audit:** the fluid should never compete with the quote wizard's form
  fields. When the user is typing their idea, the background should calm down
  (reduce dye energy on input focus). Stripe's rule: motion behind the message.
- The Process section (Discover → Scope → Build → Launch → Partner) deserves a
  Stripe-style scroll-driven reveal — abstract process made tangible through motion.

---

## 3. activetheory.net — the deep end

**Stack:** Proprietary WebGL engine, GPGPU particle systems (100k–1M particles).

**How it works:**
- **Scroll-to-camera system:** `scrollY` → normalized 0→1 progress → camera
  position/rotation keyframes interpolated with lerp (speed ~0.07). Scrolling literally
  flies the camera through the scene.
- **Particles react to scroll progress:** color and flow-field behavior shift per
  "chapter" of the page — the field itself changes character, not just hue.
- **Route transitions** are cinematic (~600ms), each page a distinct 3D world.
- Post: bloom, depth of field, RGB shift, lens streak, volumetric fog.
- **Zero-GC runtime:** pre-allocated math scratchpads (`_v1`, `_m1`), monomorphic
  object shapes (no V8 hidden-class transitions), zero per-frame allocation. GC
  pauses of 3–8ms are what kill 120fps — they eliminated the source.

**How interaction serves content:** Dark, cinematic, each project feels like entering
a new world. The gap between this and a normal agency site IS the pitch.

**Performance:** The zero-allocation discipline is the whole game. Sustained high
frame rates come from memory discipline, not raw GPU power.

**Steal for Zipangile:**
- The fluid already shifts *palette* with scroll. Go one step further (Active Theory
  style): shift *behavior* — scroll velocity injects turbulence energy; deep scroll
  sections get slower, denser flow. Position + velocity as inputs, not just position.
- Audit the vendored `fluidSim.ts` frame loop for per-frame allocations. Pre-allocate
  and reuse. This matters most on mid-range Android phones — the Zambian audience.

---

## 4. bruno-simon.com — clarity beats complexity

**Stack:** Three.js + cannon.js physics, Blender-authored world exported as Draco-
compressed GLB. **Total site weight: 2.8 MB.**

**How it works:**
- You drive a toy car through a miniature 3D world; content is discovered by
  exploring. Physics is tuned for *game feel*, not realism: primitive colliders
  (never dense meshes), sleeping inactive bodies, fixed timestep.
- **Baked lighting** (lightmaps) instead of real-time shadows — enormous perf win.
- World design IS navigation: paths, boundaries, and zones (intro → crossroads →
  playground → projects → contact) guide you without UI.
- Collision-triggered sounds with randomized variation (avoids repetition fatigue).
- Mobile got explicit on-screen controls — the "no interface" ideal bent for reality.

**How interaction serves content:** The mechanic is obvious within seconds: you're
driving, not scrolling. That clarity makes a technically complex experience feel
effortless.

**Performance:** 2.8 MB total. Bake don't compute. Simple colliders. Sleep what you
don't need.

**Steal for Zipangile:**
- **Make the first interaction dead-obvious.** Bruno's lesson: the user should
  understand the mechanic in seconds. Zipangile's mechanic is the quote wizard —
  the "Start your build" CTA should feel like pressing START, and step 1 should be
  irresistible (one textarea, big friendly prompt, zero friction).
- Bake don't compute: precompute anything static. The quote calculator's pricing
  tiers, the fluid's palette keyframes — compute once, interpolate at runtime.

---

## 5. neal.fun/deep-sea — scroll as mechanic

**Stack:** Plain DOM + CSS sticky + scroll progress mapping. No WebGL at all.

**How it works:**
- Scroll position maps directly to ocean depth (0m → ~11,000m). Facts appear anchored
  to depth milestones. The page is a vertical journey, not a document.
- Technique: sticky container (300vh+) with a fixed inner viewport; scroll progress
  drives which creatures/facts are visible and the background darkness.
- **The interaction mirrors the content:** depth-as-metaphor becomes depth-as-
  mechanic. This is the purest example of interaction serving content in the list.

**How interaction serves content:** Educational without announcing itself. You learn
because you descended, not because you read.

**Performance:** Trivial — it's DOM. The lesson is conceptual, not technical.

**Steal for Zipangile:**
- The quote wizard is already a stepped flow. Frame it as a **descent/journey**:
  each step takes you deeper (idea → features → timeline → quote), with the fluid
  darkening/intensifying as you progress. Scroll/step position as a meaningful input
  to the sim, Neal-style.
- The Startup Launchpad section could use the same pattern: scroll = the startup
  journey (idea → credits → domain → launch), facts anchored to milestones.

---

## 6. pudding.cool — scrollytelling structure

**Stack:** scrollama (IntersectionObserver-based) + CSS `position: sticky`.

**How it works:**
- The canonical pattern: **sticky graphic + scrolling text steps.** A visual stays
  pinned while text scrolls past; each text step entering the viewport triggers a
  state change in the graphic.
- IntersectionObserver (async, cheap) instead of scroll listeners. Three elements:
  container → sticky graphic + step triggers.
- Their own guidance: use scroll storytelling *selectively* — hero reveal, sticky
  comparison, key sequences. Quiet static sections in between. Not every section
  needs it.

**How interaction serves content:** Data stories that would be unreadable as static
articles become legible. The interactive layer is structural, not decorative.

**Performance:** IO is far cheaper than scroll handlers; sticky is GPU-composited.

**Steal for Zipangile:**
- **Rebuild the Services section as scrollytelling:** sticky campaign visual on one
  side, service cards scrolling past on the other — each card entering changes the
  sticky visual's state (palette grade, caption, accent color). Content and visual
  become inseparable. This directly answers Sobhuza's "elements must feel like they
  belong" — the pudding pattern *locks* them together.
- Use IntersectionObserver (or framer-motion's `useInView`) for step triggers, not
  raw scroll listeners.

---

## Top 5 recommendations for Zipangile (ranked by impact/effort)

### 1. Lerp-smoothed, velocity-reactive fluid (HIGH impact, LOW effort)
The fluid shifts palette with scroll position today. Add scroll *velocity* as an
energy input (fast scroll = turbulence burst, settled reading = calm), and lerp
every transition at 0.05–0.1. The fluid should feel like it senses the reader's
energy, not just their position. (Lusion's cardinal rule.)

### 2. Scrollytelling Services section (HIGH impact, MEDIUM effort)
Pudding pattern: sticky visual + scrolling service cards, each card triggering a
visual state change. This is the structural fix for "images feel placed on top" —
when the visual's state is *driven by* the content scroll, they can't feel separate.

### 3. Cinematic post grade over the canvas (HIGH impact, MEDIUM effort)
Bloom + film grain + faint chromatic aberration as a fullscreen overlay pass
(Lusion/Active Theory). One unified grade is the fastest way to make fluid, cards,
portraits, and type feel like a single world rather than stacked layers.

### 4. Scroll-pinned Process journey (MEDIUM impact, MEDIUM effort)
Discover → Scope → Build → Launch → Partner as a GSAP ScrollTrigger pinned
sequence (Neal pattern): scrolling advances a visual pipeline. Makes the abstract
tangible, Stripe-style. Keep it skippable — a pin that traps the reader reads as
broken.

### 5. Zero-allocation audit of the fluid loop (MEDIUM impact, LOW effort)
Walk `lib/fluidSim.ts`'s frame loop; eliminate per-frame allocations
(Active Theory discipline). Pre-allocate scratch structures, reuse typed arrays.
The payoff is on mid-range Android — exactly the devices most Zambian visitors
carry.

---

## Performance pitfalls to avoid

1. **GC pauses in the render loop** — any `new` per frame (vectors, objects,
   closures) causes 3–8ms GC hitches. Pre-allocate; mutate in place.
2. **Unthrottled scroll listeners** — use IntersectionObserver / `useInView` for
   triggers, rAF-throttled handlers for continuous mapping. Never raw `scroll`
   handlers doing layout reads.
3. **Oversized WebGL on mobile** — keep dye/sim resolution aggressive-low on small
   screens (already 384px — good; consider 256px for <360px widths).
4. **Motion competing with tasks** — when the user is typing in the wizard or
   booking form, damp the fluid (Stripe's restraint rule). Backgrounds perform;
   forms work.
5. **Trapping scroll** — no mandatory scroll-snap on tall content, no unskippable
   pinned sequences. Every cinematic moment needs an exit.
6. **No reduced-motion fallback** — already handled (static gradient), keep it for
   every new effect added.
7. **Page weight creep** — bruno-simon shipped a 3D world in 2.8 MB. Portraits are
   416 KB total (good). Watch font payloads (Anton + Righteous + Inter) and keep
   new imagery compressed.

---

## The through-line

Every site on this list obeys one rule: **the interaction serves the content.**
Bruno's driving reveals work. Neal's scrolling is descent. Stripe's motion explains
payments. Pudding's scroll structure makes data legible.

For Zipangile, the content is: *bring us your idea, see what it costs, start
building.* Every interactive choice should serve that arc — the fluid responds to
your curiosity, the visuals change as you explore services, the process unfolds as
you scroll, the wizard feels like pressing START. Decoration that doesn't serve
the arc gets cut.
