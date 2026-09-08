import Link from "next/link";
import { HeroIllustration } from "@/components/hero-illustration";

// Flecha derecha usada en el botón primario, coherente con el PDF.
function ArrowRight() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 6h13M10 1l4 5-4 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function SectionHero() {
  return (
    <section className="surface-dark border-b border-line-d" aria-labelledby="hero-title">
      <div className="container-page py-16 md:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 items-center">
          <div>
            <h1
              id="hero-title"
              className="font-sans font-extrabold text-[42px] leading-[1.03] md:text-display-1 text-txt-d"
            >
              ASESORÍA
              <br />
              ESPECIALIZADA
              <br />
              EN LOTERÍA,
              <br />
              AZAR Y SORTEOS
            </h1>

            {/* Filete corto dorado, previo a la bajada */}
            <span
              aria-hidden="true"
              className="mt-8 inline-block h-px w-10 bg-gold"
            />

            {/* Bajada principal en dorado sobre navy (contraste AA) */}
            <p className="mt-4 text-lead text-gold max-w-[520px]">
              Consultoría técnica, legal y estratégica para el diseño, desarrollo e
              implementación de proyectos de lotería, juegos de azar y sorteos en Bolivia,
              dirigida a empresas e inversionistas.
            </p>

            {/* Párrafo secundario, más apagado */}
            <p className="mt-5 text-body text-mut-d max-w-[520px]">
              Brindamos asesoramiento integral en materia regulatoria, técnica, administrativa,
              tributaria y aduanera, orientado a la estructuración, viabilidad y adecuada
              gestión de cada proyecto.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href="#contacto" className="btn btn-primary">
                <span>Contacte a un especialista</span>
                <ArrowRight />
              </Link>
              <Link href="#servicios" className="btn btn-secondary-dark">
                Ver servicios
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroIllustration className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
