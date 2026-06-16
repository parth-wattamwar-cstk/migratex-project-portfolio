import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">404</p>
        <h1 className="text-white text-3xl font-extrabold mb-3">Page Not Found</h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}