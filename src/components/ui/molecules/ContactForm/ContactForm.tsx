'use client';
/**
 * Global Footer Compoent.
 */
interface FormEventHandler {
  (event: React.FormEvent<HTMLFormElement>): void;
}

export default function ContactForm() {
  //   const namespace = 'FOOTER';
  //   const t = useTranslations(namespace); // i18n hook

  const handleForm: FormEventHandler = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white dark:bg-gray-900 shadow-2xl px-8 py-16 lg:px-20 transition-colors duration-300">
        <h4 className="text-accented-primary text-lg font-semibold mb-2">Have Questions?</h4>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Send us a Message</h2>

        <form onSubmit={handleForm} className="space-y-10">
          <div>
            <input
              className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 px-0 py-2"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              autoComplete="name"
              required
            />
            <span className="text-sm text-red-500 mt-1 block"></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 px-0 py-2"
                id="email"
                name="email"
                type="email"
                placeholder="Email*"
                autoComplete="email"
                required
              />
              <span className="text-sm text-red-500 mt-1 block"></span>
            </div>
            <div>
              <input
                className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 px-0 py-2"
                id="phone"
                name="phone"
                type="number"
                placeholder="Phone"
                autoComplete="tel"
                required
              />
              <span className="text-sm text-red-500 mt-1 block"></span>
            </div>
          </div>

          <div>
            <textarea
              className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 px-0 py-2 min-h-[180px]"
              id="comments"
              name="comments"
              placeholder="Tell Us About Project *"
              autoComplete="off"
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              id="submit"
              className="inline-flex items-center gap-2 bg-accented-primary hover:bg-accented-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
            >
              <i className="fa fa-paper-plane"></i> Get in Touch
            </button>
          </div>

          <div className="mt-4">
            <div id="message" className="text-sm text-green-600"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
