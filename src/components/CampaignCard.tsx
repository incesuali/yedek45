import Image from 'next/image';

interface CampaignCardProps {
  src: string;
  alt: string;
  title: string;
}

export default function CampaignCard({ src, alt, title }: CampaignCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="relative w-full h-48">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          quality={75}
          priority={false}
        />
      </div>
      <div className="p-4">
        <h3 className="text-gray-700 font-medium">{title}</h3>
      </div>
    </div>
  );
}
 