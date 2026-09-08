export function SectionAbout() {
  return (
    <section
      id="nosotros"
      className="surface-dark-2 section-y scroll-mt-24"
      aria-labelledby="about-title"
    >
      <div className="container-page">
        <div className="grid-editorial">
          <div>
            <p className="eyebrow text-gold">
              <span className="rule rule-on-dark" aria-hidden="true" />
              Nosotros
            </p>
            <h2
              id="about-title"
              className="font-sans font-extrabold text-display-2 leading-[1.05] mt-4 text-txt-d"
            >
              FIRMA ESPECIALIZADA EN EL SECTOR DEL JUEGO
            </h2>
          </div>

          <div className="text-body text-txt-d">
            <p>
              MANSEDO BUSINESS CONSULTING S.R.L. es una firma especializada en brindar
              asesoría técnica, legal y estratégica a empresas e inversionistas para el
              diseño, desarrollo e implementación de proyectos de lotería, juegos de azar
              y sorteos en Bolivia.
            </p>
            <p className="mt-5 text-mut-d">
              Nuestra especialización comprende la evaluación, estructuración y gestión
              integral de este tipo de proyectos. Para ello, contamos con un equipo
              multidisciplinario con experiencia en materias regulatorias,
              administrativas, tributarias, aduaneras y estratégicas, así como en otros
              ámbitos vinculados con su adecuada implementación y funcionamiento.
            </p>
            <p className="mt-5 text-mut-d">
              Brindamos soluciones integrales orientadas a fortalecer la viabilidad de
              cada proyecto, asegurar el cumplimiento de la normativa aplicable y
              gestionar adecuadamente sus riesgos operativos, legales y económicos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
