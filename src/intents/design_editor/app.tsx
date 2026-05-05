import { useState } from "react";
import { addPage } from "@canva/design";

type Objective =
  | "educar"
  | "vender"
  | "autoridad"
  | "lanzamiento"
  | "captar_leads";

type Tone = "premium" | "directo" | "institucional" | "disruptivo";

type VisualStyle = "premium_oscuro" | "minimalista_claro";

type CTA =
  | "agendar_llamada"
  | "enviar_mensaje"
  | "guardar_publicacion"
  | "descargar_recurso"
  | "solicitar_diagnostico";

type Slide = {
  index: number;
  title: string;
  body: string;
};

const slideOptions = [3, 5, 7, 10];

const objectives: { label: string; value: Objective }[] = [
  { label: "Educar", value: "educar" },
  { label: "Vender", value: "vender" },
  { label: "Generar autoridad", value: "autoridad" },
  { label: "Lanzamiento", value: "lanzamiento" },
  { label: "Captar leads", value: "captar_leads" },
];

const tones: { label: string; value: Tone }[] = [
  { label: "Premium", value: "premium" },
  { label: "Directo", value: "directo" },
  { label: "Institucional", value: "institucional" },
  { label: "Disruptivo", value: "disruptivo" },
];

const visualStyles: { label: string; value: VisualStyle }[] = [
  { label: "Premium oscuro", value: "premium_oscuro" },
  { label: "Minimalista claro", value: "minimalista_claro" },
];

const ctas: { label: string; value: CTA }[] = [
  { label: "Agendar llamada", value: "agendar_llamada" },
  { label: "Enviar mensaje", value: "enviar_mensaje" },
  { label: "Guardar publicación", value: "guardar_publicacion" },
  { label: "Descargar recurso", value: "descargar_recurso" },
  { label: "Solicitar diagnóstico", value: "solicitar_diagnostico" },
];

function getObjectiveAngle(objective: Objective) {
  const angles: Record<Objective, string> = {
    educar: "enseñar una idea clara y útil",
    vender: "mostrar por qué esta solución es necesaria",
    autoridad: "posicionar una mirada experta",
    lanzamiento: "presentar una novedad con impacto",
    captar_leads: "generar interés y llevar a una acción concreta",
  };

  return angles[objective];
}

function getToneInstruction(tone: Tone) {
  const tonesMap: Record<Tone, string> = {
    premium: "con un tono elegante, estratégico y de alto valor",
    directo: "con un tono simple, claro y sin vueltas",
    institucional: "con un tono serio, confiable y profesional",
    disruptivo: "con un tono fuerte, provocador y memorable",
  };

  return tonesMap[tone];
}

function getFinalCTA(cta: CTA) {
  const ctaMap: Record<CTA, string> = {
    agendar_llamada:
      "Agendá una llamada y descubrí cómo transformar esta idea en una estrategia concreta.",
    enviar_mensaje:
      "Enviá un mensaje y te mostramos cómo aplicar esto en tu caso.",
    guardar_publicacion:
      "Guardá esta publicación para volver a usarla cuando diseñes tu próxima campaña.",
    descargar_recurso:
      "Descargá el recurso completo y empezá a ordenar tu estrategia paso a paso.",
    solicitar_diagnostico:
      "Solicitá un diagnóstico privado y descubrí qué está frenando tu crecimiento.",
  };

  return ctaMap[cta];
}

function createMockSlides(params: {
  topic: string;
  count: number;
  objective: Objective;
  tone: Tone;
  cta: CTA;
}): Slide[] {
  const { topic, count, objective, tone, cta } = params;

  const baseTopic = topic.trim() || "tu marca";
  const angle = getObjectiveAngle(objective);
  const toneInstruction = getToneInstruction(tone);
  const finalCTA = getFinalCTA(cta);

  return Array.from({ length: count }, (_, i) => {
    const index = i + 1;
    const isFirst = index === 1;
    const isSecond = index === 2;
    const isLast = index === count;

    if (isFirst) {
      return {
        index,
        title: `El error que frena el crecimiento de ${baseTopic}`,
        body: `La mayoría comunica sin sistema. Este carrusel busca ${angle}, ${toneInstruction}.`,
      };
    }

    if (isSecond) {
      return {
        index,
        title: "El problema no es publicar poco",
        body: `El problema es publicar sin una estructura que conecte mensaje, diseño, autoridad y conversión.`,
      };
    }

    if (isLast) {
      return {
        index,
        title: "Convertí tu contenido en una herramienta de crecimiento",
        body: finalCTA,
      };
    }

    return {
      index,
      title: `Idea clave #${index - 2}`,
      body: `Para que ${baseTopic} funcione en redes, cada pieza debe tener una intención clara, una promesa concreta y una lectura visual simple.`,
    };
  });
}

