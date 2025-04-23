'use client';
/**
 * Global Footer Compoent.
 */
export default function ContactInformation() {
  //   const namespace = 'FOOTER';
  //   const t = useTranslations(namespace); // i18n hook

  return (
    <div className="text-center mx-auto max-w-xl px-4 py-10 text-gray-900 dark:text-white">
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-4">Contact Information</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          Plan upon yet way get cold spot its week. <br />
          Almost do am or limits hearts. Resolve parties.
        </p>
      </div>

      <ul className="space-y-8">
        {/* <li className="transition-opacity duration-500 ease-in-out">
          <div>
            <h4 className="text-3xl font-semibold mb-2">Phone</h4>
            <a href="tel:+4733378901" className="text-2xl text-accented-primary hover:underline block">
              +4733378901
            </a>
          </div>
        </li> */}

        <li className="transition-opacity duration-500 ease-in-out delay-300">
          <div>
            <h4 className="text-3xl font-semibold mb-2">Location</h4>
            <p className="text-gray-600 text-2xl dark:text-gray-400">Wrocław, Poland</p>
          </div>
        </li>

        <li className="transition-opacity duration-500 ease-in-out delay-500">
          <div>
            <h4 className="text-3xl font-semibold mb-2">Official Email</h4>
            <a
              href="mailto:contact@hello-software.com"
              className="text-2xl text-accented-primary hover:underline block"
            >
              contact@hello-software.com
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
}
