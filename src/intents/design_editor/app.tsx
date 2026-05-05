import { useState } from "react";
import { addPage } from "@canva/design";

type Slide = {
  index: number;
  title: string;
  body: string;
};

const slideOptions = [3, 5, 7, 10];

function createMockSlides(topic: string, count: number): Slide[] {
  const baseTopic = topic.trim() || "tu marca";

  return Array.from({ length: count }, (_, i) => {
    const index = i + 1;
    const isFirst = index === 1;
    const isLast = index === count;

    if (isFirst) {
      return {
        index,
        title: `El error que frena el crecimiento de ${baseTopic}`,
        body: "La mayoría publica contenido sin estrategia. Por eso genera movimiento, pero no autoridad.",
      };
    }

    if (isLast) {
      return {
        index,
        title: "Convertí tu contenido en un sistema",
        body: "No publiques por publicar. Diseñá piezas que eduquen, posicionen y vendan. Guardá este carrusel y aplicalo en tu próxima campaña.",
      };
    }

    return {
      index,
      title: `Idea clave #${index - 1}`,
      body: `Una pieza de contenido efectiva sobre ${baseTopic} debe tener intención, mensaje claro y una estructura visual fácil de entender.`,
    };
  });
}

export function App() {
  const [topic, setTopic] = useState("");
  const [slideCount, setSlideCount] = useState(5);
  const [style, setStyle] = useState("premium");
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isInserting, setIsInserting] = useState(false);

  const generateSlides = () => {
    const generated = createMockSlides(topic, slideCount);
    setSlides(generated);
  };

  const insertSlidesIntoCanva = async () => {
    if (slides.length === 0) return;

    setIsInserting(true);

    try {
      const isPremium = style === "premium";

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
              top: 620,
              left: 80,
              width: 840,
              fontSize: 36,
              color: isPremium ? "#D7D7D7" : "#333333",
            },
            {
              type: "text",
              children: ["Carrusel Pro AI"],
              top: 1210,
              left: 80,
              width: 400,
              fontSize: 24,
              fontWeight: "bold",
              color: isPremium ? "#D6B46A" : "#555555",
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
        Generá un carrusel editable dentro de Canva.
      </p>

      <label style={{ fontSize: 13, fontWeight: 700 }}>Tema del carrusel</label>
      <textarea
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
        placeholder="Ej: liderazgo político para empresarios"
        rows={4}
        style={{
          width: "100%",
          marginTop: 6,
          marginBottom: 14,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
          resize: "vertical",
        }}
      />

      <label style={{ fontSize: 13, fontWeight: 700 }}>
        Cantidad de slides
      </label>
      <select
        value={slideCount}
        onChange={(event) => setSlideCount(Number(event.target.value))}
        style={{
          width: "100%",
          marginTop: 6,
          marginBottom: 14,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      >
        {slideOptions.map((option) => (
          <option key={option} value={option}>
            {option} slides
          </option>
        ))}
      </select>

      <label style={{ fontSize: 13, fontWeight: 700 }}>Estilo visual</label>
      <select
        value={style}
        onChange={(event) => setStyle(event.target.value)}
        style={{
          width: "100%",
          marginTop: 6,
          marginBottom: 16,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      >
        <option value="premium">Premium oscuro</option>
        <option value="minimal">Minimalista claro</option>
      </select>

      <button
        onClick={generateSlides}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "none",
          background: "#7c3aed",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: 12,
        }}
      >
        Generar carrusel
      </button>

      <button
        onClick={insertSlidesIntoCanva}
        disabled={slides.length === 0 || isInserting}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "none",
          background: slides.length === 0 ? "#ccc" : "#111",
          color: "#fff",
          fontWeight: 700,
          cursor: slides.length === 0 ? "not-allowed" : "pointer",
          marginBottom: 16,
        }}
      >
        {isInserting ? "Insertando..." : "Insertar en Canva"}
      </button>

      {slides.length > 0 && (
        <div>
          <h3 style={{ fontSize: 15, marginBottom: 8 }}>Vista previa</h3>

          {slides.map((slide) => (
            <div
              key={slide.index}
              style={{
                padding: 12,
                border: "1px solid #ddd",
                borderRadius: 10,
                marginBottom: 10,
                background: "#fafafa",
              }}
            >
              <strong>
                Slide {slide.index}: {slide.title}
              </strong>
              <p style={{ fontSize: 13, color: "#555" }}>{slide.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
