import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="h-15 flex items-center justify-center px-6 text-white bg-blue-600 shadow-sm">
        <p className="text-sm text-white-600 text-center">
          &copy; {currentYear}{" "}
          <Link href="/" className="hover:text-red-300 font-semibold">
            TaskFlow
          </Link>{" "}
          | Designed and Developed by{" "}
          <a
            href="https://github.com/vbudithi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-300 font-semibold"
          >
            Vivek Budithi
          </a>
        </p>
    </footer>
  )
}