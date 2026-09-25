import Link from "next/link";
import { Isologo } from "@/components/isologo";
import { site, whatsappUrl } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type Locale } from "@/i18n/config";

function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5A6.5 6.5 0 0 0 2.35 11.3L1.5 14.5l3.28-.84A6.5 6.5 0 1 0 8 1.5Zm3.7 8.86c-.16.44-.94.85-1.3.9-.34.05-.77.07-1.24-.08a11.4 11.4 0 0 1-1.13-.42 8.86 8.86 0 0 1-3.4-3.02c-.25-.34-.68-.94-.68-1.79 0-.85.44-1.27.6-1.44.16-.17.35-.22.47-.22h.34c.11 0 .26-.04.4.31.16.39.55 1.36.6 1.46.05.11.08.23.02.35-.06.13-.09.2-.17.32-.09.11-.19.25-.27.34-.09.09-.18.19-.08.37.11.19.48.79 1.03 1.28.7.63 1.29.82 1.48.92.19.09.3.08.41-.05.11-.13.47-.55.6-.74.13-.19.25-.16.42-.09.17.06 1.06.5 1.24.59.19.09.31.13.36.21.05.08.05.46-.11.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteFooter({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).footer;
  const year = new Date().getFullYear();
  return (
    <footer className="surface-darker text-txt-d border-t border-line-d">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Isologo variant="dark" className="h-10 w-auto" />
            <p className="mt-6 text-body-sm text-mut-d max-w-sm">{t.tagline}</p>
          </div>

          <div>
            <p className="eyebrow text-gold">
              <span className="rule rule-on-dark" aria-hidden="true" />
              {t.officeLabel}
            </p>
            <address className="not-italic mt-4 text-body-sm leading-relaxed">
              {site.address.street}
              <br />
              {site.address.detail}
              <br />
              {site.address.city} — {site.address.country}
              <br />
              <br />
              {site.contact.phones.join(" · ")}
              <br />
              <a
                href={`mailto:${site.contact.email}`}
                className="text-gold hover:text-gold-br"
              >
                {site.contact.email}
              </a>
              <br />
              <a href={site.url} className="text-gold hover:text-gold-br">
                www.mansedoconsulting.com
              </a>
            </address>
          </div>

          <div>
            <p className="eyebrow text-gold">
              <span className="rule rule-on-dark" aria-hidden="true" />
              {t.attentionLabel}
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-dark mt-4 w-full md:w-auto"
            >
              <IconWhatsApp />
              <span>{t.whatsappCta}</span>
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line-d flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-body-sm text-mut-d">
          <p>
            © {year} {site.name}. {t.copyright}
          </p>
          <Link
            href={href("/politica-de-privacidad", lang)}
            className="text-mut-d hover:text-gold-br"
          >
            {t.privacyPolicy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
