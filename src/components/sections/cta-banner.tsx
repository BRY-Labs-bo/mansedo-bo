import Link from "next/link";

export function SectionCtaBanner() {
  return (
    <section className="surface-darker border-y border-line-d" aria-labelledby="cta-title">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <h2
              id="cta-title"
              className="font-sans font-extrabold text-[28px] md:text-[36px] leading-[1.1] text-txt-d"
            >
              ¿Tiene un proyecto en evaluación
              <br className="hidden md:block" />
              {" "}o una operación en marcha?
            </h2>
            <p className="mt-4 text-body text-mut-d max-w-[560px]">
              Comuníquese con uno de nuestros especialistas para recibir asesoramiento
              según las necesidades de su empresa.
            </p>
          </div>
          <div>
            <Link href="#contacto" className="btn btn-primary w-full md:w-auto">
              Contacte a un especialista
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
