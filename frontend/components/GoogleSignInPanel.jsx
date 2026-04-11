import { GoogleLogin } from '@react-oauth/google'

export default function GoogleSignInPanel({ text, onSuccess, onError }) {
  return (
    <div className="mt-6 w-full space-y-4">
      <div className="relative flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" aria-hidden={true} />
        <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-gray-200" aria-hidden={true} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white px-3 py-4">
        <div className="flex w-full justify-center">
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
            type="standard"
            theme="outline"
            size="medium"
            shape="rectangular"
            text={text}
            logo_alignment="left"
            width={384}
          />
        </div>
      </div>
    </div>
  )
}
