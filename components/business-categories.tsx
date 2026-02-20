export default function BusinessCategories() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="relative flex h-[324px] items-center justify-center">

            {/* Small blue dots */}
            <div className="absolute -z-10">
              <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={164} height={41} viewBox="0 0 164 41" fill="none">
                <circle cx={1} cy={8} r={1} fillOpacity="0.24" />
                <circle cx={1} cy={1} r={1} fillOpacity="0.16" />
                <circle cx={1} cy={15} r={1} />
                <circle cx={1} cy={26} r={1} fillOpacity="0.64" />
                <circle cx={1} cy={33} r={1} fillOpacity="0.24" />
                <circle cx={8} cy={8} r={1} />
                <circle cx={8} cy={15} r={1} />
                <circle cx={8} cy={26} r={1} fillOpacity="0.24" />
                <circle cx={15} cy={15} r={1} fillOpacity="0.64" />
                <circle cx={15} cy={26} r={1} fillOpacity="0.16" />
                <circle cx={8} cy={33} r={1} />
                <circle cx={1} cy={40} r={1} />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 7)" fillOpacity="0.24" />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 0)" fillOpacity="0.16" />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 14)" />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 25)" fillOpacity="0.64" />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 32)" fillOpacity="0.24" />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 157 7)" />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 157 14)" />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 157 25)" fillOpacity="0.24" />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 150 14)" fillOpacity="0.64" />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 150 25)" fillOpacity="0.16" />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 157 32)" />
                <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 39)" />
              </svg>
            </div>

            {/* Blue glow */}
            <div className="absolute -z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width={432} height={160} viewBox="0 0 432 160" fill="none">
                <g opacity="0.6" filter="url(#filter0_f_2044_9)">
                  <path className="fill-blue-500" fillRule="evenodd" clipRule="evenodd" d="M80 112C62.3269 112 48 97.6731 48 80C48 62.3269 62.3269 48 80 48C97.6731 48 171 62.3269 171 80C171 97.6731 97.6731 112 80 112ZM352 112C369.673 112 384 97.6731 384 80C384 62.3269 369.673 48 352 48C334.327 48 261 62.3269 261 80C261 97.6731 334.327 112 352 112Z" />
                </g>
                <defs>
                  <filter id="filter0_f_2044_9" x={0} y={0} width={432} height={160} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation={32} result="effect1_foregroundBlur_2044_9" />
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Lines — sin cambios, quedan igual */}
            <div className="absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply"></div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply"></div>
            <div className="absolute inset-x-[200px] top-1/2 -z-10 h-px bg-linear-to-r from-transparent via-blue-500/60 to-transparent mix-blend-multiply"></div>
            <div className="absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-[82px] bg-linear-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply before:absolute before:inset-y-0 before:w-24 before:animate-[line_10s_ease-in-out_infinite_both] before:bg-linear-to-r before:via-blue-500"></div>
            <div className="absolute inset-x-0 top-1/2 -z-10 h-px translate-y-[82px] bg-linear-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply before:absolute before:inset-y-0 before:w-24 before:animate-[line_10s_ease-in-out_infinite_5s_both] before:bg-linear-to-r before:via-blue-500"></div>
            <div className="absolute inset-x-[300px] top-1/2 -z-10 h-px rotate-[20deg] bg-linear-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply"></div>
            <div className="absolute inset-x-[300px] top-1/2 -z-10 h-px -rotate-[20deg] bg-linear-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply"></div>
            <div className="absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-[216px] bg-linear-to-b from-gray-200 to-transparent mix-blend-multiply"></div>
            <div className="absolute inset-y-0 left-1/2 -z-10 w-px translate-x-[216px] bg-linear-to-t from-gray-200 to-transparent mix-blend-multiply"></div>

            {/* Centro — Meta Ads (el más importante, el más grande) */}
            <div className="absolute before:absolute before:-inset-3 before:animate-[spin_3s_linear_infinite] before:rounded-full before:border before:border-transparent before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] before:[background:conic-gradient(from_180deg,transparent,var(--color-blue-500))_border-box]">
              <div className="animate-[breath_8s_ease-in-out_infinite_both]">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                  {/* Meta icon */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 18.5C4 21.5 5.8 23.5 8.2 23.5C9.3 23.5 10.2 23.1 11.3 21.8L13.1 19.6C13.6 20.4 14.2 21.3 14.9 22.1L13.4 23.9C12 25.6 10.3 26.5 8.2 26.5C4.1 26.5 1 23.1 1 18.5C1 13.9 4.1 9 8.5 9C10.7 9 12.4 10.1 14 12.4L16 15.3L17.5 13C19.2 10.5 20.9 9 23.5 9C27.9 9 31 13.5 31 18.5C31 23.1 28.1 26.5 23.8 26.5C21.7 26.5 19.9 25.5 18.3 23.5L16.6 21.4L18.5 19.1L20.5 21.6C21.5 22.9 22.6 23.5 23.8 23.5C26.1 23.5 28 21.3 28 18.5C28 15.2 26.1 12 23.5 12C22.1 12 21.1 12.9 19.7 15L16 20.8L12.8 16C11.3 13.6 10.1 12 8.5 12C5.9 12 4 15.3 4 18.5Z" fill="#0081FB"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col">
              <article className="flex h-full w-full items-center justify-center focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-300">

                {/* Izquierda — Google Ads */}
                <div className="absolute -translate-x-[136px]">
                  <div className="animate-[breath_7s_ease-in-out_3s_infinite_both]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                      {/* Google Ads icon */}
                      <svg width="23" height="23" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 14.803516 6.3359375 C 11.020516 6.3359375 7.6328125 8.4570625 5.8828125 11.787062 L 14.371094 26.902344 C 14.578094 26.947344 14.794922 26.974609 15.013672 26.974609 C 17.233672 26.974609 19.035156 25.173125 19.035156 22.953125 L 19.037109 22.871094 L 27.646484 8.0136719 C 25.940484 6.9226719 23.933594 6.3359375 21.833594 6.3359375 L 14.803516 6.3359375 z" fill="#FABC04"/>
                        <path d="M 42.095703 11.814453 C 40.355703 8.4724531 36.967 6.3359375 33.197 6.3359375 L 26.167969 6.3359375 C 24.056969 6.3359375 22.051031 6.9216719 20.332031 8.0136719 L 28.964844 22.953125 C 28.964844 25.173125 30.765375 26.974609 32.984375 26.974609 C 35.204375 26.974609 37.005859 25.173125 37.005859 22.953125 C 37.005859 22.953125 37.005859 22.951172 37.005859 22.951172 L 42.095703 11.814453 z" fill="#34A853"/>
                        <path d="M 5.8671875 11.814453 L 5.8671875 11.787109 L 14.373047 26.902344 C 12.625047 27.489344 11.417969 29.142578 11.417969 31.042578 C 11.417969 33.470578 13.388906 35.441406 15.816406 35.441406 L 32.185547 35.441406 C 34.613547 35.441406 36.583984 33.470578 36.583984 31.042578 C 36.583984 29.142578 35.376953 27.489344 33.628953 26.902344 L 42.095703 11.814453 C 43.771703 14.827453 44.708984 18.310313 44.708984 22.011719 C 44.708984 33.983719 34.966 43.664062 23 43.664062 C 11.034 43.664062 1.2910156 33.983719 1.2910156 22.011719 C 1.2910156 18.310313 2.2280781 14.827453 5.8671875 11.814453 z" fill="#4285F4"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Derecha — GA4 */}
                <div className="absolute translate-x-[136px]">
                  <div className="animate-[breath_7s_ease-in-out_3.5s_infinite_both]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                      {/* GA4 icon */}
                      <svg width="22" height="22" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <path fill="#F9AB00" d="M130 29v132c0 14.77 10.19 23 21 23 10 0 21-7 21-23V30c0-13.54-10-22-21-22s-21 9.33-21 21Z"/>
                        <path fill="#E37400" d="M72 109v52c0 14.77 10.19 23 21 23 10 0 21-7 21-23v-51c0-13.54-10-22-21-22s-21 9.33-21 21ZM11 160a21 21 0 1 0 42 0 21 21 0 0 0-42 0Z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Arriba izquierda — Shopify */}
                <div className="absolute -translate-x-[216px] -translate-y-[82px]">
                  <div className="animate-[breath_6s_ease-in-out_3.5s_infinite_both]">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                      {/* Shopify icon */}
                      <svg width="24" height="24" viewBox="0 0 109 124" xmlns="http://www.w3.org/2000/svg">
                        <path d="M74.7 14.8s-.3-.2-.8-.1c0 0-7.1 1.9-11.2 3-1.3-3.7-3.2-8.2-6.5-11.5-3.7-3.7-8-4.1-10.5-3.9C44.2.9 42.5 5 41 8.6c-2.3 5.5-4.8 14.6-5.7 25.8L20.4 38.7 11 41.5l-.1.4c-.6 1.9-8.3 26.6.3 54.5l.5 1.7 62.7-11.4 12.5-72.5-12.2.6zm-20.3-8c1.7 2.6 3 6.3 3.9 9.7-4.5 1.3-9.3 2.7-14.2 4.1 1.3-7.5 4.1-14.7 7-17.6 1.6 1 2.5 2.3 3.3 3.8z" fill="#96bf48"/>
                        <path d="M74.7 14.8l-1.2.1-10.4 2.9c-1.2-3.7-3.1-8-6.3-11.2-3.7-3.7-8-4.1-10.5-3.9C44.2.9 42.5 5 41 8.6c-2.3 5.5-4.8 14.5-5.7 25.7L20.5 38.7l-.1 1c-.6 1.9-8.3 26.6.3 54.6l.5 1.7 10.4-1.9-1.5-8.2 4.9-1v1c.1 2.9.3 8.3.5 8.4l8.7-1.6-.8-10.5 4.2-.5.5 11.7 9.1-1.7-.7-14.4 4.5-.4.5 15.5 9.6-1.7-.4-19.6 4.8-.4.3 21.2 10.2-1.9 12.5-72.5-12.4.5zm-20.3-8c1.7 2.6 3 6.3 3.9 9.7-4.5 1.3-9.3 2.7-14.2 4.1 1.3-7.5 4.1-14.7 7-17.6 1.6 1.1 2.5 2.4 3.3 3.8z" fill="#5e8e3e"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Arriba derecha — GTM */}
                <div className="absolute -translate-y-[82px] translate-x-[216px]">
                  <div className="animate-[breath_6s_ease-in-out_1.5s_infinite_both]">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                      {/* GTM icon */}
                      <svg width="25" height="25" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <path d="M32 4L4 32l28 28 28-28L32 4z" fill="#8AB4F8"/>
                        <path d="M32 4L20 16l12 12 12-12L32 4z" fill="#4285F4"/>
                        <path d="M20 16L4 32l16 16 12-12-12-20z" fill="#4285F4" opacity=".5"/>
                        <path d="M32 28l-12 4 12 28 12-28-12-4z" fill="#fff"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Abajo derecha — WooCommerce */}
                <div className="absolute translate-x-[216px] translate-y-[82px]">
                  <div className="animate-[breath_6s_ease-in-out_2s_infinite_both]">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                      {/* WooCommerce icon */}
                      <svg width="26" height="18" viewBox="0 0 256 153" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.759 0h208.354c13.187 0 23.759 10.572 23.759 23.759v105.22c0 13.187-10.572 23.759-23.759 23.759H157.41l10.57 23.759-47.519-23.759H23.759C10.572 152.738 0 142.166 0 128.979V23.759C0 10.572 10.572 0 23.759 0z" fill="#7F54B3"/>
                        <path d="M14.578 23.759c-1.426 2.139-2.139 4.991-2.139 8.556v62.19c0 5.704 2.853 8.556 8.556 8.556H31.6V94.17H21.044V34.314h10.557v-9.98H21.044c-2.853 0-5.04.475-6.466 1.425z" fill="#fff"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Abajo izquierda — Klaviyo */}
                <div className="absolute -translate-x-[216px] translate-y-[82px]">
                  <div className="animate-[breath_6s_ease-in-out_2.5s_infinite_both]">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                      {/* Klaviyo — K letter mark */}
                      <svg width="22" height="22" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" rx="8" fill="#1C1B1F"/>
                        <path d="M25 15h18v28l24-28h22L60 48l31 37H68L43 55v30H25V15z" fill="#fff"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Extremo izquierda — Hotjar (pequeño, opaco) */}
                <div className="absolute -translate-x-[292px] opacity-40">
                  <div className="animate-[breath_6s_ease-in-out_2s_infinite_both]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/60 bg-white shadow-lg">
                      <svg width="20" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm47.4 352.8c-12.4 28.9-37.8 47.7-68.2 50.4-4.1.4-8.2.5-12.2.3-28.6-1.2-52.6-15.1-67.4-38.5-13.4-21.2-16.2-44.8-8-68.2 5.7-16.4 16.2-30.7 29.2-43l3.1-3c.4 3 .7 5.7.9 7.9.5 5.3.9 10.3 1.3 13.7.2 1.6.4 3 .5 3.9 2.7-2.6 5.5-5.4 8.3-8.2 17.4-17.3 37.1-36.8 37.1-64.4 0-8.5-1.7-17.1-5-25.5-2.7 1.5-5.3 3.2-7.8 5.1-15.5 11.7-24.7 29.2-27.3 52-1.3 11.5-.5 23.5 2.3 35.7-9.1 7.6-18 15.4-24.8 23.9-1.6-7.4-2.4-15-2.4-22.7 0-56.7 39.8-104.2 93-116.1 7.5-1.7 15.2-2.5 23.1-2.5 35.8 0 69 15.8 91.8 43.3 19.9 24.1 29.4 54.4 26.8 85.3-2.3 27.3-13.4 51.2-34.3 70.6z" fill="#FD3A5C"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Extremo derecha — Looker Studio (pequeño, opaco) */}
                <div className="absolute translate-x-[292px] opacity-40">
                  <div className="animate-[breath_6s_ease-in-out_4s_infinite_both]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/60 bg-white shadow-lg">
                      <svg width="20" height="20" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <circle cx="96" cy="104" r="40" fill="#4285F4"/>
                        <circle cx="96" cy="104" r="20" fill="#fff"/>
                        <path d="M56 104A40 40 0 0 1 96 64V44a60 60 0 0 0-60 60h20z" fill="#EA4335"/>
                        <path d="M96 64a40 40 0 0 1 40 40h20a60 60 0 0 0-60-60v20z" fill="#FBBC04"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}