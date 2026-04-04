const ResetPasswordPage = () => {
  return (
    <main class="mx-auto flex w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section class="grid w-full gap-8 lg:grid-cols-2 lg:gap-10">
        <div class="order-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:order-1">
          <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">Secure Access</p>
          <h2 class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Choose a new password</h2>
          <p class="text-base leading-relaxed text-gray-500">
            Reset your password to continue to Fly To Heavens
          </p>
        </div>

        <div class="order-1 lg:order-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <form action="#" method="post" class="space-y-4">
            <h3 class="text-xl font-bold text-gray-900">Reset password</h3>

            <div>
              <label for="reset-password" class="mb-1 block text-sm font-medium text-gray-700"
                >Password</label
              >
              <input
                id="reset-password"
                name="password"
                type="password"
                required
                minlength="8"
                autocomplete="new-password"
                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="New password (min. 8 characters)"
              />
            </div>

            <div>
              <label for="reset-password-confirm" class="mb-1 block text-sm font-medium text-gray-700"
                >Confirm password</label
              >
              <input
                id="reset-password-confirm"
                name="passwordConfirm"
                type="password"
                required
                minlength="8"
                autocomplete="new-password"
                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              class="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Save new password
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default ResetPasswordPage