import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Landaeta Studio">
      <Image
        src="/images/Landaeta_studio_logo.png"
        alt="Landaeta Studio"
        width={160}
        height={40}
        priority
      />
    </Link>
  );
}