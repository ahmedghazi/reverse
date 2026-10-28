"use client";

import {
  Children,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Scroll virtuel : pas de scroll natif, chaque enfant (section) est translaté
 * en translate3d, avec interpolation (lerp) dans requestAnimationFrame.
 * Aux extrémités, la main est rendue au scroll natif de la page (footer…).
 *
 * <ScrollerVirtual ref={ref} onIndexChange={setIndex}>
 *   <section>…</section>
 *   <section>…</section>
 * </ScrollerVirtual>
 *
 * ref.current.next() / prev() / goTo(i)
 */

export type ScrollerVirtualProps = {
  children: ReactNode;
  /** Multiplicateur appliqué au delta molette / touch. 1 = natif */
  speed?: number;
  /** Facteur d'interpolation par frame à 60 fps (0–1). Plus bas = plus fluide/lent */
  lerp?: number;
  /**
   * SkewY max (deg) des sections pendant la transition. 0 = désactivé.
   * En snap : nul quand une section est calée, max à mi-chemin entre deux
   * sections, toujours dans le même sens (effet Buzzman ≈ 4).
   * En scroll libre : proportionnel à la vitesse.
   */
  skew?: number;
  /**
   * Parallaxe des éléments marqués `data-scroller-parallax` dans une section :
   * décalage = -progression × hauteur × parallax (Buzzman ≈ 0.5). 0 = désactivé
   */
  parallax?: number;
  /** SkewY (deg) des éléments `data-scroller-parallax` par section d'écart (Buzzman ≈ 8) */
  parallaxSkew?: number;
  /** Snap section par section, actif par défaut (un geste molette / swipe = une section). false = scroll libre */
  snap?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Appelé à chaque frame où la position change */
  onScroll?: (y: number, progress: number) => void;
  /** Appelé quand la section active change */
  onIndexChange?: (index: number, total: number) => void;
};

export type ScrollerVirtualHandle = {
  next: () => void;
  prev: () => void;
  goTo: (index: number, opts?: { immediate?: boolean }) => void;
  /** Scroll vers une position en px */
  scrollTo: (y: number, opts?: { immediate?: boolean }) => void;
  getState: () => {
    y: number;
    max: number;
    progress: number;
    index: number;
    total: number;
  };
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/** Silence (ms) entre deux events wheel pour considérer un nouveau geste */
const GESTURE_GAP = 160;
/**
 * Trackpad : un nouveau geste peut démarrer pendant l'inertie du précédent,
 * donc sans silence. On le détecte quand le delta remonte nettement alors que
 * le geste en cours dure depuis au moins GESTURE_MIN_AGE ms.
 */
const GESTURE_MIN_AGE = 250;
const GESTURE_JUMP = 1.8;
/** Distance (px) min d'un swipe pour changer de section en mode snap */
const SWIPE_MIN = 50;

const ScrollerVirtual = forwardRef<ScrollerVirtualHandle, ScrollerVirtualProps>(
  function ScrollerVirtual(
    {
      children,
      speed = 1,
      lerp = 0.1,
      skew = 0,
      parallax = 0,
      parallaxSkew = 0,
      snap = true,
      className,
      style,
      onScroll,
      onIndexChange,
    },
    ref,
  ) {
    const rootRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const items = Children.toArray(children);

    // Props lues dans la boucle sans relancer les effets
    const opts = useRef({
      speed,
      lerp,
      skew,
      parallax,
      parallaxSkew,
      snap,
      onScroll,
      onIndexChange,
    });
    opts.current = {
      speed,
      lerp,
      skew,
      parallax,
      parallaxSkew,
      snap,
      onScroll,
      onIndexChange,
    };

    // État persistant entre re-renders / changements d'enfants
    const s = useRef({
      target: 0,
      current: 0,
      max: 0,
      vh: 0,
      index: -1,
      tops: [] as number[],
      heights: [] as number[],
    });

    // --- Helpers partagés (effet + ref) ----------------------------------
    const total = () => s.current.tops.length;

    const setIndex = (i: number) => {
      const st = s.current;
      if (i === st.index) return;
      st.index = i;
      opts.current.onIndexChange?.(i, total());
    };

    /** Index de la section qui occupe le milieu de l'écran */
    const indexAt = (y: number) => {
      const { tops, vh } = s.current;
      let i = 0;
      for (let k = 0; k < tops.length; k++) if (tops[k] <= y + vh * 0.5) i = k;
      return i;
    };

    /** Bas d'une section (pour les sections plus hautes que l'écran) */
    const sectionEnd = (i: number) => {
      const { tops, heights, vh, max } = s.current;
      return clamp(tops[i] + heights[i] - vh, 0, max);
    };

    const goTo = (
      i: number,
      o?: { immediate?: boolean; fromEnd?: boolean },
    ) => {
      const st = s.current;
      if (!total()) return;
      i = clamp(i, 0, total() - 1);
      st.target = o?.fromEnd ? sectionEnd(i) : clamp(st.tops[i], 0, st.max);
      if (o?.immediate) st.current = st.target;
      setIndex(i);
    };

    /** Pas suivant / précédent en mode snap */
    const step = (dir: 1 | -1) => {
      const st = s.current;
      const i = st.index < 0 ? indexAt(st.target) : st.index;
      // en remontant vers une section haute, on arrive par son bas
      goTo(i + dir, { fromEnd: dir < 0 });
    };

    useImperativeHandle(ref, () => ({
      next: () => step(1),
      prev: () => step(-1),
      goTo: (i, o) => goTo(i, o),
      scrollTo(y, o) {
        const st = s.current;
        st.target = clamp(y, 0, st.max);
        if (o?.immediate) st.current = st.target;
      },
      getState() {
        const { current, max, index } = s.current;
        return {
          y: current,
          max,
          progress: max ? current / max : 0,
          index,
          total: total(),
        };
      },
    }));

    useEffect(() => {
      const root = rootRef.current;
      if (!root) return;
      const st = s.current;
      const sections = sectionRefs.current
        .slice(0, items.length)
        .filter(Boolean) as HTMLDivElement[];
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // --- Mesure ---------------------------------------------------------
      let dirty = true;
      let parallaxEls: HTMLElement[][] = [];
      const measure = () => {
        st.vh = root.clientHeight;
        parallaxEls = sections.map((el) =>
          Array.from(
            el.querySelectorAll<HTMLElement>("[data-scroller-parallax]"),
          ),
        );
        let acc = 0;
        st.tops = [];
        st.heights = [];
        for (const el of sections) {
          st.tops.push(acc);
          const h = el.offsetHeight; // non affecté par les transforms
          st.heights.push(h);
          acc += h;
        }
        st.max = Math.max(0, acc - st.vh);
        // en snap, on reste calé sur la section courante après un resize
        if (opts.current.snap && st.index >= 0) {
          const i = Math.min(st.index, st.tops.length - 1);
          st.target = st.current = clamp(st.tops[i], 0, st.max);
        }
        st.target = clamp(st.target, 0, st.max);
        st.current = clamp(st.current, 0, st.max);
        dirty = true;
      };

      const ro = new ResizeObserver(measure);
      ro.observe(root);
      sections.forEach((el) => ro.observe(el));

      // --- Rendu ----------------------------------------------------------
      /**
       * Distance (en hauteurs d'écran) entre la position courante et la
       * position calée la plus proche. Une section haute est « calée » sur
       * toute sa plage [haut, bas].
       */
      const snapDistance = () => {
        let d = Infinity;
        for (let i = 0; i < st.tops.length; i++) {
          const a = clamp(st.tops[i], 0, st.max);
          const b = Math.max(a, sectionEnd(i));
          const di =
            st.current < a
              ? a - st.current
              : st.current > b
                ? st.current - b
                : 0;
          if (di < d) d = di;
        }
        return st.vh ? d / st.vh : 0;
      };

      // sens du scroll (1 = descend, -1 = remonte), gardé quand le mouvement s'arrête
      let dir = 1;
      const render = () => {
        const { current, target, vh, tops, heights } = st;
        if (target !== current) dir = target > current ? 1 : -1;
        const {
          skew: k,
          parallax: px,
          parallaxSkew: pk,
          snap: snapMode,
        } = opts.current;
        // skew des sections
        let sk = 0;
        if (k) {
          sk = snapMode
            ? // Buzzman : 0 calé → max à mi-chemin, signe selon le sens du scroll
              -dir * clamp(snapDistance() / 0.5, 0, 1) * k
            : // scroll libre : selon la vitesse (écart cible / courant)
              -clamp((target - current) / (vh * 0.25), -1, 1) * k;
        }
        for (let i = 0; i < sections.length; i++) {
          const y = Math.round((tops[i] - current) * 100) / 100;
          const visible = y < vh && y + heights[i] > 0;
          const el = sections[i];
          el.style.visibility = visible ? "" : "hidden";
          if (!visible) continue;
          el.style.transform = `translate3d(0,${y}px,0)${sk ? ` skewY(${sk.toFixed(3)}deg)` : ""}`;
          // parallaxe interne : p = 0 quand la section est calée, ±1 une section plus loin
          if ((px || pk) && parallaxEls[i]?.length) {
            const p = vh ? y / vh : 0;
            const t = `translate3d(0,${(-p * vh * px).toFixed(2)}px,0) skewY(${(-Math.abs(p) * pk).toFixed(3)}deg)`;
            for (const inner of parallaxEls[i]) inner.style.transform = t;
          }
        }
      };

      // --- Boucle rAF + lerp ---------------------------------------------
      let raf = 0;
      let prev = NaN;
      let last = performance.now();
      const tick = (now: number) => {
        const dt = Math.min(now - last, 64);
        last = now;
        // lerp indépendant du framerate (60 / 120 Hz)
        const f = reduce
          ? 1
          : 1 -
            Math.pow(1 - clamp(opts.current.lerp, 0.001, 1), dt / (1000 / 60));
        st.current += (st.target - st.current) * f;
        if (Math.abs(st.target - st.current) < 0.05) st.current = st.target;

        if (dirty || st.current !== prev) {
          render();
          if (st.current !== prev) {
            opts.current.onScroll?.(
              st.current,
              st.max ? st.current / st.max : 0,
            );
            if (!opts.current.snap) setIndex(indexAt(st.current));
          }
          prev = st.current;
          dirty = false;
        }
        raf = requestAnimationFrame(tick);
      };

      const add = (dy: number, min = 0, max = st.max) => {
        st.target = clamp(st.target + dy, min, max);
      };

      /** L'animation vers la section cible est-elle encore en cours ? */
      const animating = () => Math.abs(st.target - st.current) > st.vh * 0.08;

      /**
       * Mode snap : si la section courante dépasse l'écran, on scrolle librement
       * à l'intérieur. Retourne true si le delta a été consommé.
       */
      const scrollInside = (dy: number) => {
        const i = st.index < 0 ? indexAt(st.target) : st.index;
        const top = clamp(st.tops[i], 0, st.max);
        const end = sectionEnd(i);
        if (end - top < 1) return false;
        if (
          (dy > 0 && st.target < end - 0.5) ||
          (dy < 0 && st.target > top + 0.5)
        ) {
          add(dy, top, end);
          return true;
        }
        return false;
      };

      // --- Relais avec le scroll natif de la page -------------------------
      /** Haut du scroller dans le viewport. 0 = calé plein écran */
      const offset = () => root.getBoundingClientRect().top;
      const aligned = () => Math.abs(offset()) <= 1;
      const pageCanScroll = (dir: number) => {
        const d = document.scrollingElement || document.documentElement;
        return dir > 0
          ? d.scrollTop + window.innerHeight < d.scrollHeight - 1
          : d.scrollTop > 0;
      };

      /**
       * Rend la main au scroll natif de la page (ex. footer après le scroller) :
       * - le scroller n'est pas calé en haut du viewport (la page a scrollé)
       * - ou on est sur la dernière section en descendant / la première en
       *   remontant, animation terminée, et la page peut encore scroller
       */
      const release = (dy: number) => {
        if (!dy) return false;
        if (!aligned()) return true;
        if (!pageCanScroll(dy)) return false;
        // pas besoin d'attendre la fin exacte du lerp (queue longue) :
        // l'animation vers la section doit juste être quasi finie
        if (animating()) return false;
        const snapMode = opts.current.snap;
        if (dy > 0)
          return (
            (!snapMode || st.index >= total() - 1) && st.target >= st.max - 0.5
          );
        return (!snapMode || st.index <= 0) && st.target <= 0.5;
      };

      // --- Molette --------------------------------------------------------
      let lastWheel = 0;
      let lastAbs = 0;
      let gestureStart = 0;
      let wheelNative = false;
      const onWheel = (e: WheelEvent) => {
        const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? st.vh : 1;
        const raw = e.deltaY * unit;
        const dy = raw * opts.current.speed;
        const abs = Math.abs(raw);
        const now = performance.now();
        const newGesture =
          now - lastWheel > GESTURE_GAP ||
          (now - gestureStart > GESTURE_MIN_AGE &&
            abs > lastAbs * GESTURE_JUMP &&
            abs - lastAbs > 8);
        if (newGesture) gestureStart = now;
        lastWheel = now;
        lastAbs = abs;
        if (!raw) return;

        // décidé une fois par geste : tout le geste va à la page ou au scroller
        if (newGesture) wheelNative = release(dy);
        if (wheelNative) {
          // en revenant vers le scroller, on se cale pile dessus sans le
          // dépasser, et la fin du geste (inertie) est absorbée
          const top = offset();
          if ((top < 0 && raw <= top) || (top > 0 && raw >= top)) {
            e.preventDefault();
            window.scrollBy(0, top);
            wheelNative = false;
          }
          return;
        }
        e.preventDefault();

        if (!opts.current.snap) return add(dy);
        if (scrollInside(dy)) return;
        // un geste (y compris l'inertie trackpad qui suit) = une section
        if (newGesture && !animating()) step(dy > 0 ? 1 : -1);
      };

      // --- Touch ----------------------------------------------------------
      let ty = 0;
      let tt = 0;
      let tv = 0;
      let startY = 0;
      let startTarget = 0;
      let startIndex = 0;
      let inside = false;
      let touchNative: boolean | null = null;
      const onTouchStart = (e: TouchEvent) => {
        touchNative = null;
        ty = startY = e.touches[0].clientY;
        tt = performance.now();
        tv = 0;
        startTarget = st.target;
        startIndex = st.index < 0 ? indexAt(st.target) : st.index;
        inside = false;
      };
      const onTouchMove = (e: TouchEvent) => {
        const y = e.touches[0].clientY;
        const now = performance.now();
        const dy = (ty - y) * opts.current.speed;
        // décidé au premier move qui bouge : tout le geste va à la page ou au scroller
        if (touchNative === null && dy) touchNative = release(dy);
        if (touchNative) return; // pan-y natif
        e.preventDefault();
        if (!dy) return;
        tv = dy / Math.max(now - tt, 1); // px/ms
        ty = y;
        tt = now;
        if (opts.current.snap && scrollInside(dy)) {
          inside = true;
          return;
        }
        add(dy); // suit le doigt
      };
      const onTouchEnd = () => {
        if (touchNative) return;
        const fresh = performance.now() - tt < 100;
        if (!opts.current.snap) {
          if (fresh) add(tv * 250);
          return;
        }
        if (
          inside &&
          st.target !== startTarget &&
          Math.abs(st.target - st.tops[startIndex]) < st.heights[startIndex]
        ) {
          // on a scrollé à l'intérieur d'une section haute : inertie bornée à la section
          if (fresh)
            add(
              tv * 250,
              clamp(st.tops[startIndex], 0, st.max),
              sectionEnd(startIndex),
            );
          return;
        }
        const dist = startY - ty;
        const flick = fresh && Math.abs(tv) > 0.4;
        if (Math.abs(dist) > SWIPE_MIN || flick) {
          st.index = startIndex;
          step(dist > 0 ? 1 : -1);
        } else {
          goTo(startIndex); // retour élastique
        }
      };

      // --- Clavier --------------------------------------------------------
      const onKey = (e: KeyboardEvent) => {
        const t = e.target as HTMLElement;
        if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))
          return;
        const page = st.vh * 0.9;
        const snapMode = opts.current.snap;
        const down = () =>
          snapMode ? !scrollInside(100) && step(1) : add(100);
        const up = () =>
          snapMode ? !scrollInside(-100) && step(-1) : add(-100);
        const dirs: Record<string, number> = {
          ArrowDown: 1,
          PageDown: 1,
          End: 1,
          ArrowUp: -1,
          PageUp: -1,
          Home: -1,
          " ": e.shiftKey ? -1 : 1,
        };
        if (dirs[e.key] && release(dirs[e.key])) return; // clavier natif
        const map: Record<string, () => void> = {
          ArrowDown: down,
          ArrowUp: up,
          PageDown: () => (snapMode ? step(1) : add(page)),
          PageUp: () => (snapMode ? step(-1) : add(-page)),
          " ": () =>
            snapMode
              ? step(e.shiftKey ? -1 : 1)
              : add(e.shiftKey ? -page : page),
          Home: () => goTo(0),
          End: () => goTo(total() - 1, { fromEnd: true }),
        };
        if (map[e.key]) {
          e.preventDefault();
          map[e.key]();
        }
      };

      // Le focus (Tab) peut faire scroller nativement le conteneur : on annule
      const onNativeScroll = () => {
        root.scrollTop = 0;
      };

      root.addEventListener("wheel", onWheel, { passive: false });
      root.addEventListener("touchstart", onTouchStart, { passive: true });
      root.addEventListener("touchmove", onTouchMove, { passive: false });
      root.addEventListener("touchend", onTouchEnd);
      root.addEventListener("scroll", onNativeScroll);
      window.addEventListener("keydown", onKey);

      measure();
      setIndex(opts.current.snap ? Math.max(st.index, 0) : indexAt(st.current));
      raf = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        root.removeEventListener("wheel", onWheel);
        root.removeEventListener("touchstart", onTouchStart);
        root.removeEventListener("touchmove", onTouchMove);
        root.removeEventListener("touchend", onTouchEnd);
        root.removeEventListener("scroll", onNativeScroll);
        window.removeEventListener("keydown", onKey);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.length]);

    return (
      <div
        ref={rootRef}
        className={className}
        style={{
          position: "relative",
          height: "100dvh",
          overflow: "hidden",
          // pan-y : le scroll natif reste possible quand on rend la main à la
          // page (cf. release), sinon il est bloqué par preventDefault
          touchAction: "pan-y",
          ...style,
        }}>
        {items.map((child, i) => (
          <div
            key={(child as { key?: string }).key ?? i}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              willChange: "transform",
              transformOrigin: "center center",
            }}>
            {child}
          </div>
        ))}
      </div>
    );
  },
);

export default ScrollerVirtual;
