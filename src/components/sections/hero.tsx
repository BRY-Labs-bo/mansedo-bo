import Link from "next/link";
import { HeroIllustration } from "@/components/hero-illustration";

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

            <p className="mt-8 text-lead text-txt-d max-w-[520px]">
              Consultoría técnica, legal y estratégica para el diseño, desarrollo e
              implementación de proyectos de lotería, juegos de azar y sorteos en Bolivia,
              dirigida a empresas e inversionistas.
            </p>

            <p className="mt-5 text-body text-mut-d max-w-[520px]">
              Brindamos asesoramiento integral en materia regulatoria, técnica, administrativa,
              tributaria y aduanera, orientado a la estructuración, viabilidad y adecuada
              gestión de cada proyecto.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href="#contacto" className="btn btn-primary">
                Contacte a un especialista
              </Link>
              <Link href="#servicios" className="btn btn-secondary-dark">
                Ver servicios
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroIllustration className="w-full h-auto text-gold-br" />
          </div>
        </div>
      </div>
    </section>
  );
}
