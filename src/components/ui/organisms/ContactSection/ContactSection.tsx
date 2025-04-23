'use client';

import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';
import { FaPaperPlane } from 'react-icons/fa';
import { sendEmail } from '@/actions';
import type { SupportedNamespace } from '@/config';
import ContactSectionBackground from './ContactSectionBackground';
import { useActionState } from 'react';
import clsx from 'clsx';

type TContactSection = {
  namespace: SupportedNamespace;
};

export default function ContactSection({ namespace }: TContactSection) {
  const section = 'CONNTACT_SECTION';
  const t = useTranslations(namespace);
  const [state, formAction, isPending] = useActionState(sendEmail, { success: false });

  return (
    <section className="relative overflow-hidden first:lg:pt-20">
      <ContactSectionBackground className="dark:opacity-20 absolute -z-1 w-full left-0 bottom-0 lg:bottom-auto lg:top-50" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto container py-12 px-4 md:px-5"
      >
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Contact Form */}
          <div className="lg:col-span-6">
            <div className="max-w-xl mx-auto">
              <div className="bg-white dark:bg-gray-900 shadow-2xl px-8 py-16 lg:px-20 transition-colors duration-300">
                <h4 className="text-accented-primary text-lg font-semibold mb-2">{t(`${section}.form.title`)}</h4>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                  {t(`${section}.form.caption`)}
                </h2>

                <form action={formAction} className="space-y-10">
                  <div>
                    <input
                      className={clsx(
                        'w-full border-b bg-transparent border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 px-0 py-2',
                        state.errors?.email
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      )}
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={state.values?.email}
                      placeholder={t(`${section}.form.input.email.placeholder`)}
                      aria-invalid={state.errors?.email}
                      aria-describedby="email-error"
                    />
                    {state?.errors?.email && (
                      <span id="email-error" className="text-sm text-red-500 mt-1 block">
                        {t(`${section}.form.input.email.error`)}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input
                        className={clsx(
                          'w-full border-b bg-transparent border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 px-0 py-2',
                          state.errors?.name
                            ? 'border-red-500 dark:border-red-500'
                            : 'border-gray-300 dark:border-gray-700'
                        )}
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={state.values?.name}
                        placeholder={t(`${section}.form.input.name.placeholder`)}
                        aria-invalid={state.errors?.name}
                        aria-describedby="name-error"
                      />
                      {state?.errors?.name && (
                        <span id="name-error" className="text-sm text-red-500 mt-1 block">
                          {t(`${section}.form.input.name.error`)}
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        className={clsx(
                          'w-full border-b bg-transparent border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 px-0 py-2',
                          state.errors?.phone
                            ? 'border-red-500 dark:border-red-500'
                            : 'border-gray-300 dark:border-gray-700'
                        )}
                        id="phone"
                        name="phone"
                        type="tel"
                        defaultValue={state.values?.phone}
                        placeholder={t(`${section}.form.input.phone.placeholder`)}
                        aria-invalid={state?.errors?.phone}
                        aria-describedby="phone-error"
                      />
                      {state?.errors?.phone && (
                        <span id="phone-error" className="text-sm text-red-500 mt-1 block">
                          {t(`${section}.form.input.phone.error`)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      defaultValue={state.values?.message}
                      className={clsx(
                        'w-full border-b bg-transparent border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 px-0 py-2 min-h-[180px]',
                        state.errors?.message
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      )}
                      placeholder={t(`${section}.form.input.message.placeholder`)}
                      aria-invalid={state?.errors?.message}
                      aria-describedby="message-error"
                    ></textarea>
                    {state?.errors?.message && (
                      <span id="message-error" className="text-sm text-red-500 mt-1 block">
                        {t(`${section}.form.input.message.error`)}
                      </span>
                    )}
                  </div>
                  <div>
                    <button
                      disabled={isPending}
                      type="submit"
                      id="submit"
                      className={clsx(
                        'inline-flex items-center gap-2 px-6 py-3  text-white bg-gradient-to-r from-accented-primary to-accented-secondary rounded-md shadow-md hover:scale-105 transition-transform',
                        isPending && 'animate-pulse'
                      )}
                    >
                      <>
                        <FaPaperPlane />
                        {isPending ? t(`${section}.form.sending`) : t(`${section}.form.submit`)}
                      </>
                    </button>
                  </div>
                  <div className="mt-2">
                    {state?.success && (
                      <div id="general" className="text-sm text-green-600">
                        {t(`${section}.form.success`)}
                      </div>
                    )}
                    {state?.errors?.general && (
                      <div id="general" className="text-sm text-red-500">
                        {t(`${section}.form.error`)}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Contact Information*/}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="text-center mx-auto max-w-xl px-4 py-10 text-gray-900 dark:text-white">
              <div className="mb-10">
                <h2 className="text-4xl font-bold mb-4">{t(`${section}.informations.title`)}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {t(`${section}.informations.caption`)}
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
                    <h4 className="text-3xl font-semibold mb-2">{t(`${section}.informations.location.title`)}</h4>
                    <p className="text-gray-600 text-2xl dark:text-gray-400">
                      {t(`${section}.informations.location.detail`)}
                    </p>
                  </div>
                </li>

                <li className="transition-opacity duration-500 ease-in-out delay-500">
                  <div>
                    <h4 className="text-3xl font-semibold mb-2">{t(`${section}.informations.mail.title`)}</h4>
                    <a
                      href="mailto:contact@hello-software.com"
                      className="text-2xl text-accented-primary hover:underline block"
                    >
                      {t(`${section}.informations.mail.detail`)}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