export function App() {
  const [topic, setTopic] = useState("");
  const [slideCount, setSlideCount] = useState(5);
  const [objective, setObjective] = useState<Objective>("autoridad");
  const [tone, setTone] = useState<Tone>("premium");
  const [visualStyle, setVisualStyle] = useState<VisualStyle>("premium_oscuro");
  const [cta, setCta] = useState<CTA>("solicitar_diagnostico");
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isInserting, setIsInserting] = useState(false);

  const generateSlides = () => {
    const generated = createMockSlides({
      topic,
      count: slideCount,
      objective,
      tone,
      cta,
    });

    setSlides(generated);
  };

  const clearAll = () => {
    setTopic("");
    setSlideCount(5);
    setObjective("autoridad");
    setTone("premium");
    setVisualStyle("premium_oscuro");
    setCta("solicitar_diagnostico");
    setSlides([]);
  };

  const updateSlide = (
    index: number,
    field: "title" | "body",
    value: string,
  ) => {
    setSlides((currentSlides) =>
      currentSlides.map((slide) =>
        slide.index === index ? { ...slide, [field]: value } : slide,
      ),
    );
  };

  const insertSlidesIntoCanva = async () => {
    if (slides.length === 0) return;

    setIsInserting(true);

    try {
      const isPremium = visualStyle === "premium_oscuro";

      for (const slide of slides) {
        await addPage({
          title: `Slide ${slide.index}`,
          dimensions: {
            width: 1080,
            height: 1350,
          },
          background: {
            color: isPremium ? "#080808" : "#FFFFFF",
          },
          elements: [
            {
              type: "text",
              children: [`${slide.index}/${slides.length}`],
              top: 80,
              left: 80,
              width: 200,
              fontSize: 28,
              fontWeight: "bold",
              color: isPremium ? "#D6B46A" : "#111111",
            },
            {
              type: "text",
              children: ["Carrusel Pro AI"],
              top: 80,
              left: 680,
              width: 320,
              fontSize: 24,
              fontWeight: "bold",
              color: isPremium ? "#D6B46A" : "#555555",
            },
            {
              type: "text",
              children: [slide.title],
              top: 260,
              left: 80,
              width: 920,
              fontSize: 64,
              fontWeight: "bold",
              color: isPremium ? "#FFFFFF" : "#111111",
            },
            {
              type: "text",
              children: [slide.body],
              top: 650,
              left: 80,
              width: 850,
              fontSize: 36,
              color: isPremium ? "#D7D7D7" : "#333333",
            },
            {
              type: "text",
              children: ["━━━━━━━━━━━━"],
              top: 1160,
              left: 80,
              width: 500,
              fontSize: 28,
              color: isPremium ? "#D6B46A" : "#111111",
            },
          ],
        });
      }
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <div style={{ padding: 16, fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: 8 }}>Carrusel Pro AI</h2>

      <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
        Generá carruseles editables dentro de Canva.
      </p>

      <label style={labelStyle}>Tema del carrusel</label>
      <textarea
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
        placeholder="Ej: liderazgo político para empresarios"
        rows={4}
        style={textareaStyle}
      />

      <label style={labelStyle}>Cantidad de slides</label>
      <select
        value={slideCount}
        onChange={(event) => setSlideCount(Number(event.target.value))}
        style={selectStyle}
      >
        {slideOptions.map((option) => (
          <option key={option} value={option}>
            {option} slides
          </option>
        ))}
      </select>

      <label style={labelStyle}>Objetivo</label>
      <select
        value={objective}
        onChange={(event) => setObjective(event.target.value as Objective)}
        style={selectStyle}
      >
        {objectives.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label style={labelStyle}>Tono</label>
      <select
        value={tone}
        onChange={(event) => setTone(event.target.value as Tone)}
        style={selectStyle}
      >
        {tones.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label style={labelStyle}>CTA final</label>
      <select
        value={cta}
        onChange={(event) => setCta(event.target.value as CTA)}
        style={selectStyle}
      >
        {ctas.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label style={labelStyle}>Estilo visual</label>
      <select
        value={visualStyle}
        onChange={(event) => setVisualStyle(event.target.value as VisualStyle)}
        style={selectStyle}
      >
        {visualStyles.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button onClick={generateSlides} style={primaryButtonStyle}>
        Generar carrusel
      </button>

      <button onClick={clearAll} style={secondaryButtonStyle}>
        Limpiar
      </button>

      <button
        onClick={insertSlidesIntoCanva}
        disabled={slides.length === 0 || isInserting}
        style={{
          ...darkButtonStyle,
          background: slides.length === 0 ? "#ccc" : "#111",
          cursor: slides.length === 0 ? "not-allowed" : "pointer",
        }}
      >
        {isInserting ? "Insertando..." : "Insertar en Canva"}
      </button>

      {slides.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 15, marginBottom: 8 }}>
            Vista previa editable
          </h3>

          {slides.map((slide) => (
            <div key={slide.index} style={slideCardStyle}>
              <strong>Slide {slide.index}</strong>

              <label style={smallLabelStyle}>Título</label>
              <input
                value={slide.title}
                onChange={(event) =>
                  updateSlide(slide.index, "title", event.target.value)
                }
                style={inputStyle}
              />

              <label style={smallLabelStyle}>Texto</label>
              <textarea
                value={slide.body}
                onChange={(event) =>
                  updateSlide(slide.index, "body", event.target.value)
                }
                rows={4}
                style={textareaStyle}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 700,
  marginBottom: 6,
} as const;

const smallLabelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  marginTop: 10,
  marginBottom: 4,
} as const;

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
  boxSizing: "border-box",
} as const;

const textareaStyle = {
  width: "100%",
  marginBottom: 14,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
  resize: "vertical",
  boxSizing: "border-box",
} as const;

const selectStyle = {
  width: "100%",
  marginBottom: 14,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
  boxSizing: "border-box",
} as const;

const primaryButtonStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "none",
  background: "#7c3aed",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  marginBottom: 10,
} as const;

const secondaryButtonStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "#fff",
  color: "#111",
  fontWeight: 700,
  cursor: "pointer",
  marginBottom: 10,
} as const;

const darkButtonStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "none",
  color: "#fff",
  fontWeight: 700,
  marginBottom: 16,
} as const;

const slideCardStyle = {
  padding: 12,
  border: "1px solid #ddd",
  borderRadius: 10,
  marginBottom: 12,
  background: "#fafafa",
} as const;
